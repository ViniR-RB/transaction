import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Transaction,
  UpdateDateColumn,
} from 'typeorm';
import TransactionEntity from '../transaction/transaction.entity';

@Entity({ name: 'stocks' })
export class StockEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({
    type: 'varchar',
    length: 35,
  })
  name_enterprise: string;
  @Column({ name: 'code', length: 5, unique: true })
  code: string;
  @Column({
    type: 'varchar',
    length: 18,
    unique: true,
  })
  cnpj: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: string;

  @OneToMany(
    () => TransactionEntity,
    (transaction: TransactionEntity) => transaction.id,
  )
  transactions: TransactionEntity[];
}
