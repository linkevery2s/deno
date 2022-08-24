const res = await fetch('https://api.p2pquake.net/v1/human-readable');
const json = res.json();
const data = await json;

//デバッグは以下
//console.log(data);

await Deno.writeTextFile("test.json", JSON.stringify(data));
