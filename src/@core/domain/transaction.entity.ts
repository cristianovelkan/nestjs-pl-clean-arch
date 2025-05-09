import { randomUUID } from 'node:crypto'

export type TransactionProps = {
  amount: number
  timestamp: Date
}

export class TransactionEntity {
  public readonly id: string
  public props: Required<TransactionProps>

  constructor(props: TransactionProps, id?: string) {
    TransactionEntity.validate(props)
    this.id = id || randomUUID()
    this.props = props
  }

  public get amount(): number {
    return this.props.amount
  }

  public get timestamp(): Date {
    return this.props.timestamp
  }

  private set amount(value: number) {
    this.props.amount = value
  }

  private set timestamp(value: Date) {
    this.props.timestamp = value
  }

  static validate(props: TransactionProps): void {
    if (props.amount < 0) {
      throw new Error('Transaction amount cannot be negative.')
    }

    if (new Date(props.timestamp).getTime() > Date.now()) {
      throw new Error('Transaction timestamp cannot be in the future.')
    }

    if (!new Date(props.timestamp).getTime()) {
      throw new Error('Transaction timestamp must be valid.')
    }
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    }
  }
}
