import { NextApiHandler } from "next"
import { unstable_getServerSession } from "next-auth"
import { AUTH_OPTIONS } from "../auth/[...nextauth]"
import { getClientForServer } from "../../../graphql/getClientForServer"
import * as jose from "jose"
import {
  GetNftSetsDocument,
  GetNftSetsQuery,
  GetNftSetsQueryVariables,
} from "../../../../generated/graphql"
import posthog from "posthog-js"

const handler: NextApiHandler = async (req, res) => {
  try {
    const requestMethod = req.method
    const variables = req.body

    const session = await unstable_getServerSession(req, res, AUTH_OPTIONS)

    if (!session.authToken || !session.userId) {
      res.status(401).send("There must be a user signed in to use this API route")
    }

    const serverSideBackendClient = await getClientForServer()

    if (requestMethod === "POST") {
      const nftModelId = variables?.id
      if (!nftModelId) {
        res.status(400).send("There must an nft model id to share")
      }

      const { sets } = await serverSideBackendClient.request<
        GetNftSetsQuery,
        GetNftSetsQueryVariables
      >(GetNftSetsDocument, {
        filter: {
          tags: [session.userId as string],
        },
      })

      const modelsId = sets
        ?.map((item) => item.models)
        .flat()
        .map((item) => item.id)

      if (!modelsId.includes(nftModelId)) {
        res.status(400).send("NFTModel doesn't belong to user")
        return
      }
      const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET as string)

      const jwt = await new jose.SignJWT({ nftModelId })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1d")
        .sign(secret)
      res.status(200).json({ token: jwt })
    } else {
      res.status(405).end("Method not allowed, this endpoint only supports POST")
    }
  } catch (e) {
    posthog.capture("ERROR_GENERATE_SHARETOKEN_API", e)
    throw e
  }
}

export default handler
