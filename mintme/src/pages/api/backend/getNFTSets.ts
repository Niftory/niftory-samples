import { NextApiHandler } from "next"
import { unstable_getServerSession } from "next-auth"
import { AUTH_OPTIONS } from "../auth/[...nextauth]"
import posthog from "posthog-js"
import { getNiftoryClientForServer } from "graphql/getNiftoryClient"

const handler: NextApiHandler = async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, AUTH_OPTIONS)

    if (!session || !session.authToken || !session.userId) {
      res.status(401).send("There must be a user signed in to use this API route")
      return
    }
    const requestMethod = req.method
    const userId = session.userId as string

    if (requestMethod === "POST") {
      const niftoryClient = await getNiftoryClientForServer()
      const postData = await niftoryClient.getSets({ filter: { tags: [userId as string] } })
      res.status(200).json(postData)
    } else {
      res.status(405).end("Method not allowed, this endpoint only supports POST")
    }
  } catch (e) {
    posthog.capture("ERROR_GETNFTSETS_API", e)
    throw e
  }
}

export default handler
