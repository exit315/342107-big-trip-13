const isFuture = (dateBegin) => {
  return dayjs(dateBegin).isAfter(dayjs(), `D`);
}

const isPast = (dateEnd) => {
  return dayjs(dateEnd).isBefore(dayjs(), `D`);
}

const filterEvents = {
  everything: (events) => events.length,
  future: (events) => events.filter((event) => event.isFuture).length,
  past: (events) => events.filter((event) => event.isPast).length,
}

export const generateFilter = (events) => {
  return Object.entries(filterEvents).map(([filterName, countEvents]) => {
    return {
      name: filterName,
      count: countEvents(events),
    };
  });
}
