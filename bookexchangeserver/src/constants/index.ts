import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

export const SG_TIMEZONE = 'Asia/Singapore';
export const EARLIEST_DATE = dayjs().tz(SG_TIMEZONE).startOf('day').year(1970).month(0).date(1).toDate();
