import type { Line, Lines } from '@cknTypes/types';

type CleanedNounLinesProps = {
  lines: Lines;
};

export const postCleanLines = ({ lines }: CleanedNounLinesProps): Lines => {
  return (lines ?? []).map((line: Line) => {
    let updated = line;
    while (updated.includes('||')) {
      updated = updated.replace('||', '|xxx|');
    }
    return updated;
  });
};
