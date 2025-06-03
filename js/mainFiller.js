import { virtualize } from "./virtualize/virtualize.js";
export function fillMain() {
  const Main = document.querySelector(".main");
  const scroll = Main.querySelector(".testimonial-container");
  const container = scroll.querySelector(".phantom-container");
  const testimonial = scroll.querySelector(".testimonial");
  const ITEM_HEIGHT = 150;

  async function loadData() {
    try {
      const [reviewsRes, usersRes] = await Promise.all([
        fetch("/data/product-reviews.json"),
        fetch("/data/users.json"),
      ]);

      const dataReviews = await reviewsRes.json();
      const dataUsers = await usersRes.json();

      reviewFiltr(dataReviews, dataUsers);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  }

  loadData();

  function reviewFiltr(dataReviews, dataUsers) {
    let reviewCollection = Object.values(dataReviews).reduce((map, dR) => {
      console.log("#flflflflflflflflflflflflflflflflfl");
      if (!map.has(dR.user_id)) {
        map.set(dR.user_id, dR);
      }
      return map;
    }, new Map());

    let showMore = Main.querySelector(".main__showMore");

    let virtualizeArray = [];
    addTen();
    showMore.addEventListener("click", addTen);
    function addTen() {
      let amount = 0;
      for (let dU of Object.values(dataUsers)) {
        if (reviewCollection.has(dU.user_id) && amount < 10) {
          amount++;
          let temp = createTestimonial(reviewCollection.get(dU.user_id), dU);
          reviewCollection.delete(dU.user_id);
          virtualizeArray.push(temp);
          container.append(temp);
        }
      }
      virtualize(virtualizeArray, scroll, ITEM_HEIGHT);
    }
  }

  function createTestimonial(dr, du) {
    // if (!dr.rating) return null;
    // Создаем основной контейнер
    const testimonial = document.createElement("div");
    testimonial.className = "testimonial";

    // Создаем блок заголовка
    const header = document.createElement("div");
    header.className = "testimonial__header";

    // Создаем элементы заголовка
    const img = document.createElement("img");
    img.className = "testimonial__img";
    img.src = du?.avatar_url || "/img/question_mark.png";
    img.alt = "";

    const username = document.createElement("div");
    username.className = "testimonial__username";
    username.textContent = du?.name || "Anonymous";

    let dateTestimonial = new Date(dr.created_at);
    const months = {
      1: "января",
      2: "февраля",
      3: "марта",
      4: "апреля",
      5: "мая",
      6: "июня",
      7: "июля",
      8: "августа",
      9: "сентября",
      10: "октября",
      11: "ноября",
      12: "декабря",
    };
    const date = document.createElement("div");
    date.className = "testimonial__date";
    date.textContent = dateTestimonial
      ? `${dateTestimonial.getDate()} ${months[dateTestimonial.getMonth() + 1]} ${dateTestimonial.getFullYear()}`
      : "21 ноября 2025";

    const score = document.createElement("div");
    score.className = "testimonial__score";

    const stars = document.createElement("div");
    stars.className = "stars";
    const cover = document.createElement("div");
    cover.className = "cover";

    let ratingCalculation = 100 - (dr.rating / 5) * 100 + "%";
    cover.style.width = dr.rating ? ratingCalculation : "100%";
    // Создаем SVG элемент
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "svgPic-star");
    svg.setAttribute("viewBox", "0 0 881 130");
    svg.setAttribute("xml:space", "preserve");

    // Массив трансформаций для звезд
    const transforms = [
      "translate(-634.728 -382.568)",
      "translate(-447.914 -382.568)",
      "translate(-261.961 -382.568)",
      "translate(-76.024 -382.568)",
      "translate(109.853 -382.568)",
    ];

    // Создаем пути для звезд
    transforms.forEach((transform, index) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute(
        "d",
        "m702.68 382.568 16.041 49.37h51.911l-41.997 30.512 16.042 49.37-41.997-30.512-41.997 30.512 16.041-49.37-41.996-30.512h51.911z",
      );
      path.setAttribute("transform", transform);
      path.style.fill = "currentColor";
      svg.appendChild(path);
    });

    // Создаем блок цитаты
    const quote = document.createElement("div");

    if (!dr.content) {
      quote.className = "testimonial__quote testimonial__quote--empty";
      quote.textContent = "The author decided not to share his opinion";
    } else {
      quote.className = "testimonial__quote";
      quote.textContent = dr.content;
    }
    // Собираем структуру
    stars.appendChild(svg);
    stars.appendChild(cover);
    score.appendChild(stars);
    header.append(img, username, date, score);
    testimonial.append(header, quote);

    return testimonial;
  }

  // function dynamicLoad(reviewCollection, dataUsers) {
  //   const Main = document.querySelector(".main");
  //   const container = Main.querySelector(".phantom-container");
  //   let showMore = Main.querySelector(".main__showMore");

  //   const fragment = document.createDocumentFragment();
  //   // let countShow = 1;
  //   for (let dU of Object.values(dataUsers)) {
  //     // if (countShow >= 10) {
  //     //   countShow = 0;
  //     //   break;
  //     // }

  //     if (reviewCollection.has(dU.user_id)) {
  //       countShow++;

  //       // fragment.appendChild(createTestimonial(reviewCollection.get(dU.user_id), dU));
  //       virtualizeArray.push(createTestimonial(reviewCollection.get(dU.user_id), dU));

  //       reviewCollection.delete(dU.user_id);
  //     }
  //   }

  //   // container.appendChild(fragment);
  // }
}
