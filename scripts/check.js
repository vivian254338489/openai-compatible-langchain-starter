import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "README.md",
  ".env.example",
  "docs/setup.md",
  "docs/troubleshooting.md",
  "docs/utm-links.md",
  "examples/chatopenai-custom-baseurl.js",
  "scripts/check.js",
  "scripts/scan-secrets.js",
  "package.json",
  "LICENSE",
  ".gitignore",
];

const failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    failures.push(`Missing required file: ${file}`);
  }
}

const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

if (fs.existsSync(path.join(root, "README.md"))) {
  const readme = read("README.md");
  const requiredPhrases = [
    "LangChain custom OpenAI endpoint",
    "ChatOpenAI baseURL",
    "OpenAI-compatible providers",
    "https://www.tken.shop/v1",
    "utm_source=github",
  ];

  for (const phrase of requiredPhrases) {
    if (!readme.includes(phrase)) {
      failures.push(`README is missing search/CTA phrase: ${phrase}`);
    }
  }
}

if (fs.existsSync(path.join(root, "examples/chatopenai-custom-baseurl.js"))) {
  const example = read("examples/chatopenai-custom-baseurl.js");
  if (!example.includes("configuration") || !example.includes("baseURL")) {
    failures.push("Example must configure ChatOpenAI with configuration.baseURL.");
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Repository content check passed.");
