const fs = require("fs");

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
.title { fill:#39ff14; font-size:18px; font-family:Segoe UI, Arial; font-weight:bold }
.desc { fill:#8b949e; font-size:13px; font-family:Segoe UI, Arial }
.border { fill:#0d1117; stroke:#30363d; stroke-width:1 }
</style>

<rect class="border" width="100%" height="100%" rx="10"/>

<text x="20" y="45" class="title">
${repo}
</text>

<text x="20" y="75" class="desc">
github.com/lucasitdias/${repo}
</text>

</svg>
`;

fs.writeFileSync(`assets/${repo}.svg`, svg);

});

console.log("cards gerados");
