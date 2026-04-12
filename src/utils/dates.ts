

type CalendarDateTime = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second?: number;
};
const toJSDate = (d: Date | CalendarDateTime): Date => {
  if (d instanceof Date) return d;

  const date = new Date(
    d.year,
    d.month - 1,
    d.day,
    d.hour,
    d.minute,
    d.second || 0
  );
  if (isNaN(date.getTime())) {
    throw new Error("Fecha inválida");
  }

  return date;
};

export  default toJSDate