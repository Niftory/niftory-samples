import { resolveCadence } from '@onflow/sdk';

export const resolveCadenceImports = async (cadence: string): Promise<string> => {
  const {message} = await resolveCadence({tag: 'TRANSACTION', assigns: {'ix.cadence': cadence}, message: {}})

  return message.cadence
}

