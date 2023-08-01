export const replaceCadencePlaceholders = (cadence: String, map: Record<string, string>): String => {
  const result = Object.entries(map).reduce((acc, [key, replaceValue]) => {
    const searchValue = new RegExp(`<${key}>`, "g")
    return acc.replace(searchValue, replaceValue)
  }, cadence)

  return result
}
