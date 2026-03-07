import fs from "fs";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit();
const username = "lucasitdias";
const repos = [
  "Sistema-de-Editoras",
  "SE-LIBERTA-BRASIL",
  "pizzaria-massa-nostra",
  "Quiz-App",
  "Aplicacao-API-Postgres"
];

async function generate() {
  for (const repo of repos) {
    const { data } = await octokit.repos.get({ owner: username, repo });

    const name = data.name;
    const desc = data.description || "Sem descrição";
    const stars = data.stargazers_count;
    const language = data.language || "";

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <rect width="400" height="200" fill="#0d1117" rx="12" ry="12"/>
  <text x="20" y="40" fill="#00ff00" font-size="18" font-family="sans-serif" font-weight="bold">${name}</text>
  <text x="20" y="80" fill="#ffffff" font-size="14" font-family="sans-serif">${desc}</text>
  <text x="20" y="160" fill="#58a6ff" font-size="12" font-family="sans-serif">⭐ ${stars} • ${language}</text>
</svg>
    `;

    fs.writeFileSync(`assets/${repo}.svg`, svg);
    console.log(`Generated ${repo}.svg`);
  }
}

generate();
