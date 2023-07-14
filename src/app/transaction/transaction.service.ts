import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockService } from '../stock/stock.service';
import { UserService } from '../user/user.service';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import TransactionEntity from './transaction.entity';
@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private readonly userService: UserService,
    private readonly stockService: StockService,
  ) {}

  async findAll() {
    return this.transactionRepository.find();
  }

  async findAllTransactionsFromUser(investorId: string) {
    const transactions = await this.transactionRepository.find({
      where: {
        investor: {
          id: investorId,
        },
      },
    });
    return transactions;
  }

  async createTransaction(data: CreateTransactionDto, investorId: string) {
    const investor = await this.userService.findOneById(investorId);
    const stock = await this.stockService.findOneById(data.stock);
    const transaction = new TransactionEntity();
    transaction.quantity = data.quantity;
    transaction.brokerage = data.brokerage;
    transaction.princeUnit = data.priceUnit;
    transaction.operation = data.operation;
    transaction.taxB3 = data.taxB3;
    transaction.investor = investor;
    transaction.stock = stock;
    return await this.transactionRepository.save(
      this.transactionRepository.create(transaction),
    );
  }
}
