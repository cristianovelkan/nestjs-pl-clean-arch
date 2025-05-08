import { randomUUID } from 'node:crypto'

export type TransactionProps = {
    id: string;
    amount: number;
    timestamp: Date;
}

export class Transaction {
    public readonly id: string;
    public props: Required<TransactionProps>;
    constructor(props: TransactionProps, id?: string) {
        this.id = id || randomUUID();
        this.props = props
    }
}