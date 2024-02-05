class SectionCard extends HTMLElement {
  constructor() {
    super();
    this.painted = false;
    this.shadow = this.attachShadow({ mode: "open" });
    this.title = this.getAttribute("title") ?? "Last known location:";
    this.name = this.getAttribute("name") ?? "Snake Planet";
  }
  connectedCallback() {
    const containerStyles = document.createElement("style");
    const styles = `
          .section {
            flex: 1 1 0%;
            display: flex;
            flex-direction: column;
            -webkit-box-pack: center;
            justify-content: center;
          }
          #title{
            color: rgb(158, 158, 158);
            font-size: 16px;
            font-weight: 500;
          }

          #name{
            color: rgb(245, 245, 245);;
            font-size: 16px;
            font-weight: 500;
          }
        `;
    containerStyles.innerHTML = styles;
    const section = document.createElement("div");
    section.className = "section";
    //?Location (second section)
    const titleElement = document.createElement("span");
    titleElement.id = "title";
    titleElement.innerHTML = this.title;
    const nameElement = document.createElement("span");
    nameElement.id = "name";
    nameElement.innerHTML = this.name;
    section.appendChild(containerStyles);
    section.appendChild(titleElement);
    section.appendChild(nameElement);
    this.shadow.appendChild(section);
    this.painted = true;
    console.log("Componente sectionCard renderizado");
  }

  disconnectedCallback() {
    this.painted = false;
  }

  attributeChangedCallback(name, oldName, newName) {
    if (this.painted && name === "title" && oldName !== newName) {
      this.title = newName;
      const customTitle = this.shadow.getElementById("title");
      console.log(customTitle);
      customTitle.innerHTML = this.title;
      console.log(
        `El atributo con nombre ${name} cambio de ${oldName} a ${newName}`
      );
    }
    if (this.painted && name === "name" && oldName !== newName) {
      this.name = newName;
      const customTitle = this.shadow.getElementById("name");
      customTitle.innerHTML = this.name;
      console.log(
        `El atributo con nombre ${name} cambio de ${oldName} a ${newName}`
      );
    }
  }

  static get observedAttributes() {
    return ["name", "title"];
  }
}

window.customElements.define("section-card", SectionCard);
