import { TransactionInMemoryRepository } from "../infra/db/transaction-in-memory.repository"
import { CreateTransactionUseCase } from "./create-transaction.use-case"
import { DeleteAllTransactionsUseCase } from "./delete-all-transactions.use-case"

describe('DeleteAllTransactionUseCase Tests', () => {

    it('should delete all transactions', async () => {
        const repository = new TransactionInMemoryRepository();
        const createUseCase = new CreateTransactionUseCase(repository);

        await createUseCase.execute({ amount: 100, timestamp: new Date() });
        await createUseCase.execute({ amount: 100, timestamp: new Date() });
        expect(repository.items).toHaveLength(2);

        const deleteUseCase = new DeleteAllTransactionsUseCase(repository);
        await deleteUseCase.execute();
        expect(repository.items).toHaveLength(0);
    })
})