// $(document).ready(function () {
//   $(".carousel__inner").slick({
//     speed: 1000,
//     // adaptiveHeight: true,
//     prevArrow:
//       '<button type="button" class="slick-prev"><img src="../icons/left.png"></button>',
//     nextArrow:
//       '<button type="button" class="slick-next"> <img src= "../icons/right.png"> </button>',
//     responsive: [
//       {
//         breakpoint: 992,
//         settings: {
//           arrows: false,
//           dots: true,
//         },
//       },
//     ],
//   });
// });

const slider = tns({
  container: ".carousel__inner",
  items: 1,
  slideBy: "page",
  autoplay: false,
  controls: false,
  navPosition: "bottom",
  responsive: {
    320: {
      nav: true,
    },
    768: {
      nav: false,
    },
  },
});

document.querySelector(".prev").addEventListener("click", function () {
  slider.goTo("prev");
});

document.querySelector(".next").addEventListener("click", function () {
  slider.goTo("next");
});
