import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ignoredDirs = new Set([".git", "node_modules", "dist", "coverage", ".cache"]);
const ignoredFiles = new Set(["package-lock.json"]);

const suspiciousPatterns = [
  { name: "OpenAI-style API key", pattern: /sk-[A-Za-z0-9_-]{20,}/g },
  { name: "GitHub token", pattern: /gh[pousr]_[A-Za-z0-9_]{20,}/g },
  { name: "JWT", pattern: /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g },
  {
    name: "Generic assigned secret",
    pattern: /\b(?:api[_-]?key|secret|token|password)\b\s*[:=]\s*["']?(?!replace_me|your_|example|placeholder|process\.env|os\.environ|<)[A-Za-z0-9_./+=-]{16,}/gi,
  },
];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relative = path.relative(root, fullPath);

    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        files.push(...walk(fullPath));
      }
      continue;
    }

    if (entry.isFile() && !ignoredFiles.has(entry.name)) {
      files.push(relative);
    }
  }

  return files;
}

const findings = [];

for (const file of walk(root)) {
  const fullPath = path.join(root, file);
  const content = fs.readFileSync(fullPath, "utf8");

  for (const { name, pattern } of suspiciousPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      findings.push(`${file}: possible ${name}`);
    }
  }
}

if (findings.length) {
  console.error(findings.join("\n"));
  process.exit(1);
}

console.log("Secret scan passed.");
