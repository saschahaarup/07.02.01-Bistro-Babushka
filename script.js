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

function vis(personliste) {
  // console.log(personliste);
  personliste.forEach((person) => {
    const klon = template.cloneNode(true).content;
    klon.querySelector(".profilbillede").src = "faces/" + person.profilbillede;
    klon.querySelector(".fornavn").textContent = person.fornavn;
    klon.querySelector(".efternavn").textContent = person.efternavn;
    klon.querySelector(".email").textContent = person.email;
    section.appendChild(klon);
  });
}

hentData();
