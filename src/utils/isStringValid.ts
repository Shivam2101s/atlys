export function isStringValid(str: any): boolean {
  if (typeof str === "string") {
    const trimmedStr = str.trim();
    return !!trimmedStr;
  }
  return false;
}
