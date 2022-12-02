import axios, { AxiosError } from "axios"
import { signOut } from "next-auth/react"
import useSWR from "swr"

export const apiRoutesTable = {
  fileUpload: "/api/backend/fileUpload",
  createWallet: "/api/backend/createWallet",
  createNFTModel: "/api/backend/createNFTModel",
  createNFTSet: "/api/backend/createNFTSet",
  getNFTSets: "/api/backend/getNFTSets",
  transferNFTModel: "/api/backend/transferNFTModel",
  updateNFTModel: "/api/backend/updateNFTModel",
  generateShareToken: "/api/backend/generateShareToken",
  claimNFT: "/api/backend/claimNFT",
  deleteNFTModel: "/api/backend/deleteNFTModel",
}

export const useBackendClient = <Y extends Record<string, unknown>, X = Object>(
  apiName: keyof typeof apiRoutesTable,
  variables?: X
) => {
  const { data, error } = useSWR<Y>(createSWRKey<X>(apiName, variables), backendFetcher)
  return {
    ...data,
    error,
  }
}

const createSWRKey = <X extends Object>(apiName: keyof typeof apiRoutesTable, variables: X) => {
  return [apiName, variables]
}

const backendFetcher = <T extends Record<string, unknown>>(
  apiName: keyof typeof apiRoutesTable,
  variables?: Object
) => backendClient(apiName, variables).then((data: T) => data)

export async function backendClient<T extends Record<string, unknown>, X = Object>(
  apiName: keyof typeof apiRoutesTable,
  variables?: X
): Promise<T> {
  try {
    const { data } = await axios.post<T>(apiRoutesTable[apiName], variables)
    return data
  } catch (e) {
    if (e & e.response) {
      if (e?.response?.status === 401) {
        signOut()
      }
      const axiosError = e as AxiosError<any>
      return axiosError.response?.data
    }
  }
}
