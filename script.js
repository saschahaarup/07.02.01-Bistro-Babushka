// const fil = persongalleri j.son
const url = "https://babushka-dd8a.restdb.io/rest/menu";
const options = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

let retter;
let filter = "alle";

// første funktion der kaldes efter DOM er loaded
const filterknapper = document.querySelectorAll("nav button");
filterknapper.forEach((knap) => knap.addEventListener("click", filtrerRetter));
hentData();

// eventlistener knyttet til knapperne der vælger hvad for et filter der er aktivit
function filtrerRetter() {
  filter = this.dataset.kategori;
  console.log("filter", filter);
  vis();
  header.textContent = this.textContent;
}
async function hentData() {
  const resspons = await fetch(url, options);
  retter = await resspons.json();
  vis();
}

// Funktion der viser retter i listeview
function vis(retter) {
  const section = document.querySelector("section");
  const template = document.querySelector("template").content;
  const header = document.querySelector("header h1");
  section.textContent = "";

  retter.forEach((ret) => {
    if (filter == ret.kategori || filter == "alle") {
      console.log("kategori", ret.kategori);
      const klon = template.cloneNode(true).content;
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
