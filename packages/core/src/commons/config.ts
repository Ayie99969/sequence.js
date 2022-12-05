
import { ethers } from 'ethers'
import { WalletContext } from './context'
import * as transaction from './transaction'

export type Config = {
  version: number
}

export interface ConfigCoder<T extends Config = Config> {
  imageHashOf: (config: T) => string
  hasSubdigest: (config: T, subdigest: string) => boolean

  isWalletConfig: (config: Config) => config is T

  checkpointOf: (config: T) => ethers.BigNumber

  fromSimple: (config: {
    threshold: ethers.BigNumberish,
    checkpoint: ethers.BigNumberish,
    signers: { address: string, weight: ethers.BigNumberish }[]
  }) => T

  toJSON: (config: T) => string
  fromJSON: (json: string) => T

  // isValid: (config: T) => boolean

  // TODO: This may not be the best place for this
  // maybe it could go in the migration classes?
  update: {
    isKindUsed: boolean,

    buildTransaction: (
      address: string,
      config: T,
      context: WalletContext,
      kind?: 'first' | 'later' | undefined
    ) => transaction.TransactionBundle

    decodeTransaction: (tx: transaction.TransactionBundle) => {
      address: string,
      newConfig: T,
      kind: 'first' | 'later' | undefined
    }
  }
}
