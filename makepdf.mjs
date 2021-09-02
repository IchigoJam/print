import puppeteer from "puppeteer";
import HTMLParser from "node-html-parser";
import fetch from "node-fetch";
import merge from "easy-pdf-merge";
import fs from "fs";

const mergeAsync = async (pdfs, dstfn) => {
  return new Promise((resolve, reject) => {
    merge(pdfs, dstfn, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

const makePDF = async (browser, url, dstfn) => {
  fs.mkdirSync("temp", { recursive: true });

  const html = await (await fetch(url)).text();
  const dom = HTMLParser.parse(html);
  const links = dom.querySelectorAll("a").map((a) => a.attributes.href).filter((a) => a.endsWith(".html"));
  console.log(links);

  const format = "a5";

  const page = await browser.newPage();
  const pdfs = [];
  for (const link of links) {
    await page.goto(url + link);
    //await page.setViewport({ width: 841, height: 1189 });
    //await page.screenshot({ path: 'example.png' });
    const path = "temp/" + link.substring(0, link.length - 4) + "pdf";
    console.log(path);
    pdfs.push(path);
    await page.pdf({ path, format });
  }

  await mergeAsync(pdfs, dstfn);
  fs.rmSync("temp", { recursive: true });
  return pdfs.length;
};


const browser = await puppeteer.launch();

const langs = ["ja", "en", "rw", "sw", "fr"];
const len = {};
for (const lang of langs) {
  const url = `https://ichigojam.github.io/print/${lang}/`;
  const dstfn = `ichigojam_print_${lang}.pdf`;
  const cnt = await makePDF(browser, url, dstfn);
  len[lang] = cnt;
}

await browser.close();
console.log(len);
console.log("all", Object.values(len).reduce((pre, n) => n + pre, 0));
