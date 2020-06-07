export default function <T> (index: keyof T, value: any, source: T): T {
  return {
    ...source,
    [index]: value
  }
}