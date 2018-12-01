export function formatName(string) {
  const lowerCase = string.toLowerCase()
  return lowerCase.charAt(0).toUpperCase() + string.slice(1)
}
