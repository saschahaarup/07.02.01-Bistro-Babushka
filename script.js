// konstanter + url og key
const header = document.querySelector(".h1_kategori");
const modal = document.querySelector("#modal");
const url = "https://babushka-dd8a.restdb.io/rest/menu";
const options = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};
// se om DOM er loaded
document.addEventListener("DOMContentLoaded", start);
let retter = [];
let filter = "alle";

// første funktion der kaldes efter DOM er loaded
function start() {
  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerRetter)
  );
  hentData();
}
// eventlistener knyttet til knapperne der vælger hvad for et filter der er aktivt
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

  // ind til loop view + lyt efter om der er blevet klikket
  retter.forEach((ret) => {
    console.log("kategori", ret.kategori);
    if (filter == ret.kategori || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector(".navn").textContent = ret.navn;
      klon.querySelector(".pris").textContent = ret.pris + "kr.";
      klon.querySelector(".kortbeskrivelse").textContent = ret.kortbeskrivelse;
      klon.querySelector(".billede").src = `billeder/${ret.billednavn}-md.jpg`;
      klon
        .querySelector(".billede")
        .addEventListener("click", () => visDetaljer(ret));
      section.appendChild(klon);
    }
  });
}
// indholdet til single pop up vindue + lyt efter om der er blevet klikket
function visDetaljer(ret) {
  console.log(ret);
  modal.querySelector("h2").textContent = ret.navn;
  modal.querySelector("img").src = `billeder/${ret.billednavn}-md.jpg`;
  modal.querySelector(".langbeskrivelse").textContent = ret.langbeskrivelse;
  modal.querySelector(".oprindelsesregion").textContent =
    "Oprindelse fra " + ret.oprindelsesregion;
  modal.style.display = "block";
}
modal.addEventListener("click", () => (modal.style.display = "none"));

hentData();
