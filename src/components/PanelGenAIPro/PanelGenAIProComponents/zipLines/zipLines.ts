import type { Lines } from "../../../../../shared/cknTypes/types/types"

type ZipLinesProps = {
  left: Lines
  right: Lines
  noIndex: boolean
  noPeriod: boolean
}

export function zipLines({left, right, noIndex = false, noPeriod = true}: ZipLinesProps): Lines {
  const len = Math.min(left.length, right.length)
  const result: string[] = []

  for (let i = 0; i < len; i++) {
    const leftClean = left[i].replace(/^\s*\d+\.\s*/, '').trim()
    const rightClean = right[i].replace(/^\s*\d+\.\s*/, '').trim()
    if (noIndex) {
      result.push(`${leftClean} ${rightClean}${noPeriod ? '' : '.'}`)
    } else {
      result.push(`${i + 1}. ${leftClean} ${rightClean}${noPeriod ? '' : '.'}`)
    }
  }

  return result
}
