const fs = require('fs');
const path = require('path');

// Get the microservice name from command line arguments
const microserviceName = process.argv[2];
if (!microserviceName) {
  console.error('Error: Please provide the microservice name as an argument.');
  process.exit(1);
}

const transpiledMainPath = path.join(
  __dirname,
  '..',
  '..',
  'dist',
  'apps',
  microserviceName,
  'main.js',
);

const transpiledMainContent = fs.readFileSync(transpiledMainPath, 'utf8');

const requiredModules = new Set();

transpiledMainContent.split('\n').forEach((line) => {
  const match = line.match(/require\("([^"]+)"\)/);
  if (match) {
    requiredModules.add(match[1]);
  }
});

const rootPackageJsonPath = path.join(__dirname, '..', '..', 'package.json');
const rootPackageJson = JSON.parse(
  fs.readFileSync(rootPackageJsonPath, 'utf8'),
);

const microservicePackageJson = {
  name: microserviceName,
  version: '0.0.1',
  dependencies: {},
  main: 'main.js',
};

requiredModules.forEach((moduleName) => {
  if (rootPackageJson.dependencies[moduleName]) {
    microservicePackageJson.dependencies[moduleName] =
      rootPackageJson.dependencies[moduleName];
  }
});

const microservicePackageJsonPath = path.join(
  __dirname,
  '..',
  '..',
  'dist',
  'apps',
  microserviceName,
  'package.json',
);

fs.writeFileSync(
  microservicePackageJsonPath,
  JSON.stringify(microservicePackageJson, null, 2),
);

console.log(
  `Generated package.json for ${microserviceName} at ${microservicePackageJsonPath}`,
);
