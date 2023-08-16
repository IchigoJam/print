import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { writeData } from "https://js.sabae.cc/writeData.js";

const data = await dir2array(".");
data.sort();
const list = [];
for (const fn of data) {
	const nn = fn.split("-");
	const n1 = parseInt(nn[0]);
	const n2 = parseInt(nn[1]);
	if (isNaN(n1) || isNaN(n2)) {
		continue;
	}
	const html = await Deno.readTextFile(fn);
	const m = html.match(/<title>(.+)<\/title>/);
	const title = m[1];
	list.push({ fn, title });
}
await writeData("list", list);
