import { getCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next"

export const COOKIE_NAME = "_currentUser"

export function getAddressFromCookie(req: NextApiRequest, res: NextApiResponse) {
  const cookieValue = getCookie(COOKIE_NAME, { req, res })
  if (!cookieValue) {
    return null
  }

  return JSON.parse(cookieValue.toString())?.addr
}
