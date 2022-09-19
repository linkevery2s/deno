import { DOMParser, Element, } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { download, Destination } from "https://deno.land/x/download/mod.ts";
import { excel2csv } from "https://code4fukui.github.io/excel2csv/excel2csv.js";
import { parse } from "https://deno.land/std@0.79.0/encoding/csv.ts";
import { BufReader } from "https://deno.land/std@0.79.0/io/bufio.ts";

const res = await fetch('https://www.mhlw.go.jp/stf/seisakunitsuite/newpage_00023.html');
const data = await res.text();
const doc = new DOMParser().parseFromString(data, "text/html");


const p = doc.querySelectorAll("ul");

const aa = Array.from(p);

const bb = aa[20].querySelectorAll("a");

//console.log(bb[1].getAttribute("href"));


const url = 'https://www.mhlw.go.jp' + bb[1].getAttribute("href");

try {
  const destination: Destination = {
    file: 'download.xlsx',
    dir: './'
  }

  const fileObj = await download(url, destination);
} catch (err) {
  console.log(err)
}

await excel2csv("download.xlsx", "out.csv");

const file = await Deno.open("out.csv");

let b = [];

try {
  const buf = BufReader.create(file);
  const result = await parse(buf);
  //console.log(result);

  const aa = Array.from(result);

  for (let i = 0; i < 47; i++) {

    b[i] = aa[i + 7];

  }

  //console.log(b);

  await Deno.writeTextFile("pref.json", JSON.stringify(b));

  await Deno.remove('out.csv');

  await Deno.remove('download.xlsx');

} finally {

  file.close();
}
