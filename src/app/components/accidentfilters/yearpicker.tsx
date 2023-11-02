import * as React from 'react';
import { TextField } from '@mui/material';

/**
 * For now the year picker is a text field that excepts either a single year,
 * or a single range of years (e.g. 1980-1989). More complex selections
 * are not possible.
 *
 * On valid input, the year picker sets parent state of the year range. Year ranges are
 * represented as an array of 4 digit numbers
 */
export default function YearPicker({
  setSelectedAccidentYears
}: {
  setSelectedAccidentYears: React.Dispatch<React.SetStateAction<number[]>>
}) {
  const [isInputValid, setIsInputValid] = React.useState(true);
  return (
    <>
      <TextField
            label='Year'
            onChange={(e) => {
              const isValid = validateInput(e.target.value);
              setIsInputValid(isValid);
              if (isValid) {
                const yearRange = parseYearOrYearRange(e.target.value);
                setSelectedAccidentYears(yearRange);
              }
            }}
            error={!isInputValid}
          />
    </>
  );
}
// TODO would be nicer to return specific errors
// so we can guide the user more specifically how to fix their input
// Would also be good to validate that the year ranges are sane (i.e. they don't
// start in the future or start before we have data)
function validateInput(str: string): boolean {
  const trimmed = str.trim().replaceAll(' ', '');
  if (trimmed.length === 0) {
    return true;
  } else if (trimmed.length === 4) {
    return isYear20thOr21stCentury(trimmed);
  } else if (trimmed.length === 9) {
    const lowerBound = trimmed.slice(0, 4);
    const upperBound = trimmed.slice(5, 9);
    if (!isYear20thOr21stCentury(lowerBound) || !isYear20thOr21stCentury(upperBound)) {
      return false;
    }
    const lowerYear = Number(lowerBound);
    const upperYear = Number(upperBound);
    if (lowerYear >= upperYear) return false;
    return true;
  } else {
    return false;
  }
}

/**
 * Parse a year or range of years into an array of numbers
 * for those years.
 * The input string is assumed to have been previously validated,
 * i.e. it looks like either '1970' or '1970-1972'
 */
function parseYearOrYearRange(str: string): number[] {
  const trimmed = str.trim().replaceAll(' ', '');
  if (trimmed.length === 4) {
    return [Number(trimmed.slice(0, 4))];
  } else if (trimmed.length === 9) {
    const lower = Number(trimmed.slice(0, 4));
    const upper = Number(trimmed.slice(5, 9)) + 1;
    const length = upper - lower;
    const years = Array(length).fill(lower);
    return years.map((y, i) => y + i);
  } else {
    return [];
  }
}

function isYear20thOr21stCentury(str: string) {
  // Years from 1900 - 2099
  const re = /^(19|20)\d{2}$/;
  const res = str.match(re);
  return res != null;
}
