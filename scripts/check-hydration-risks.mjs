import fs from "node:fs";
import path from "node:path";

const roots = ["app", "components", "lib"];
const extensions = new Set([".ts", ".tsx", ".js", ".jsx"]);
const rules = [
  {
    name: "Non-deterministic useState initializer",
    pattern: /useState(?:<[^>]+>)?\(\s*(?:\(\s*=>\s*)?(?:Date\.now\(\)|Math\.random\(\)|new Date\()/gms,
  },
  {
    name: "Browser API inside useState initializer",
    pattern:
      /useState(?:<[^>]+>)?\(\s*\(\s*=>[\s\S]{0,240}?(?:window\.|document\.|localStorage|sessionStorage|matchMedia|typeof window)/gms,
  },
];

function walk(dir, files) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(entryPath, files);
      continue;
    }

    if (extensions.has(path.extname(entry.name))) {
      files.push(entryPath);
    }
  }
}

function getLineNumber(text, index) {
  return text.slice(0, index).split("\n").length;
}

const files = [];
for (const root of roots) {
  const rootPath = path.join(process.cwd(), root);
  if (fs.existsSync(rootPath)) {
    walk(rootPath, files);
  }
}

const findings = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");

  for (const rule of rules) {
    for (const match of content.matchAll(rule.pattern)) {
      findings.push({
        rule: rule.name,
        file,
        line: getLineNumber(content, match.index ?? 0),
        snippet: match[0].split("\n").slice(0, 3).join(" ").trim(),
      });
    }
  }
}

if (findings.length > 0) {
  console.error("Hydration-risk patterns found:");

  for (const finding of findings) {
    console.error(`- ${path.relative(process.cwd(), finding.file)}:${finding.line} [${finding.rule}]`);
    console.error(`  ${finding.snippet}`);
  }

  process.exit(1);
}

console.log("No hydration-risk patterns found.");
