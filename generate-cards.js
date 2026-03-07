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
<svg xmlns="http://www.w3.org/2000/svg" width="420" height="140">

<style>
.title {
fill:#39ff14;
font-size:18px;
font-family:Segoe UI, Arial;
font-weight:bold;
}

.desc {
fill:#c9d1d9;
font-size:13px;
font-family:Segoe UI, Arial;
}

.box {
fill:#0d1117;
stroke:#30363d;
stroke-width:1;
}

</style>

<rect class="box" x="0" y="0" width="100%" height="100%" rx="12"/>

<text x="20" y="45" class="title">
${repo}
</text>

<text x="20" y="85" class="desc">
github.com/${username}/${repo}
</text>

</svg>
`;

fs.writeFileSync(`assets/${repo}.svg`, svg);

});

console.log("Cards gerados corretamente");
