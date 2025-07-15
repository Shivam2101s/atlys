import dayjs from "dayjs";

export function formatDate(timeStamp) {
  return dayjs(timeStamp).format("DD MMM YYYY, hh:mm A");
}
