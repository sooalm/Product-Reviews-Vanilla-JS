export function manageFlexMain() {
  console.log(
    getComputedStyle(document.querySelector(".testimonial__score")).bottom,
  );
  const container = document.querySelector(".main");
  const items = Array.from(document.querySelectorAll(".testimonial"));

  const gap = parseInt(getComputedStyle(container).gap) || 0;

  let avaibleHeight = container.offsetHeight;

  items.forEach((item) => (item.style.display = "block"));

  let usedHeight = 0;

  items.forEach((item, index) => {
    let totalHeight = item.offsetHeight + (index > 0 ? gap : 0);

    if (totalHeight + usedHeight > avaibleHeight) {
      item.style.display = "none";
    } else {
      usedHeight += totalHeight;
    }
  });

  window.addEventListener("load", manageFlexMain);
  window.addEventListener("resize", manageFlexMain);
}

export function fillMainReviewBox() {}
