export function showMore() {
  const Testimonial_container = document.querySelector(".testimonial-container");
  const Button = document.querySelector(".main__showMore");
  Testimonial_container.addEventListener("scroll", function () {
    if (
      Testimonial_container.scrollHeight - Testimonial_container.scrollTop - Testimonial_container.clientHeight <
      10
    ) {
      Button.style.visibility = "visible";
    } else Button.style.visibility = "hidden";
  });
}
