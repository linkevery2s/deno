import { download, Destination } from "https://deno.land/x/download/mod.ts";
import { parse } from "https://deno.land/x/xml/mod.ts";

const url = 'https://www.anzen.mofa.go.jp/rss/news.xml';

try {
  const dest: Destination = {
    file: 'news.xml',
    dir: './'
  }

  await download(url, dest);
} catch (err) {
  console.log(err)
}

await Deno.copyFile("news.xml", "news.txt");

// 読み込むファイルを指定
const file = await Deno.open('./news.txt');

// 文字コードを指定
const decoder = new TextDecoder('utf-8');

// ファイルの読み込み
const text = decoder.decode(await Deno.readAll(file));

// 表示
const data = parse(text);

//console.log(data);

await Deno.writeTextFile("test.json", JSON.stringify(data));
