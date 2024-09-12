export function capitalize(str: string): string {
  const lowerCase = str.toLowerCase()
  return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1)
}
