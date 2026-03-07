const fs = require("fs");

const username = "lucasitdias";

const repos = [
  "Sistema-de-Editoras",
  "SE-LIBERTA-BRASIL",
  "pizzaria-massa-nostra",
  "Quiz-App",
  "Aplicacao-API-Postgres"
];

if (!fs.existsSync("assets")) {
  fs.mkdirSync("assets");
}

repos.forEach(repo => {

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120">
<style>
.title { fill:#58a6ff; font-size:20px; font-family:Arial }
.desc { fill:#c9d1d9; font-size:14px; font-family:Arial }
</style>

<rect width="100%" height="100%" fill="#0d1117" rx="15"/>

<text x="20" y="50" class="title">
${repo}
</text>

<text x="20" y="80" class="desc">
github.com/${username}/${repo}
</text>

</svg>
`;

fs.writeFileSync(`assets/${repo}.svg`, svg);

});

console.log("SVGs gerados com sucesso");
