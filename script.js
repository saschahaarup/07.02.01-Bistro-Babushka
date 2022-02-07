// const fil = persongalleri j.son
const url = "https://babushka-dd8a.restdb.io/rest/menu";
const template = document.querySelector("template");
const section = document.querySelector("section");
const options = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

async function hentData() {
  const resspons = await fetch(url, options);
  const json = await resspons.json();
  vis(json);
}

function vis(retter) {
  console.log(retter);

  retter.forEach((ret) => {
    const klon = template.cloneNode(true).content;
    klon.querySelector(".kategori").textContent = ret.kategori;
    klon.querySelector(".navn").textContent = ret.navn;
    klon.querySelector(".pris").textContent = ret.pris;
    klon.querySelector(".kortbeskrivelse").textContent = ret.kortbeskrivelse;
    klon.querySelector(".langbeskrivelse").textContent = ret.langbeskrivelse;
    klon.querySelector(".oprindelsesregion").textContent =
      ret.oprindelsesregion;
    klon.querySelector(".billede").src = "medium/ + -md.jpg" + ret.billedenavn;
    section.appendChild(klon);
  });
}

hentData();
