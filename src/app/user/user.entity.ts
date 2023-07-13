import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export default class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({
    unique: true,
  })
  email: string;
  @Column({
    type: 'varchar',
  })
  password: string;
  @Column({
    length: 30,
    type: 'varchar',
    name: 'first_name',
  })
  firstName: string;
  @Column({
    length: 30,
    type: 'varchar',
    name: 'last_name',
  })
  lastName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
