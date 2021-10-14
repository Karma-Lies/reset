export const getUpcomingEvents = (events) =>
	events.filter((event) => new Date(event.startTime) >= new Date());
