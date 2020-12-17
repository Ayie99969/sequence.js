import { BigNumberish, BytesLike } from 'ethers'
import { TransactionRequest } from '@ethersproject/providers'

export interface SequenceTransaction {
  delegateCall: boolean
  revertOnError: boolean
  gasLimit: BigNumberish
  to: string
  value: BigNumberish
  data: BytesLike
  nonce?: BigNumberish
}

export interface SequenceTransactionEncoded {
  delegateCall: boolean
  revertOnError: boolean
  gasLimit: BigNumberish
  target: string
  value: BigNumberish
  data: BytesLike
}

export type AuxTransactionRequest = TransactionRequest & {
  auxiliary?: Transactionish[]
  expiration?: BigNumberish
  afterNonce?: NonceDependency | BigNumberish
}

export interface NonceDependency {
  address: string
  nonce: BigNumberish
  space?: BigNumberish
}

export declare type Transactionish = AuxTransactionRequest | SequenceTransaction | SequenceTransaction[] | AuxTransactionRequest[]