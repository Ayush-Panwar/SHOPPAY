import dayjs from "dayjs";
export function calculateDiff(timeInMs) {
  const timestamDayjs = dayjs(timeInMs);
  const nowDayjs = dayjs();
  if (timestamDayjs.isBefore()) {
    return {
      seconds: "00",
      minutes: "00",
      hours: "00",
      days: "00",
    };
  }
  return {
    seconds: getRemainingSeconds(nowDayjs, timestamDayjs),
    minutes: getRemainingMinutes(nowDayjs, timestamDayjs),
    hours: getRemainingHours(nowDayjs, timestamDayjs),
    days: getRemainingDays(nowDayjs, timestamDayjs),
  };
}

function getRemainingSeconds(nowDayjs, timestamDayjs) {
  const seconds = timestamDayjs.diff(nowDayjs, "seconds") % 60;
  return padWithZeros(seconds, 2);
}
function getRemainingMinutes(nowDayjs, timestamDayjs) {
  const minutes = timestamDayjs.diff(nowDayjs, "minutes") % 60;
  return padWithZeros(minutes, 2);
}
function getRemainingHours(nowDayjs, timestamDayjs) {
  const hours = timestamDayjs.diff(nowDayjs, "hours") % 24;
  return padWithZeros(hours, 2);
}
function getRemainingDays(nowDayjs, timestamDayjs) {
  const days = timestamDayjs.diff(nowDayjs, "days");
  return padWithZeros(days, 2);
}

function padWithZeros(number, length) {
  const numberStrings = number.toString();
  if (numberStrings.length >= length) return numberStrings;
  return "0".repeat(length - numberStrings.length) + numberStrings;
}
