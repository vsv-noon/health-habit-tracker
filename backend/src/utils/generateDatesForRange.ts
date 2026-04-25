function daysBetween(a: Date, b: Date) {
  return Math.floor((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));
}

function isValidByInterval(
  current: Date,
  startDate: Date,
  interval: number,
  unit: 'daily' | 'weekly' | 'monthly'
) {
  const diffDays = daysBetween(current, startDate);

  if (unit === 'daily') {
    return diffDays % interval === 0;
  }

  if (unit === 'weekly') {
    return Math.floor(diffDays / 7) % interval === 0;
  }

  if (unit === 'monthly') {
    const months =
      current.getMonth() -
      startDate.getMonth() +
      12 * (current.getFullYear() - startDate.getFullYear());

    return months % interval === 0;
  }

  return false;
}

function getISODay(date: Date) {
  const day = date.getDay();
  return (day + 6) % 7;
}

export function generateDatesForRange(recurrence: any, start: Date, end: Date): Date[] {
  const dates: Date[] = [];

  // const current = new Date(start);
  // const current = new Date(start) < new Date() ? new Date() : new Date(start);
  const startDate =
    new Date(start) > new Date(recurrence.start_date)
      ? new Date(start)
      : new Date(recurrence.start_date);

  const current =
    new Date(start) > new Date(recurrence.start_date)
      ? new Date(start)
      : new Date(recurrence.start_date);
  const endDate =
    new Date(end) < new Date(recurrence.end_date) ? new Date(end) : new Date(recurrence.end_date);

  while (current <= endDate) {
    const day = getISODay(current);
    const date = current.getDate();

    if (
      recurrence.type === 'daily' &&
      isValidByInterval(current, startDate, recurrence.interval, 'daily')
    ) {
      dates.push(new Date(current));
    }

    if (recurrence.type === 'weekly') {
      if (
        recurrence.days_of_week?.includes(day) &&
        isValidByInterval(current, startDate, recurrence.interval, 'weekly')
      ) {
        dates.push(new Date(current));
      }
    }

    if (recurrence.type === 'monthly') {
      if (
        recurrence.day_of_month === date &&
        isValidByInterval(current, startDate, recurrence.interval, 'monthly')
      ) {
        dates.push(new Date(current));
      }
    }

    // if (recurrence.type === 'weekly' && recurrence.days_of_week?.includes(day)) {
    //   dates.push(new Date(current));
    // }

    // if (recurrence.type === 'monthly' && recurrence.day_of_month === date) {
    //   dates.push(new Date(current));
    // }

    current.setDate(current.getDate() + 1);
  }

  return dates;
}

// export function generateDatesForRange(recurrence: any, start: Date, end: Date): Date[] {
//   const dates: Date[] = [];

//   const current = new Date(start) < new Date() ? new Date() : new Date(start);

//   while (current <= end) {
//     const day = current.getDay();
//     const date = current.getDate();

//     if (recurrence.type === 'daily') {
//       dates.push(new Date(current));
//     }

//     if (recurrence.type === 'weekly' && recurrence.days_of_week?.includes(day)) {
//       dates.push(new Date(current));
//     }

//     if (recurrence.type === 'monthly' && recurrence.day_of_month === date) {
//       dates.push(new Date(current));
//     }

//     current.setDate(current.getDate() + 1);
//   }

//   return dates;
// }
