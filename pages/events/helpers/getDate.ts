import { DateTime } from "luxon";

export default function getDate(
  startDate?: string | null,
  endDate?: string | null
) {
  if (!startDate) return "";
  let result = DateTime.fromISO(startDate).toFormat("dd MMMM", {
    locale: "ru",
  });

  if (endDate) {
    const stringifiedEndDate = DateTime.fromISO(endDate).toFormat("dd MMMM", {
      locale: "ru",
    });
    result = `${result} - ${stringifiedEndDate}`;
  }

  return result;
}
