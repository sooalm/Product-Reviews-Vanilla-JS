// import { manageFlexMain } from "./main resize (deprecated).js";
import { fillMain } from "./main filler.js";
import { fillReviewPanel } from "./review-panel filler.js";
import { showMore } from "./main showMore";

// manageFlexMain();
document.addEventListener("DOMContentLoaded", () => {
  fillReviewPanel();
  fillMain();
  showMore();
});
