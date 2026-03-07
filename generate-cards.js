import fs from "fs";
import { Octokit } from "@octokit/rest";

const username = "lucasitdias";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function generate() {

  const { data } = await octokit.repos.listForUser({
    username,
    per_page: 100
  });

  // pega apenas repos do usuário (não fork)
  const repos = data.filter(repo => !repo.fork);

  let table = `<table align="center">\n<tr>\n`;
  let col = 0;

  for (const repo of repos) {

    const name = repo.name;
    const desc = repo.description || "Projeto sem descrição";
    const stars = repo.stargazers_count;
    const language = repo.language || "N/A";

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <rect width="400" height="200" fill="#0d1117" rx="12"/>

  <text x="20" y="40" fill="#00ff7f" font-size="18" font-family="sans-serif" font-weight="bold">
    ${name}
  </text>

  <text x="20" y="80" fill="#c9d1d9" font-size="14" font-family="sans-serif">
    ${desc}
  </text>

  <text x="20" y="160" fill="#58a6ff" font-size="12" font-family="sans-serif">
    ⭐ ${stars} • ${language}
  </text>

</svg>
`;

    fs.writeFileSync(`assets/${name}.svg`, svg);

    table += `
<td width="50%" align="center">
<a href="https://github.com/${username}/${name}">
<img width="400" src="assets/${name}.svg"/>
</a>
</td>
`;

    col++;

    if (col === 2) {
      table += "\n</tr>\n<tr>\n";
      col = 0;
    }
  }

  table += "\n</tr>\n</table>";

  const readme = fs.readFileSync("README.md", "utf8");

  const updated = readme.replace(
    /<!--START_PROJECTS-->[\s\S]*<!--END_PROJECTS-->/,
    `<!--START_PROJECTS-->\n${table}\n<!--END_PROJECTS-->`
  );

  fs.writeFileSync("README.md", updated);

  console.log("README atualizado com projetos");
}

generate();
