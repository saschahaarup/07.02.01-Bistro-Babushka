// const fil = persongalleri j.son
const url = "https://babushka-dd8a.restdb.io/rest/menu";
const template = document.querySelector("template");
const section = document.querySelector("section");
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
  const header = document.querySelector("header h1");
  const filterknapper = document.querySelectorAll("nav button");
  filterknapper.forEach((knap) =>
    knap.addEventListener("click", filtrerRetter)
  );
  hentData();
}
// eventlistener knyttet til knapperne der vælger hvad for et filter der er aktivit
function filtrerRetter() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  visRetter();
  header.textContent = this.textContent;
}

async function hentData() {
  const resspons = await fetch(url, options);
  const json = await resspons.json();
  vis(json);
}
// Funktion der viser retter i listeview
function vis(retter) {
  //   console.log(retter);

  const section = document.querySelector("section");
  const template = document.querySelector("template").content;
  section.textContent = "";

  retter.forEach((ret) => {
    console.log("kategori", retter.kategori);

    //loop igennem json (retter)
    // tjek hvilken kategori retten har, og sammenlign med aktuelt filter eller vis alle, hvis filter har værdien "alle"

    if (filter == ret.kategori || filter == "alle") {
      console.log("kategori", ret.kategori);
      const klon = template.cloneNode(true).content;
      // klon.querySelector(".kategori").textContent = ret.kategori;
      klon.querySelector(".navn").textContent = ret.navn;
      klon.querySelector(".pris").textContent = ret.pris + "kr.";
      klon.querySelector(".kortbeskrivelse").textContent = ret.kortbeskrivelse;
      klon.querySelector(".langbeskrivelse").textContent = ret.langbeskrivelse;
      klon.querySelector(".oprindelsesregion").textContent =
        ret.oprindelsesregion;
      klon.querySelector(".billede").src = `billeder/${ret.billednavn}-md.jpg`;
      section.appendChild(klon);
    }
    // if else(filter == ret.kategori) || filter == "forretter"){

    // }
  });
}

hentData();
