import { resolveCadence } from '@onflow/sdk';

/**
 * resolves cadence transaction/query code with new import syntax
 * 
 * replaces
 * 
 * ```
 *   import "FungibleToken" 
 * 
 * ```
 * 
 * with 
 * 
 * ```
 *   import FungibleToken from 0x9a0766d93b6608b7
 * 
 * ```
 * 
 * where `0x9a0766d93b6608b7` is the address where `FungibleToken` is deployed
 * and which is defined in `flow.json` loaded by the lib/fcl/config.ts
 * 
 * @param cadence 
 * @returns 
 */
export const resolveCadenceImports = async (cadence: string): Promise<string> => {
  const {message} = await resolveCadence({tag: 'TRANSACTION', assigns: {'ix.cadence': cadence}, message: {}})

  return message.cadence
}

