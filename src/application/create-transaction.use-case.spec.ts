import { TransactionInMemoryRepository } from "../infra/db/transaction-in-memory.repository"
import { CreateTransactionUseCase } from "./create-transaction.use-case"

describe('CreateTransactionUseCase Tests', () => {

    it('should create a new transaction', async () => {
        const repository = new TransactionInMemoryRepository();
        const createUseCase = new CreateTransactionUseCase(repository);
        const output = await createUseCase.execute({
            amount: 100,
            timestamp: new Date(),
        });
        expect(repository.items).toHaveLength(1);
        expect(output).toStrictEqual({
            id: repository.items[0].id,
            amount: repository.items[0].props.amount,
            timestamp: repository.items[0].props.timestamp,
        });
    })
})