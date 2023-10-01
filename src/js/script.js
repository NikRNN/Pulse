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

// код для работы слайдера + адаптация
const slider = tns({
  container: ".carousel__inner",
  items: 1,
  slideBy: "page",
  autoplay: false,
  controls: false,
  navPosition: "bottom",
  nav: true,
  responsive: {
    768: {
      nav: false,
    },
  },
});

// код для переключения стрелок на слайдере
document.querySelector(".prev").addEventListener("click", function () {
  slider.goTo("prev");
});

document.querySelector(".next").addEventListener("click", function () {
  slider.goTo("next");
});

// код для переключения между табами(фитнес, бег, триатлон)

$(document).ready(function () {
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  //перелистывание окон внутри табов (окно с ценами меняется на описание при нажатии на подробнее)
  $(".catalog-item__link").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catalog-item__content")
        .eq(i)
        .toggleClass("catalog-item__content_active");
      $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
    });
  });

  //перелистывание окон обратно при нажатии на кнопку назад
  $(".catalog-item__back").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catalog-item__content")
        .eq(i)
        .toggleClass("catalog-item__content_active");
      $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
    });
  });

  // // вариант функции для двух верхних блоков кода
  // function toggleslide(item) {
  //   $(item).each(function (i) {
  //     $(this).on("click", function (e) {
  //       e.preventDefault();
  //       $(".catalog-item__content")
  //         .eq(i)
  //         .toggleClass("catalog-item__content_active");
  //       $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
  //     });
  //   });
  // }

  // toggleslide(".catalog-item__link");
  // toggleslide(".catalog-item__back");

  //Скрипт на модальные окна (появление, закрытие)
  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });

  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });

  //работа с валидацией форм с помощью плагина от jQuery validate

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: "Пожалуйста, введите своё имя",
        phone: "Пожалуйста, введите свой телефон",
        email: {
          required: "Пожалуйста, введите свой почтовый адрес",
          email: "Неправильно введен почтовый адрес",
        },
      },
    });
  }

  validateForms("#consultation-form");
  validateForms("#order form");
  validateForms("#consultation form");

  //маска для ввода номера
  $("input[name=phone]").mask("+7 (999) 999-99-99 ");

  //отправка писем с сайта на сервер
  $("form").submit(function (e) {
    e.preventDefault();
    // if (!$(this).valid()) {
    //   return;
    // }
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn();
      $("form").trigger("reset");
    });
    return false;
  });
});
