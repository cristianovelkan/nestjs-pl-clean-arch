import { TransactionEntity, TransactionProps } from './transaction.entity'

describe('Transaction Tests', () => {
  let props: TransactionProps
  let sut: TransactionEntity
  beforeEach(() => {
    TransactionEntity.validate = jest.fn()
    props = {
      amount: 100,
      timestamp: new Date(),
    }
    sut = new TransactionEntity(props)
  })

  it('Constructor method', () => {
    expect(TransactionEntity.validate).toHaveBeenCalled()
    expect(sut.props.amount).toEqual(props.amount)
    expect(sut.props.timestamp).toEqual(props.timestamp)
    expect(sut.id).toBeDefined()
    expect(sut.id).toHaveLength(36)
  })

  it('amount getter', () => {
    expect(sut.props.amount).toBeDefined()
    expect(sut.props.amount).toEqual(props.amount)
    expect(typeof sut.props.amount).toBe('number')
  })

  it('timestamp getter', () => {
    expect(sut.props.timestamp).toBeDefined()
    expect(sut.props.timestamp).toEqual(props.timestamp)
    expect(sut.props.timestamp).toBeInstanceOf(Date)
  })

  it('amount setter', () => {
    const newAmount = 200
    sut.props.amount = newAmount
    expect(sut.props.amount).toEqual(newAmount)
  })

  it('timestamp setter', () => {
    const newTimestamp = new Date('2023-01-01')
    sut.props.timestamp = newTimestamp
    expect(sut.props.timestamp).toEqual(newTimestamp)
  })
})
