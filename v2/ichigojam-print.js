import { setSwipe } from "./setSwipe.js";

const footer = `
<div id="credit">
	<a href=https://creativecommons.org/licenses/by/4.0/deed.ja>CC BY</a>
	<a href="./">IchigoJamプリント v2</a>
	<a href="https://ichigojam.net/">IchigoJam&reg;jig.jp</a>
</div>
`;
onload = async () => {
	const foot = document.createElement("footer");
	foot.id = "credit";
	foot.innerHTML = footer;
	const main = document.querySelector("main");
	main.appendChild(foot);

	const list = await (await fetch("list.json")).json();

	const next = () => {
		for (let i = 0; i < list.length - 1; i++) {
			if (location.href.endsWith(list[i].fn)) {
				location.href = list[i + 1].fn;
				return;
			}
		}
	};
	const prev = () => {
		for (let i = list.length - 1; i > 0; i--) {
			if (location.href.endsWith(list[i].fn)) {
				location.href = list[i - 1].fn;
				return;
			}
		}
	};

	setSwipe(main, next, prev);
	document.body.onkeyup = (e) => {
		if (e.key == "ArrowRight") {
			next();
		} else if (e.key == "ArrowLeft") {
			prev();
		}
	};
};
