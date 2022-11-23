export const getContractUrl = (contract) => {
  const { name, address } = contract
  const path = `A.${address.replace("0x", "")}.${name}`

  return `${process.env.NEXT_PUBLIC_FLOW_SCAN_URL}/contract/${path}`
}
