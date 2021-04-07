export default function userInputHandler(el, eventHandler){
    let container = el.getBoundingClientRect();
    let target = undefined;
    let pos = {
		x: 0,
		y: 0,
		x2: 0,
		y2: 0,
		rotateStart: 0,
		angleChange: 0,
		prev: {
			x: 0,
			y: 0				
		},
		start: {
			x: 0,
			y: 0
		}
	};
    el.addEventListener('mousedown', e => {
        e.preventDefault();
		target = e.target;
		pos.x = (e.clientX - container.left);
		pos.y = (e.clientY - container.top);
		pos.start.x = pos.x;
		pos.start.y = pos.y;
		pos.prev.x = pos.x;
		pos.prev.y = pos.y;
        eventHandler({
			type: 'dragStart',
			target: target
		})
    })

    el.addEventListener('mousemove', e => {
		e.preventDefault();
		pos.x = (e.clientX - container.left);
		pos.y = (e.clientY - container.top);
	});

    el.addEventListener('mouseup', e => {
		target = undefined;
		eventHandler({
			type: 'dragEnd'
		});				
	});

    const hasMoved = () => {
		if(pos.x!==pos.prev.x || pos.y!==pos.prev.y){
			pos.prev.x = pos.x;
			pos.prev.y = pos.y;
			return true;
		}
		return false;
	}

	const animationFrame = () => {
		if(target && hasMoved()){
			eventHandler({
				type: 'dragMove',
				offset: {
					x: pos.x - pos.start.x,
					y: pos.y - pos.start.y
				},
				rotate: pos.angleChange
			});
		}
		window.requestAnimationFrame(() => animationFrame());
	}
	window.requestAnimationFrame(() => animationFrame());
}