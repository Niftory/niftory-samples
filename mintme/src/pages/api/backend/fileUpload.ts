import { NextApiHandler } from "next"
import { getClientForServer } from "../../../graphql/getClientForServer"
import { UploadNftContentDocument } from "@niftory/sdk"
import posthog from "posthog-js"
import { getNiftoryClientForServer } from "graphql/getNiftoryClient"

const handler: NextApiHandler = async (req, res) => {
  try {
    const requestMethod = req.method
    const variables = req.body

    const niftoryClient = await getNiftoryClientForServer()

    if (requestMethod === "POST") {
      const postData = await niftoryClient.uploadNftContent(variables)

      res.status(200).json(postData)
    } else {
      res.status(405).end("Method not allowed, this endpoint only supports POST")
    }
  } catch (e) {
    console.error(e)
    res.status(500).json(e)
    posthog.capture("ERROR_FILEUPLOAD_API", e)
  }
}

export default handler
