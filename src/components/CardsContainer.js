export class CardsContainer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    console.log("componente container renderizado");
    //styles
    const containerStyles = document.createElement("style");
    const customStyles = `
      .container {
        display: "flex";
        -webkit-box-pack: "center";
        justify-content: "center";
        -webkit-box-align: "center";
        align-items: "center";
        padding: 4.5rem 0px;
        background: rgb(39, 43, 51);
        min-height: calc(50vh - 60px);
      }
      .card-container {
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        flex-wrap: wrap;
        max-width: 1920px;
      }
    `;
    containerStyles.innerHTML = customStyles;
    this.shadow.appendChild(containerStyles);
    //container
    const container = document.createElement("section");
    container.className = "container";
    //container cards
    const cardsContainer = document.createElement("div");
    cardsContainer.className = "card-container";
    //card
    fetch("https://rickandmortyapi.com/api/character/?page=1")
      .then((res) => res.json())
      .then((resArr) => {
        const { results } = resArr;
        results.forEach((chracter) => {
          const card = document.createElement("custom-card");
          const { name, status, species, image, location, episode } = chracter;
          card.setAttribute("imgsrc", image);
          card.setAttribute("name", name);
          card.setAttribute("status", status);
          card.setAttribute("species", species);
          card.setAttribute("location", location.name);
          card.setAttribute("urlfirstepisode", episode[0]);
          cardsContainer.appendChild(card);
        });
      })
      .catch((error) => console.error(error.message));
    container.appendChild(cardsContainer);
    this.shadow.appendChild(container);
  }
}
