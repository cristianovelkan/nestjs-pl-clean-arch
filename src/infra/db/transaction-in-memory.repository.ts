import { TransactionEntity } from "../../domain/transaction.entity";
import { TransactionRepositoryInterface } from "../../domain/transaction.repository";

export class TransactionInMemoryRepository implements TransactionRepositoryInterface {
    items: TransactionEntity[] = [];
    async insert(transaction: TransactionEntity): Promise<void> {
        this.items.push(transaction);
    }

    async findAll(): Promise<TransactionEntity[]> {
        return this.items;
    }
}