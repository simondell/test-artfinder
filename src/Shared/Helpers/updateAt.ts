export default function <T> (index: number, item: T, source: T[]): T[] {
  return [
    ...source.slice(0, index),
    item,
    ...source.slice(index + 1)
  ]
}