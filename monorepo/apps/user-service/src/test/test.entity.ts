import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'test' })
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', name: 'last_name' })
  lastName: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;
}
