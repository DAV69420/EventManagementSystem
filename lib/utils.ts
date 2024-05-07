import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";
import qs from "query-string";

import { UrlQueryParams, RemoveUrlQueryParams } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const formatPrice = (price: string) => {
  const amount = parseFloat(price);
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(amount);

  return formattedPrice;
};

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};

export class DateUtils {
  private static mday: any;
  private static mmonth: any;
  private static myear: any;
  private static mtimepart: any;
  // Function to convert day into ordinal number
  private static getOrdinalNum(n: number): string {
    return (
      n +
      (n > 0
        ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
        : "")
    );
  }

  static formatEvent(datetimeraw: Date): void {
    const eventDate = new Date(datetimeraw);
    let options: any = {
      year: "numeric",
      month: "short", // get full month name
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    let datetime = eventDate.toLocaleDateString("en-In", options);
    let [datePart, timePart] = datetime.split(",");
    let [day, month, year] = datePart.split(" ");

    day = DateUtils.getOrdinalNum(parseInt(day)); // convert day into ordinal number
    DateUtils.mday = day;
    DateUtils.mmonth = month;
    DateUtils.myear = year;
    DateUtils.mtimepart = timePart;
    return;
  }
  static formatEventDate(datetimeraw: Date): string {
    this.formatEvent(datetimeraw);
    return `${DateUtils.mday} ${DateUtils.mmonth}, ${DateUtils.myear}`;
  }
  static formatEventDateTime(datetimeraw: Date): string {
    this.formatEvent(datetimeraw);
    return `${DateUtils.mday} ${DateUtils.mmonth}, ${DateUtils.myear} @ ${DateUtils.mtimepart}`;
  }
}

export class StringUtils {
  static isAlphabetic(str: string) {
    const regex = /^[A-Za-z]*$/;
    return regex.test(str);
  }
}
