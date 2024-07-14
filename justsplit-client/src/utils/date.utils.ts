import moment from "moment";

export const formatTime = (date: string | Date, format: string) => {
  if (!date || !format) return null;
  return moment(date).format(format);
};
