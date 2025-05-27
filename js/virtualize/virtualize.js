export function virtualize() {
  const main = document.querySelector(".main");
  const container = document.querySelector(".testimonial-container");
  const allTestimonials = Array.from(container.querySelectorAll(".testimonial"));

  container.removeEventListener("scroll", virtualizeScroll);
  container.addEventListener("scroll", virtualizeScroll);

  function virtualizeScroll() {
    let deletedTop = [];
    let deletedBottom = [];
    const BUFFER = 5;

    allTestimonials.forEach((item) => {
      function toggleTopElements() {
        // const currentPadding = parseFloat(getComputedStyle(container).paddingTop);
        let isAboveTop = item.offsetHeight * BUFFER + item.offsetTop < container.scrollTop;

        if (isAboveTop) {
          // console.log("deleted", item.querySelector(".testimonial__username").innerHTML);
          deletedTop.unshift(item);
          item.remove();

          // container.style.paddingTop = currentPadding + 150 + "px";
          // container.scrollTop += 150;
        }
        let isBelowTop = item.offsetHeight / BUFFER + item.offsetTop > container.scrollTop;
        if (isBelowTop) {
          deletedTop.forEach((item) => {
            // container.style.paddingTop = currentPadding - 150 + "px";

            container.prepend(item);
            // container.scrollTop -= 150;
          });
        }
      }
      toggleTopElements();

      function toggleBottomElements() {
        let isBelow =
          item.offsetHeight * BUFFER + item.offsetTop >
          container.scrollTop + container.clientHeight + item.offsetHeight;
        // container.scrollHeight - container.scrollTop - container.clientHeight;

        if (isBelow) {
          console.log("deleted", item.querySelector(".testimonial__username").innerHTML);
          deletedBottom.push(item);
          item.remove();
        }
        let isAbove = item.offsetHeight / BUFFER + item.offsetTop < container.scrollTop + container.clientHeight;
        if (isAbove) {
          deletedBottom.forEach((item) => {
            container.append(item);
          });
        }
      }
      toggleBottomElements();
    });
  }

  /*  const direction = container.scrollTop > scrollStart ? 1 : -1;
  toggleTopItems(direction);
  toggleBottomItems(direction);
  */
}
