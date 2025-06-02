export function virtualize() {
  const scroll = document.querySelector(".testimonial-container");
  const container = scroll.querySelector(".phantom-container");
  const ITEM_HEIGHT = 150;

  let allTestimonials = Array.from(container.querySelectorAll(".testimonial"));

  scroll.removeEventListener("scroll", virtualizeScroll);
  scroll.addEventListener("scroll", virtualizeScroll);

  let topEmptyDiv = scroll.querySelector(".empty-div--top");
  if (!topEmptyDiv) {
    topEmptyDiv = document.createElement("div");
    topEmptyDiv.classList.add("empty-div--top");
    topEmptyDiv.style.height = 0 + "px";
    topEmptyDiv.style.backgroundColor = "red";
    topEmptyDiv.style.width = "100%";
    topEmptyDiv.style.flexShrink = "0";

    scroll.prepend(topEmptyDiv);
  }

  // let bottomEmptyDiv = scroll.querySelector(".empty-div--bottom");
  // if (!bottomEmptyDiv) {
  //   bottomEmptyDiv = document.createElement("div");
  //   bottomEmptyDiv.classList.add("empty-div--bottom");
  //   bottomEmptyDiv.style.height = 0 + "px";
  //   bottomEmptyDiv.style.backgroundColor = "red";
  //   bottomEmptyDiv.style.width = "100%";
  //   bottomEmptyDiv.style.flexShrink = "0";

  //   scroll.append(bottomEmptyDiv);
  // }

  let deletedTop = [];
  // let deletedBottom = [];
  const BUFFER = 10;
  let rafId = null;
  function virtualizeScroll() {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    let isAboveTop = 1;
    rafId = requestAnimationFrame(() => {
      toggleTopElements();
    });

    function toggleTopElements() {
      if (allTestimonials.length) {
        isAboveTop = ITEM_HEIGHT * BUFFER + allTestimonials[0].offsetTop < scroll.scrollTop;

        if (isAboveTop) {
          let element = allTestimonials.shift();

          deletedTop.unshift(element);
          element.remove();
          topEmptyDiv.style.height = `${parseInt(getComputedStyle(topEmptyDiv).height) + ITEM_HEIGHT}px`;
        }
      }
      let isBelowTop = scroll.scrollTop < topEmptyDiv.offsetHeight + ITEM_HEIGHT * BUFFER;
      if (isBelowTop && deletedTop.length) {
        let element = deletedTop.shift();

        allTestimonials.unshift(element);

        container.prepend(element);
        topEmptyDiv.style.height = `${parseInt(getComputedStyle(topEmptyDiv).height) - element.offsetHeight}px`;
      }
    }

    // function toggleBottomElements() {
    //   let isBelow =
    //     item.offsetHeight * BUFFER + item.offsetTop > scroll.scrollTop + scroll.clientHeight + item.offsetHeight;
    //   // container.scrollHeight - container.scrollTop - container.clientHeight;

    //   if (isBelow) {
    //     console.log("deleted", item.querySelector(".testimonial__username").innerHTML);
    //     deletedBottom.push(item);
    //     item.remove();
    //   }
    //   let isAbove = item.offsetHeight / BUFFER + item.offsetTop < scroll.scrollTop + scroll.clientHeight;
    //   if (isAbove) {
    //     deletedBottom.forEach((item) => {
    //       container.append(item);
    //     });
    //   }
    // }
    // toggleBottomElements();
  }

  // scroll.removeEventListener("scroll", throttle);
}
