export function fillReviewPanel() {
  fetch('/data/product-reviews.json')
    .then((response) => response.json())
    .then((data) => {
      let [avgRating, amountOfStars, ...starArr] = starRating(data);

      fillReviewPanel__header(avgRating);
      fillReviewPanel__score(amountOfStars, starArr);
    });

  function starRating(data) {
    let sumRating = 0;
    let countAmount = 0;
    let star_1 = 0;
    let star_2 = 0;
    let star_3 = 0;
    let star_4 = 0;
    let star_5 = 0;

    for (let d of Object.values(data)) {
      countAmount++;
      sumRating += d.rating;

      switch (d.rating) {
        case 1:
          star_1++;
          break;
        case 2:
          star_2++;
          break;
        case 3:
          star_3++;
          break;
        case 4:
          star_4++;
          break;
        case 5:
          star_5++;
          break;
      }
    }

    let avg = Math.floor((sumRating / countAmount) * 10) / 10;

    console.log(avg, countAmount, star_1, star_2, star_3, star_4, star_5);
    return [avg, countAmount, star_1, star_2, star_3, star_4, star_5];
  }

  function fillReviewPanel__header(avg) {
    const ReviewPanel__header = document.querySelector('.review-panel__header');

    const Rating = ReviewPanel__header.querySelector('.js-overall-rating');

    Rating.innerHTML = avg;

    const cover = ReviewPanel__header.querySelector('.review-panel__cover');

    let percent = 100 - (avg / 5) * 100 + '%';
    cover.style.width = percent;
  }

  function fillReviewPanel__score(amountOfStars, starArr) {
    const ReviewPanel__score = document.querySelector('.review-panel__score');
    const starsPercentArr = ReviewPanel__score.querySelectorAll('.js-stars-percent');
    const ReviewPanel__Covers = ReviewPanel__score.querySelectorAll('.review-panel__cover');
    const ReviewPanel__rateLines = ReviewPanel__score.querySelectorAll('.review-panel__rate-line');

    let percent = [];

    starsPercentArr.forEach((item, index) => {
      percent.push(Math.floor((starArr[4 - index] / amountOfStars) * 100));
      item.innerHTML = percent[index] + '%';
    });

    ReviewPanel__Covers.forEach((item, index) => {
      if (percent[index] < 1) item.style.borderRadius = '25px';
      item.style.width = 100 - percent[index] + '%';
    });
  }
}
