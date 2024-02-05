class CustomCard extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.painted = false;
    this.imgsrc = this.getAttribute("imgsrc") ?? "";
    this.name = this.getAttribute("name") ?? "";
    this.status = this.getAttribute("status") ?? "";
    this.species = this.getAttribute("species") ?? "";
    this.location = this.getAttribute("location") ?? "";
    this.urlfirstepisode = this.getAttribute("urlfirstepisode") ?? "";
  }

  connectedCallback() {
    this.painted = true;
    console.log("componente card renderizado");
    //!styles----------------------------------------------------------------
    const containerStyles = document.createElement("style");
    const styles = `
          .container-card{
            width: 600px;
            height: 220px;
            display: flex;
            overflow: hidden;
            background: rgb(60, 62, 68);
            border-radius: 0.5rem;
            margin: 0.75rem;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
          }
          .container-img{
            flex: 2 1 0%;
            width: 100%;
          }
          .container-img img {
            width: 100%;
            height: 100%;
            margin: 0px;
            opacity: 1;
            transition: opacity 0.5s ease 0s;
            object-position: center center;
            object-fit: cover;
          }
          .container-info{
            flex: 3 1 0%;
            position: relative;
            padding: 0.75rem;
            color: rgb(255, 255, 255);
            display: flex;
            flex-direction: column;
          }
          .container-info .section {
            flex: 1 1 0%;
            display: flex;
            flex-direction: column;
            -webkit-box-pack: center;
            justify-content: center;
          }

          .container-info .section h2 {
            font-weight: 800;
            font-size: 1.5rem;
          }

          .container-status{
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            text-transform: capitalize;
            font-size: 16px;
            font-weight: 500;
          }

          .container-info .section .status {
            height: 0.5rem;
            width: 0.5rem;
            margin-right: 0.375rem;
            border-radius: 50%;
          }

          .alive{
            background: rgb(85, 204, 68);
          }

          .dead{
            background : rgb(214, 61, 46);
          }

          .container-info .section:first-child {
            -webkit-box-pack: start;
            justify-content: flex-start;
          }

          .title-location{
            color: rgb(158, 158, 158);
            font-size: 16px;
            font-weight: 500;
          }

          .name-location{
            color: rgb(245, 245, 245);;
            font-size: 16px;
            font-weight: 500;
          }

          .container-info .section:last-child {
            -webkit-box-pack: end;
            justify-content: flex-end;
          }
        `;
    containerStyles.innerHTML = styles;
    this.shadow.appendChild(containerStyles);
    //!container card--------------------------------------------------------
    const containerCard = document.createElement("article");
    containerCard.className = "container-card";
    //!picture---------------------------------------------------------------
    const pictureContainer = document.createElement("div");
    pictureContainer.className = "container-img";
    const picture = document.createElement("img");
    picture.src = this.getAttribute("imgsrc");
    picture.alt = this.getAttribute("name");
    picture.id = "srcImg";
    pictureContainer.appendChild(picture);
    containerCard.appendChild(pictureContainer);
    //!Card Data-------------------------------------------------------------
    const containerData = document.createElement("div");
    containerData.className = "container-info";
    //?Card data first section-----------------------------------------------
    const firstSection = document.createElement("div");
    firstSection.className = "section";
    //?title first section---------------------------------------------------
    const titleCard = document.createElement("h2");
    titleCard.innerHTML = this.getAttribute("name");
    titleCard.id = "titleId";
    firstSection.appendChild(titleCard);
    //?status (first section)
    const containerStatus = document.createElement("span");
    containerStatus.className = "container-status";
    const status = document.createElement("span");
    status.className = `status ${
      this.getAttribute("status") === "alive" ? "alive" : "dead"
    }`;
    containerStatus.appendChild(status);
    const statusText = document.createElement("span");
    statusText.id = "statusTextId";
    statusText.innerHTML = `${this.getAttribute(
      "status"
    )} - ${this.getAttribute("species")}`;
    containerStatus.appendChild(statusText);
    firstSection.appendChild(containerStatus);

    containerData.appendChild(firstSection);

    //?Card data second section------------------------------------------------
    const secondSection = document.createElement("section-card");
    secondSection.className = "section";
    secondSection.setAttribute("sectiontitle", "Last known location:");
    secondSection.setAttribute("sectionname", this.getAttribute("location"));
    containerData.appendChild(secondSection);

    //?Card data third section------------------------------------------------
    const thirdSection = document.createElement("section-card");
    thirdSection.className = "section";
    thirdSection.setAttribute("sectiontitle", "First seen in:");
    fetch(this.getAttribute("urlfirstepisode"))
      .then((res) => res.json())
      .then((secondRes) => {
        thirdSection.setAttribute("sectionname", secondRes.name);
      });
    containerData.appendChild(thirdSection);
    //?-----------------------------------------------------------------------
    containerCard.appendChild(containerData);
    this.shadow.appendChild(containerCard);
  }

  disconnectedCallback() {
    this.painted = false;
  }

  attributeChangedCallback(name, oldName, newName) {
    //imgSrc--------------------------------------------------------
    if (this.painted && name === "imgsrc" && oldName !== newName) {
      this.imgsrc = newName;
      const customImg = this.shadow.getElementById("srcImg");
      customImg.src = this.imgSrc;
      console.log(
        `El atributo con nombre ${name} cambio de ${oldName} a ${newName}`
      );
    }
    //name-------------------------------------------------------------
    if (this.painted && name === "name" && oldName !== newName) {
      this.name = newName;
      const customImg = this.shadow.getElementById("srcImg");
      customImg.alt = this.name;
      const customTitle = this.shadow.getElementById("titleId");
      customTitle.innerHTML = this.name;
      console.log(
        `El atributo con nombre ${name} cambio de ${oldName} a ${newName}`
      );
    }
    //status-------------------------------------------------------------
    if (this.painted && name === "status" && oldName !== newName) {
      this.status = newName;
      const statusText = this.shadow.getElementById("statusTextId");
      statusText.innerHTML = `${this.status} - ${this.species}`;
      console.log(
        `El atributo con nombre ${name} cambio de ${oldName} a ${newName}`
      );
    }
    //species----------------------------------------------------------
    if (this.painted && name === "species" && oldName !== newName) {
      this.species = newName;
      const statusText = this.shadow.getElementById("statusTextId");
      statusText.innerHTML = `${this.status} - ${this.species}`;
      console.log(
        `El atributo con nombre ${name} cambio de ${oldName} a ${newName}`
      );
    }
    //location----------------------------------------------------------
    if (this.painted && name === "location" && oldName !== newName) {
      this.location = newName;
      console.log(
        `El atributo con nombre ${name} cambio de ${oldName} a ${newName}`
      );
    }
    //urlFirstEpisode----------------------------------------------------------
    if (this.painted && name === "urlfirstepisode" && oldName !== newName) {
      this.urlfirstepisode = newName;
      console.log(
        `El atributo con nombre ${name} cambio de ${oldName} a ${newName}`
      );
    }
  }

  static get observedAttributes() {
    return [
      "name",
      "status",
      "species",
      "imgsrc",
      "location",
      "urlfirstepisode",
    ];
  }
}

window.customElements.define("custom-card", CustomCard);
