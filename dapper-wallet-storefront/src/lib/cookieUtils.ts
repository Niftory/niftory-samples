import { getCookie, setCookie } from "cookies-next"
import addDays from "date-fns/addDays"
import { NextApiRequest, NextApiResponse } from "next"

const isServerSide = () => typeof window === "undefined"

export const fclCookieStorage = {
  can: !isServerSide(),
  get: async (key: string) => JSON.parse((getCookie(key) as string) ?? null),
  put: async (key: string, value: unknown) =>
    setCookie(key, JSON.stringify(value ?? null), { path: "/", expires: addDays(new Date(), 14) }),
}

export function getAddressFromCookie(req: NextApiRequest, res: NextApiResponse) {
  const cookieValue = getCookie("CURRENT_USER", { req, res })
  if (!cookieValue) {
    return null
  }

  return JSON.parse(cookieValue.toString())?.addr
}
