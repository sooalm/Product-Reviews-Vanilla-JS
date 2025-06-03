export function virtualize(virtualizeArray, scroll, ITEM_HEIGHT) {
  let topEmptyDiv = scroll.querySelector(".empty-div--top");
  if (!topEmptyDiv) {
    topEmptyDiv = document.createElement("div");
    topEmptyDiv.classList.add("empty-div--top");
    topEmptyDiv.style.height = 0 + "px";
    // topEmptyDiv.style.backgroundColor = "red";
    topEmptyDiv.style.width = "100%";
    topEmptyDiv.style.flexShrink = "0";

    scroll.prepend(topEmptyDiv);
  }
  let bottomEmptyDiv = scroll.querySelector(".empty-div--bottom");
  if (!bottomEmptyDiv) {
    bottomEmptyDiv = document.createElement("div");
    bottomEmptyDiv.classList.add("empty-div--bottom");
    bottomEmptyDiv.style.height = 0 + "px";
    // bottomEmptyDiv.style.backgroundColor = "red";
    bottomEmptyDiv.style.width = "100%";
    bottomEmptyDiv.style.flexShrink = "0";

    scroll.append(bottomEmptyDiv);
  }

  scroll.removeEventListener("scroll", virtualizeScroll);
  scroll.addEventListener("scroll", virtualizeScroll);

  function virtualizeScroll() {
    const firstIndex = Math.floor(scroll.scrollTop / ITEM_HEIGHT);
    const visibleItemsCount = Math.ceil(scroll.clientHeight / ITEM_HEIGHT);
    const lastIndex = Math.min(firstIndex + visibleItemsCount, virtualizeArray.length);

    // 1. Обновляем верхний пустой div (замещает скрытые элементы сверху)
    topEmptyDiv.style.height = `${firstIndex * ITEM_HEIGHT}px`;

    // 2. Обновляем нижний пустой div (замещает скрытые элементы снизу)
    const hiddenBottomItems = virtualizeArray.length - lastIndex;
    bottomEmptyDiv.style.height = `${hiddenBottomItems * ITEM_HEIGHT}px`;

    // 3. Обновляем видимость элементов
    virtualizeArray.forEach((item, index) => {
      if (index >= firstIndex && index < lastIndex) {
        // Показываем элемент в видимой области
        item.classList.remove("testimonial--noDisplay");
      } else {
        // Скрываем элементы вне видимой области
        item.classList.add("testimonial--noDisplay");
      }
    });
  }
}
