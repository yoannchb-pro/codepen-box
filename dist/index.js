"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const tempjs_template_1 = __importDefault(require("tempjs-template"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function getProjects() {
  const actualPath = path_1.default.resolve(__dirname, "../projects");
  const files = fs_1.default.readdirSync(actualPath);
  const directories = files.filter((file) => {
    const stats = fs_1.default.statSync(`${actualPath}/${file}`);
    return stats.isDirectory();
  });
  return directories;
}
const compiled = tempjs_template_1.default.compileFromFile(
  path_1.default.resolve(__dirname, "../template/template.html"),
  {
    projects: getProjects(),
  }
);
fs_1.default.writeFileSync(
  path_1.default.resolve(__dirname, "../index.html"),
  compiled,
  "utf-8"
);
//# sourceMappingURL=index.js.map
