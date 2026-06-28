const fs = require("fs");
const path = require("path");

const themeDir = path.join(__dirname, "..", "node_modules", "hexo-theme-particlex");
const themeConfigPath = path.join(themeDir, "_config.yml");
const themeCssPath = path.join(themeDir, "source", "css", "main.css");

function patchFile(filePath, patcher) {
  if (!fs.existsSync(filePath)) return;

  const original = fs.readFileSync(filePath, "utf8");
  const patched = patcher(original);

  if (patched !== original) {
    fs.writeFileSync(filePath, patched);
  }
}

patchFile(themeConfigPath, (content) => {
  const withoutArgvchs = content.replace(/^Argvchs:.*\n?/gm, "");
  const menuBlock = `menu:
    Home:
        name: house
        theme: solid
        link: /
    Archives:
        name: box-archive
        theme: solid
        link: /archives
    Categories:
        name: bookmark
        theme: solid
        link: /categories
    Tags:
        name: tags
        theme: solid
        link: /tags
    About:
        name: id-card
        theme: solid
        link: /about
`;

  return withoutArgvchs.replace(
    /menu:\n(?:    .+\n(?:        .+\n){3})+/,
    menuBlock
  );
});

patchFile(themeCssPath, (content) => content.replace("overflow: hidden;", "overflow: auto;"));
