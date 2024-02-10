import { CustomBody } from "./app.js";
import { CustomHeader } from "./src/components/Header.js";
import { CardsContainer } from "./src/components/CardsContainer.js";
import { CustomCard } from "./src/components/Card.js";
import { SectionCard } from "./src/components/SectionCard.js";

window.customElements.define("custom-body", CustomBody);
window.customElements.define("custom-header", CustomHeader);
window.customElements.define("cards-container", CardsContainer);
window.customElements.define("custom-card", CustomCard);
window.customElements.define("section-card", SectionCard);
