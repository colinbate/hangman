import { cubicInOut } from 'svelte/easing';
import type { EasingFunction, TransitionConfig } from 'svelte/types/runtime/transition';

export interface DrawParams {
	delay?: number;
	speed?: number;
	duration?: number | ((len: number) => number);
	easing?: EasingFunction;
}

export function draw(node: SVGElement & { getTotalLength(): number }, {
	delay = 0,
	speed,
	duration,
	easing = cubicInOut
}: DrawParams = {}): TransitionConfig {
	const has_end_caps = getComputedStyle(node).strokeLinecap !== 'butt';
	const cap_size = has_end_caps ? parseInt(getComputedStyle(node).strokeWidth) : 0;
	const len = node.getTotalLength() + cap_size;

	if (duration === undefined) {
		if (speed === undefined) {
			duration = 800;
		} else {
			duration = len / speed;
		}
	} else if (typeof duration === 'function') {
		duration = duration(len);
	}

	return {
		delay,
		duration,
		easing,
		css: (t, u) => `stroke-dasharray: ${t * len} ${u * len}; opacity: ${t === 0 ? 0 : 1}`
	};
}
