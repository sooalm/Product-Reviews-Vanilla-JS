export function virtualize(reviewCollection, dataUsers) {
  const Main = document.querySelector(".main");
  const scroll = document.querySelector(".testimonial-container");
  const container = scroll.querySelector(".phantom-container");
  const ITEM_HEIGHT = 150;
  let allTestimonials = Array.from(container.querySelectorAll(".testimonial"));
  scroll.addEventListener("scroll", function () {
    const scrollTOP = container.scrollTop;
    const firstIndex = Math.floor(scrollTOP / 150);
    const lastIndex = firstIndex + 6;

    scroll.style.height = firstIndex * 150 + "px";

    const visibleItems = [];
    allTestimonials.slice(firstIndex, lastIndex).forEach((item) => {
      // const header = item.firstElementChild; // testimonial__header
      // const starsContainer = header.lastElementChild; // testimonial__score

      // header.children[1].textContent = "assadsda"; // testimonial__username
      // starsContainer.querySelector(".cover").style.width = "0%"; // значение ширины
      // header.firstElementChild.src = "img/Joe Peach.jpg"; // testimonial__img
      // item.lastElementChild.textContent = "lorem sdasddf safsfd"; // testimonial__quote
      // header.children[2].textContent = "21 november 2039"; // testimonial__date
      visibleItems.push(item);
    });

    scroll.replaceChildren(container, ...visibleItems);
  });

  // function fillVisible(allTestimonials) {
  //   scroll.scrollY;

  //   for (let i = 0; i < allTestimonial.length; i++) {
  //     const testimonial = allTestimonial[i];

  //     if (ITEM_HEIGHT + testimonial.offsetTop < scroll.scrollTop) {
  //       let reviewId = dataUser[i].user_id;

  //       if (reviewCollection.has(reviewId)) {
  //         let rc = reviewCollection.get(dataUser[i].user_id);
  //         let dU = dataUsers[i];

  //         // Находим внутренние элементы через DOM-свойства
  //         const header = testimonial.firstElementChild; // testimonial__header
  //         const starsContainer = header.lastElementChild; // testimonial__score

  //         header.children[1].textContent; // testimonial__username
  //         starsContainer.querySelector(".cover").style.width; // значение ширины
  //         header.firstElementChild.src; // testimonial__img
  //         testimonial.lastElementChild.textContent; // testimonial__quote
  //         header.children[2].textContent; // testimonial__date
  //       }
  //     }
  //   }
  // }
}
