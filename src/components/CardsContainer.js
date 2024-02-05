class CardsContainer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
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
        resArr.results.forEach((chracter) => {
          const {name, status, species, image, location, episode} = chracter
          const card = document.createElement("custom-card");
          cardsContainer.appendChild(card);
        });
      });

    container.appendChild(cardsContainer);
    this.shadow.appendChild(container);
    console.log("componente container renderizado");
  }
}

window.customElements.define("cards-container", CardsContainer);
