import { Injectable } from '@nestjs/common';
import { TestRepository } from './test.repository';

@Injectable()
export class TestService {
  constructor(private readonly testRepository: TestRepository) {}

  getData(): { message: string } {
    return { message: 'Hello Test API' };
  }
}
