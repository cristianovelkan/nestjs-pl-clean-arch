import { TransactionEntity } from "./transaction.entity";


export interface TransactionRepositoryInterface {
    insert(transaction: TransactionEntity): Promise<void>;
    deleteAll(): Promise<void>;
}