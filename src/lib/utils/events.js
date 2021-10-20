/**
 * Filters a given list down to events with a start date equal to or greater than the current datetime
 * @param {Array} events
 * @returns {Array} upcoming events
 */
export const getUpcomingEvents = (events) =>
	events.filter((event) => new Date(event.startTime) >= new Date());

/**
 * Filters a given list down to events with a start date less than the current datetime
 * @param {Array} events
 * @returns {Array} past events
 */
export const getPastEvents = (events) =>
	events.filter((event) => new Date(event.startTime) < new Date());

/**
 * Sorts events by their start time in ascending or descending order
 * @param {{}[]} events set of events that needa be sorted
 * @param {Boolean} isDescending sorting order
 * @returns
 */
export const sortEventsByDate = (events, isDescending = true) =>
	events
		.slice()
		.sort(
			(a, b) =>
				new Date((isDescending ? b : a).startTime) - new Date((isDescending ? a : b).startTime)
		);
/**
 * Grabs events from the events API with query params
 * @param {Function} fetchFn SvelteKit server-side fetch function
 * @param {String} order ordering of events by time ('ASC', 'DESC')
 * @returns prop: events
 */
export async function fetchEvents(fetchFn, order = 'DESC') {
	const url = `/api/events.json?stats=true&order=${order}`;
	const res = await fetchFn(url);

	if (res.ok) {
		const { events } = await res.json();
		return {
			props: {
				events
			}
		};
	}

	return {
		status: res.status,
		error: new Error(`Could not load ${url}`)
	};
}
