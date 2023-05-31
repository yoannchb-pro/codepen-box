import tempjs from "tempjs-template";
import path from "path";
import fs from "fs";

function getProjects() {
  const actualPath = path.resolve(__dirname, "../projects");
  const files = fs.readdirSync(actualPath);

  const directories = files.filter((file) => {
    const stats = fs.statSync(`${actualPath}/${file}`);
    return stats.isDirectory();
  });

  return directories;
}

const compiled = tempjs.compileFromFile(
  path.resolve(__dirname, "../template/template.html"),
  {
    projects: getProjects(),
  }
);

fs.writeFileSync(path.resolve(__dirname, "../index.html"), compiled, "utf-8");
