import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './test.entity';

@Injectable()
export class TestRepository {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {}

  // Custom methods here
}
