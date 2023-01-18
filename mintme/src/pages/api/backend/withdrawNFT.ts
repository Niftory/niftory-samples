import { NextApiHandler } from "next"
import { unstable_getServerSession } from "next-auth"
import { AUTH_OPTIONS } from "../auth/[...nextauth]"
import {
  getClientForServer,
  getClientForServerWithoutCredentials,
} from "../../../graphql/getClientForServer"
import {
  GetNftSetsDocument,
  GetNftSetsQuery,
  GetNftSetsQueryVariables,
  TransferDocument,
  UserNftsDocument,
  UserNftsQuery,
  UserNftsQueryVariables,
  WithdrawDocument,
} from "../../../../generated/graphql"
import posthog from "posthog-js"

const handler: NextApiHandler = async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, AUTH_OPTIONS)

    if (!session.authToken || !session.userId) {
      res.status(401).send("There must be a user signed in to use this API route")
    }
    const requestMethod = req.method
    const userId = session.userId as string
    const variables = req.body
    const serverSideBackendClient = await getClientForServerWithoutCredentials()

    if (requestMethod === "POST") {
      const transferData = await serverSideBackendClient.request(WithdrawDocument, {
        id: variables.id,
        receiverAddress: variables.receiverAddress,
      })
      res.status(200).json(transferData)
    } else {
      res.status(405).end("Method not allowed, this endpoint only supports POST")
    }
  } catch (e) {
    posthog.capture("ERROR_TRANSFERNFTMODEL_API", e)
    res.status(500).json(e)
  }
}

export default handler
