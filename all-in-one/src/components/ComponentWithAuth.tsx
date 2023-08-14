import { NextComponentType, NextPageContext } from "next"

export type ComponentWithAuth<P = {}> = NextComponentType<NextPageContext, any, P> & {
  requireAuth?: boolean
}
