// import { manageFlexMain } from "./main resize (deprecated).js";
import { fillMain } from "./mainFiller.js";
import { fillReviewPanel } from "./review-panelFiller.js";
import { showMore } from "./mainShowMore.js";

// manageFlexMain();
document.addEventListener("DOMContentLoaded", () => {
  fillReviewPanel();
  fillMain();
  showMore();
});
