import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { CreateTransactionDto } from './dto/createTransaction.dto';
import { TransactionService } from './transaction.service';

@Controller('api/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @UseGuards(AuthGuard)
  @Get()
  async index() {
    return await this.transactionService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('/investor')
  async findAllTransactionsFromUser(@Req() req) {
    const investorId = req['user'].sub;
    return await this.transactionService.findAllTransactionsFromUser(
      investorId,
    );
  }
  @Post()
  @UseGuards(AuthGuard)
  async createTransaction(@Body() data: CreateTransactionDto, @Req() req) {
    const investorId = req['user'].sub;
    return await this.transactionService.createTransaction(data, investorId);
  }
}
