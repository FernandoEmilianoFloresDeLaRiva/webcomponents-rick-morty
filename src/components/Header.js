class CustomHeader extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.title = this.getAttribute("title") ?? "";
    this.painted = false;
  }
  connectedCallback() {
    this.painted = true;
    console.log("componente header renderizado");
    //styles
    const containerStyles = document.createElement("style");
    const styles = `
    .container {
      display: flex; 
      justify-content: center; 
      align-items: center; 
      flex-direction: column; 
      height: calc(50vh - 60px); 
      text-align: center; 
      background-color: rgb(255, 255, 255); 
      position: relative;
      }
      #title{
      margin: 0px; 
      color: rgb(32, 35, 41); 
      border: none; 
      font-weight: 900; 
      z-index: 1; 
      font-size: 5.625rem; 
      }
      .slot-container{
      position: absolute;
      width: 100%; 
      height: 100%;
      }
      ::slotted(svg){
      height : 100%; 
      width : 100%;
      fill : rgb(245, 245, 245);
      }
    `;
    containerStyles.innerHTML = styles;
    //container
    const containerHeader = document.createElement("header");
    containerHeader.className = "container";
    //title
    const h1Title = document.createElement("h1");
    h1Title.id = "title";
    h1Title.innerHTML = this.title;
    //slot container
    const slotContainer = document.createElement("div");
    slotContainer.className = "slot-container";
    //slot
    const slot = document.createElement("slot");
    slot.name = "backgroundImg";
    //creating container
    slotContainer.appendChild(slot);
    containerHeader.appendChild(h1Title);
    containerHeader.appendChild(slotContainer);
    this.shadow.appendChild(containerStyles);
    this.shadow.appendChild(containerHeader);
  }

  disconnectedCallback() {
    this.painted = false;
  }

  attributeChangedCallback(name, oldName, newName) {
    if (this.painted && name === "title" && oldName !== newName) {
      this.title = newName;
      const customTitle = this.shadow.getElementById("title");
      customTitle.innerHTML = this.title;
      console.log(
        `El atributo con nombre ${name} cambio de ${oldName} a ${newName}`
      );
    }
  }

  static get observedAttributes() {
    return ["title"];
  }
}

window.customElements.define("custom-header", CustomHeader);
