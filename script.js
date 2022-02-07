// const fil = persongalleri j.son
const header = document.querySelector(".h1_kategori");
const url = "https://babushka-dd8a.restdb.io/rest/menu";
const options = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};
document.addEventListener("DOMContentLoaded", start);
let retter;
let filter = "alle";

// første funktion der kaldes efter DOM er loaded
function start() {
  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerRetter)
  );
  hentData();
}
// eventlistener knyttet til knapperne der vælger hvad for et filter der er aktivit
function filtrerRetter() {
  filter = this.dataset.kategori;
  console.log("filter", filter);
  visRetter();
  header.textContent = this.textContent;
}
async function hentData() {
  const resspons = await fetch(url, options);
  retter = await resspons.json();
  visRetter();
}
// Funktion der viser retter i listeview
function visRetter() {
  const section = document.querySelector("section");
  const template = document.querySelector("template").content;
  section.textContent = "";

  retter.forEach((ret) => {
    console.log("kategori", ret.kategori);
    if (filter == ret.kategori || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector(".navn").textContent = ret.navn;
      klon.querySelector(".pris").textContent = ret.pris + "kr.";
      klon.querySelector(".kortbeskrivelse").textContent = ret.kortbeskrivelse;
      klon.querySelector(".langbeskrivelse").textContent = ret.langbeskrivelse;
      klon.querySelector(".oprindelsesregion").textContent =
        ret.oprindelsesregion;
      klon.querySelector(".billede").src = `billeder/${ret.billednavn}-md.jpg`;
      section.appendChild(klon);
    }
  });
}

hentData();
