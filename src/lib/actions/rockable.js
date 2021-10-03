/**
 * Action to rock an element in 3D space with mouse hover
 * @param {HTMLElement} node
 * @returns
 */
export function rockable(node) {
	let { offsetWidth, offsetHeight } = node;
	let center = {
		x: offsetWidth / 2,
		y: offsetHeight / 2
	};
	let mouseRelative = {
		x: 0,
		y: 0
	};
	console.log(offsetWidth, offsetHeight);
	console.log(center.x, center.y);
	// node.style.perspectiveOrigin = 'center';

	function onMousemove(event) {
		mouseRelative.x = event.offsetX - center.x;
		mouseRelative.y = event.offsetY - center.y;
		console.log(mouseRelative);
		node.style.transform = `rotateY(${mouseRelative.x / 16}deg) rotateX(${
			mouseRelative.y / 16
		}deg)`;
	}

	node.addEventListener('mousemove', onMousemove);

	return {
		destroy() {
			node.removeEventListener('mousemove', onMousemove);
		}
	};
}
