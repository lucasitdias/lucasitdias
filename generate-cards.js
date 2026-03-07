const fs = require("fs");
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit();
const username = "lucasitdias"; // seu GitHub
const repos = [
  "Sistema-de-Editoras",
  "SE-LIBERTA-BRASIL",
  "pizzaria-massa-nostra",
  "Quiz-App",
  "Aplicacao-API-Postgres"
];

async function generate() {
  for (const repo of repos) {
    const { data } = await octokit.repos.get({
      owner: username,
      repo
    });

    const name = data.name;
    const desc = data.description || "No description";
    const stars = data.stargazers_count;
    const language = data.language || "";

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120">
  <rect width="400" height="120" fill="#1e1e1e" rx="10"/>
  <text x="20" y="40" fill="white" font-size="20" font-family="sans-serif">${name}</text>
  <text x="20" y="70" fill="#c0c0c0" font-size="14" font-family="sans-serif">${desc}</text>
  <text x="20" y="100" fill="#f0f0f0" font-size="12" font-family="sans-serif">⭐ ${stars} • ${language}</text>
</svg>
    `;

    fs.writeFileSync(`assets/${repo}.svg`, svg);
    console.log(`Generated ${repo}.svg`);
  }
}

generate();
