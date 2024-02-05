class SectionCard extends HTMLElement {
  constructor() {
    super();
    this.painted = false;
    this.shadow = this.attachShadow({ mode: "open" });
    this.sectionTitle = this.getAttribute("sectiontitle") ?? "";
    this.sectionName = this.getAttribute("sectionname") ?? "";
  }
  connectedCallback() {
    this.painted = true;
    console.log("Componente sectionCard renderizado");
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
    titleElement.innerHTML = this.getAttribute("sectiontitle");
    const nameElement = document.createElement("span");
    nameElement.id = "name";
    nameElement.innerHTML = this.getAttribute("sectionName");
    section.appendChild(containerStyles);
    section.appendChild(titleElement);
    section.appendChild(nameElement);
    this.shadow.appendChild(section);
  }

  disconnectedCallback() {
    this.painted = false;
  }

  attributeChangedCallback(name, oldName, newName) {
    if (this.painted && name === "sectiontitle" && oldName !== newName) {
      this.sectionTitle = newName;
      const customTitle = this.shadow.getElementById("title");
      console.log(customTitle);
      customTitle.innerHTML = this.sectionTitle;
      console.log(
        `El atributo con nombre ${name} cambio de ${oldName} a ${newName}`
      );
    }
    if (this.painted && name === "sectionname" && oldName !== newName) {
      this.sectionName = newName;
      const customTitle = this.shadow.getElementById("name");
      customTitle.innerHTML = this.sectionName;
      console.log(
        `El atributo con nombre ${name} cambio de ${oldName} a ${newName}`
      );
    }
  }

  static get observedAttributes() {
    return ["sectiontitle", "sectionname"];
  }
}

window.customElements.define("section-card", SectionCard);
