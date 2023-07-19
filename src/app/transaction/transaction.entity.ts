import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StockEntity } from '../stock/stock.entity';
import UserEntity from '../user/user.entity';
export enum OPERATION_CHOICES {
  COMPRA = 'C',
  VENDA = 'V',
}

@Entity({ name: 'transactions' })
export default class TransactionEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({
    type: 'integer',
  })
  quantity: number;
  @Column({
    type: 'float',
  })
  brokerage: number;
  @Column({
    type: 'decimal',
    name: 'prince_unit',
  })
  princeUnit: number;
  @Column({
    type: 'decimal',
    name: 'tax_b3',
  })
  taxB3: number;
  @Column({ type: 'enum', enum: OPERATION_CHOICES })
  operation: OPERATION_CHOICES;
  @OneToMany(() => UserEntity, (user: UserEntity) => user.id, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'investor' })
  investor: UserEntity;
  @OneToMany(() => StockEntity, (stock: StockEntity) => stock.id)
  @JoinColumn({ name: 'stock' })
  stock: StockEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  calculatePriceTotal() {
    return this.princeUnit * this.quantity;
  }

  taxTotals() {
    return Number(this.brokerage) + Number(this.taxB3);
  }
}
