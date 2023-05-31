import tempjs from "tempjs-template";
import path from "path";
import fs from "fs";

function getProjects() {
  const actualPath = path.resolve(__dirname, "..");
  const files = fs.readdirSync(actualPath);

  const directories = files
    .filter((file) => {
      if (!file.startsWith("[project]")) return false;
      const stats = fs.statSync(`${actualPath}/${file}`);
      return stats.isDirectory();
    })
    .map((directory) => directory.replace("[project] ", ""));

  return directories;
}

const compiled = tempjs.compileFromFile(
  path.resolve(__dirname, "../.template/template.html"),
  {
    projects: getProjects(),
  }
);

fs.writeFileSync(path.resolve(__dirname, "../index.html"), compiled, "utf-8");
