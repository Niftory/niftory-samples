import { NextComponentType, NextPageContext } from "next"

export type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object ? Subset<K[attr]> : K[attr]
}

export type ComponentWithWallet<P = {}> = NextComponentType<NextPageContext, any, P> & {
  requireWallet?: boolean
}
