const ONE_SEC_MILL_SEC = 1000;
const ONE_MIN_MILL_SEC = 1000 * 60;
const ONE_HOUR_MILL_SEC = 1000 * 60 * 60;
const ONE_DAY_MILL_SEC = 1000 * 60 * 60 * 24;
const ONE_WEEK_MILL_SEC = 1000 * 60 * 60 * 24 * 7;
const ONE_MONTH_MILL_SEC = 1000 * 60 * 60 * 24 * 30;
const ONE_YEAR_MILL_SEC = 1000 * 60 * 60 * 24 * 365;

const seconds = (millSecs: number) => {
  const secs = millSecs / ONE_SEC_MILL_SEC;
  return Math.floor(secs);
};

const minutes = (millSecs: number) => {
  const mins = millSecs / ONE_MIN_MILL_SEC;
  return Math.floor(mins);
};

const hours = (millSecs: number) => {
  const hrs = millSecs / ONE_HOUR_MILL_SEC;
  return Math.floor(hrs);
};

const days = (millSecs: number) => {
  const dys = millSecs / ONE_DAY_MILL_SEC;
  return Math.floor(dys);
};

const weeks = (millSecs: number) => {
  const wks = millSecs / ONE_WEEK_MILL_SEC;
  return Math.floor(wks);
};

const months = (millSecs: number) => {
  const mths = millSecs / ONE_MONTH_MILL_SEC;
  return Math.floor(mths);
};

const years = (millSecs: number) => {
  const yrs = millSecs / ONE_YEAR_MILL_SEC;
  return Math.floor(yrs);
};

export const elapsedTime = (dateStr: string) => {
  const date = new Date(dateStr);
  date.setSeconds(0, 0); // Set seconds and milliseconds to zero

  const candidateDateMillSec = date.getTime();
  const currentDateMillSec = new Date(Date.now()).getTime();

  const millSecDiff = removeMinusCharPrefix(
    currentDateMillSec - candidateDateMillSec
  );

  if (millSecDiff < ONE_MIN_MILL_SEC || seconds(millSecDiff) === 0) {
    return "a few seconds ago";
  }

  if (millSecDiff < ONE_HOUR_MILL_SEC) {
    if (minutes(millSecDiff) === 1) return "a minute ago";
    return `${minutes(millSecDiff)} minutes ago`;
  }

  if (millSecDiff < ONE_DAY_MILL_SEC) {
    if (hours(millSecDiff) === 1) return "an hour ago";
    return `${hours(millSecDiff)} hours ago`;
  }

  if (millSecDiff < ONE_WEEK_MILL_SEC) {
    if (days(millSecDiff) === 1) return "a day ago";
    return `${days(millSecDiff)} days ago`;
  }

  if (millSecDiff < ONE_MONTH_MILL_SEC) {
    if (weeks(millSecDiff) === 1) return "a week ago";
    return `${weeks(millSecDiff)} weeks ago`;
  }

  if (millSecDiff < ONE_YEAR_MILL_SEC) {
    if (months(millSecDiff) === 1) return "a month ago";
    return `${months(millSecDiff)} months ago`;
  }

  if (millSecDiff >= ONE_YEAR_MILL_SEC) {
    if (years(millSecDiff) === 1) return "a year ago";
    return `${years(millSecDiff)} years ago`;
  }
};

const removeMinusCharPrefix = (inputNumber: number): number => {
  let numberString: string = inputNumber.toString();

  if (numberString.startsWith("-")) {
    numberString = numberString.slice(1);
  }

  return parseInt(numberString);
};
