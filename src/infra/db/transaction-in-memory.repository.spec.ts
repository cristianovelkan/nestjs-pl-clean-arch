import { TransactionEntity, TransactionProps } from "../../domain/transaction.entity";
import { TransactionInMemoryRepository } from "./transaction-in-memory.repository";

describe("TransactionInMemoryRepository Test", () => {
  it("should insert a new transaction", async () => {
    const repository = new TransactionInMemoryRepository();
    const transactionProps: TransactionProps = {
      amount: 100,
      timestamp: new Date(),
    };
    const transaction = new TransactionEntity(transactionProps);
    await repository.insert(transaction);
    expect(repository.items).toHaveLength(1);
    expect(repository.items).toStrictEqual([transaction]);
  });
});