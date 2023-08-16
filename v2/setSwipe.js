export const setSwipe = (t, handleSwipeRight, handleSwipeLeft) => {
  const ignoreX = 30;
	let startX;
  let moveX;
	let multi = false;
	t.addEventListener("touchstart", (e) => {
		if (e.touches.length > 1) {
			multi = true;
			return;
		}
		//e.preventDefault();
		startX = e.touches[0].pageX;
	});
	t.addEventListener("touchmove", (e) => {
		if (e.touches.length > 1) {
			multi = true;
			return;
		}
    //e.preventDefault();
		moveX = e.changedTouches[0].pageX;
	});
	t.addEventListener("touchend", (e) => {
		if (!multi) {
			if (startX > moveX + ignoreX) {
				if (handleSwipeRight) handleSwipeRight();
			} else if (startX < moveX - ignoreX) {
				if (handleSwipeLeft) handleSwipeLeft();
			}
		}
	});
};
