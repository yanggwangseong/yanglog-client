import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export function getTimeDifference(targetDate: string) {
	const now = dayjs();

	const target = dayjs(targetDate);

	const diff = now.diff(target, 'minute');

	if (diff >= 60 * 24) {
		return `${Math.floor(diff / (60 * 24))}일전`;
	} else if (diff >= 60) {
		return `${Math.floor(diff / 60)}시간전`;
	} else if (diff > 5) {
		return `${diff}분전`;
	} else {
		return '방금';
	}
}
