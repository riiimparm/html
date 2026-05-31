const fs = require("fs");
const path = require("path");

const files = fs.readdirSync(".")
  .filter(f => f.endsWith(".html"))
  .filter(f => f !== "index.html");

const tools = [];

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");

  const title =
    html.match(/<title>(.*?)<\/title>/is)?.[1]?.trim()
    ?? file;

  const description =
    html.match(
      /<meta\s+name=["']description["']\s+content=["'](.*?)["']/is
    )?.[1]?.trim()
    ?? "";

  tools.push({
    title,
    url: `./${file}`,
    description
  });
}

tools.sort((a, b) =>
  a.title.localeCompare(b.title)
);

fs.writeFileSync(
  "tools.json",
  JSON.stringify(tools, null, 2)
);

console.log(`generated ${tools.length} entries`);