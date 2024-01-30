const fs = require('fs');
const { camelCase } = require('lodash');
const path = require('path');

const showHelp = process.argv[2] === '--help' || process.argv[2] === '-h';

if (showHelp) {
  console.log(
    'This tool generates a migration index file for a service in quest-point Backend Monorepo\n',
  );
  console.log('USAGE:\n');
  console.log(`node index.js [migrations-source-folder] [target-file-name]\n`);
  console.log(
    `* "migrations-source-folder" \t the folder in which all migration files are stored. DEFAULT: migration`,
  );
  console.log(
    `* "target-file-name" \t\t the file-name prefix to which the generated file will be stored (under 'src' dir). the full file name will be - '{target-file-name}.generated.ts' DEFAULT: migrations`,
  );
  process.exit(0);
}

const migrationSourceDir = process.argv[2] || 'migration';
const targetFileName = process.argv[3] || 'migrations';
const appDir = process.cwd();
const migrationDir = path.resolve(appDir, migrationSourceDir);
const targetFile = path.resolve(appDir, `src/${targetFileName}.generated.ts`);

const fileRegex = /^(?<tstmp>\d+)-(?<desc>.*)\.ts$/;
const filesInfos = fs
  .readdirSync(migrationDir)
  .map((f) => fileRegex.exec(f))
  .filter(Boolean)
  .map((a) => ({
    file: a[0],
    tstmp: a.groups.tstmp,
    desc: a.groups.desc,
    className:
      a.groups.desc[0] + camelCase(a.groups.desc).slice(1) + a.groups.tstmp,
  }));

const imports = filesInfos
  .sort((x1, x2) => Number(x1.tstmp) - Number(x2.tstmp))
  .map(
    ({ className, desc, tstmp }) =>
      `import {${className}} from '../${migrationSourceDir}/${tstmp}-${desc}';`,
  )
  .join('\n');

const classNames = filesInfos
  .map(({ className }) => `  ${className}`)
  .join(',\n');

const content = `
/**
 *
 * GENERATED FILE
 *
 * Do NOT edit manually.
 *
 * Run 'build' or 'generate' to update this file.
 *
 */

${imports}

export const migrations = [
${classNames}
];

`;

console.log(content);

fs.writeFileSync(targetFile, content);
