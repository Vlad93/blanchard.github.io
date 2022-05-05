document.addEventListener("DOMContentLoaded", function() {

// Dropdown
const params = {
  btnClassName: "menu-epochs__btn",
  dropClassName: "submenu",
  activeClassName: "active"
}

function setMenuListener() {
  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(`.${params.activeClassName}`);

    if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName) || current.classList.contains(params.dropClassName)) {
          current.classList.remove(params.activeClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(`[data-target="${path}"]`);

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
      } else {
        drop.classList.remove(params.activeClassName);
      }
    }
  });
}
setMenuListener();

// Simple bar
document.querySelectorAll('.submenu__list').forEach( function(el) {
  new SimpleBar(el, {
    autoHide: false
  });
});
// if (window.matchMedia('(max-width: 1200px)').matches) {
//   new SimpleBar ( document.querySelector('.header__nav-enter-wrap'), {
//     autoHide: false
//   });
// }

// Scroll
$('a[href*="#"]').on('click', function() {
  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 400);
  return false;
});


// Swiper hero
const swiperHero = new Swiper('.section-hero__slider', {
  // Optional parameters
    loop: true,
    speed: 3000,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    // autoplay
    autoplay: {
      delay: 7000,
    },
  });
//     Swiper hero End

// Hamb menu
  const hambBtn = document.querySelector('.header__hamb-btn');
  const hambBtnClose = document.querySelector('.header__hamb-btn-close');
  const mobileMenu = document.querySelector('.header__nav-enter-wrap');
  hambBtn.addEventListener('click', (evt) => {
    mobileMenu.classList.add('active');
  });
  hambBtnClose.addEventListener('click', (evt) => {
    mobileMenu.classList.remove('active');
  });

// Search
  const openSearch = document.querySelector('.header__search-open');
  const search = document.querySelector('.header__bottom');
  document.addEventListener('click', function(e) {
    if (e.target.closest('.header__search-open')) {
      openSearch.classList.add('hide');
      search.classList.add('active');
      setTimeout(() => document.querySelector('.search-form__input').focus(), 300);
    } else if (search.classList.contains('active') && !e.target.closest('.search-form') || e.target.closest('.search-form__close-btn')) {
      openSearch.classList.remove('hide');
      search.classList.remove('active');
    }
  });

// Select
  const filterSelect = document.querySelector('.form-filter__select');
  const choices = new Choices(filterSelect, {
    searchEnabled: false,
    position: 'bottom',
    itemSelectText: '',
    renderSelectedChoices: 'always'
  });

// Swiper gallery
  const swiperGallery = new Swiper('.gallery-swiper', {
    // Optional parameters
      slidesPerView: 1,
      speed: 500,
      navigation: {
        nextEl: '.gallery-swiper__btn-next',
        prevEl: '.gallery-swiper__btn-prev',
      },
      pagination: {
        el: ".gallery-swiper__fraction",
        type: "fraction"
      },

      breakpoints: {
        577: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 34,
          grid: {
            rows: 2,
            fill: "row"
          },
        },
        1200: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50,
          grid: {
            rows: 2,
            fill: "row"
          },
        }
      },

      a11y: false,
      keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

      // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
      watchSlidesProgress: true,
      slideVisibleClass: 'slide-visible',

      on: {
        init: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible')) {
              slide.tabIndex = '-1';
            } else {
              slide.tabIndex = '';
            }
          });
        },
        slideChange: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible')) {
              slide.tabIndex = '-1';
            } else {
              slide.tabIndex = '';
            }
          });
        }
      }
    });
    swiperGallery.on('breakpoint', function () {
      this.update();
    });
//     Swiper hero End

// Gallery modal JQuery
  $('.gallery-swiper__slide').each( function () {
    $(this).click( (el) => {
      const imgSrc = $(this).find('.gallery-slide__img').attr('src');
      const name = $(this).find('.gallery-slide__name').text();
      const title = $(this).find('.gallery-slide__title').text();
      const date = $(this).find('.gallery-slide__date').text();
      const desc = $(this).find('.gallery-slide__desc').text();
      $('.modal-gallery__img img').attr('src', imgSrc);
      $('.modal-gallery__name').html(name);
      $('.modal-gallery__title').html(title);
      $('.modal-gallery__date').html(date);
      $('.modal-gallery__desc').html(desc);
      $('.modal-gallery').addClass('show');
    });
  })
  $('.modal-gallery__close').on('click', () => {
    $('.modal-gallery').removeClass('show');
  });
  $('.modal-gallery__overlay').on('click', () => {
    $('.modal-gallery').removeClass('show');
  });

  // Catalog

  // ===== countries-tabs
  document.querySelectorAll('.countries-btns__button').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function (event) {
      document.querySelectorAll('.countries-btns__button').forEach(function(tabsBtn) {
        tabsBtn.classList.remove('active');
      });
      tabsBtn.classList.add('active');
      const path = event.currentTarget.dataset.path;
      document.querySelectorAll('.countries__item').forEach(function(tabsContent) {
        tabsContent.classList.remove('active');
      });
      document.querySelector(`[data-target = "${path}"]`).classList.add('active');
      document.querySelector('.countries__item.active .artist').classList.add('active');
    });
  });

  // ==== artists-tabs
  document.querySelectorAll('.artists-list__btn').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function (event) {
      document.querySelectorAll('.artists-list__btn').forEach(function(tabsBtn) {
        tabsBtn.classList.remove('active');
      });
      tabsBtn.classList.add('active');
      const path = event.currentTarget.dataset.path;
      document.querySelectorAll('.artist').forEach(function(tabsContent) {
        tabsContent.classList.remove('active');
      });
      document.querySelector(`[data-target = "${path}"]`).classList.add('active');
      if (document.documentElement.clientWidth < 992) {
        document.querySelector('.artist.active').scrollIntoView({behavior: "smooth"});
      }
    });
  });

  //  ====  Accordion
  $( function() {
    $( ".accordion" ).accordion({
      collapsible: true,
      heightStyle: "content",
      active: 0,
      icons: false,
      animate: 300
    });
  });

  // Events
  (() => {
    const MOBILE_WIDTH = 750;
    const DESKTOP_WIDTH = 976;
    const btn = document.querySelector(".section-events__btn");

    const sliderMobileParams = {
      paginationClassName: "events-pagination",
      cardsContainerName: "section-events__swiper",
      cardsWrapName: "section-events__wrap",
      card: "event-card",
      hiddenClass: "is-hidden"
    };

    function getWindowWidth() {
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
      );
    }

    function activateMobileSlider(params) {
      const pagination = document.createElement("div");
      pagination.classList.add(params.paginationClassName);
      params.cardsContainer.append(pagination);

      params.cardsContainer.classList.add("swiper-container");
      params.cardsWrap.classList.add("swiper-wrapper");

      params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: `.${params.cardsContainerName} .${params.paginationClassName}`,
          clickable: true
        },

        on: {
          beforeInit() {
            document.querySelectorAll(`.${params.card}`).forEach((el) => {
              el.classList.add("swiper-slide");
            });
          },

          beforeDestroy() {
            this.slides.forEach((el) => {
              el.classList.remove("swiper-slide");
              el.removeAttribute("role");
              el.removeAttribute("aria-label");
            });

            this.pagination.el.remove();
          }
        }
      });
    }

    function destroyMobileSlider(params) {
      params.cardsSlider.destroy();
      params.cardsContainer.classList.remove("swiper-container");
      params.cardsWrap.classList.remove("swiper-wrapper");
      params.cardsWrap.removeAttribute("aria-live");
      params.cardsWrap.removeAttribute("id");
    }

    function setHiddenCards(params, windowWidth) {
      const cards = document.querySelectorAll(`.${params.card}`);
      let quantity = cards.length;

      if (windowWidth > MOBILE_WIDTH && windowWidth < DESKTOP_WIDTH) {
        quantity = 2;
      }

      if (windowWidth >= DESKTOP_WIDTH) {
        quantity = 3;
      }

      cards.forEach((card, i) => {
        card.classList.remove(params.hiddenClass);
        if (i >= quantity) {
          card.classList.add(params.hiddenClass);
        }
      });
    }

    function showCards(e) {
      const cards = document.querySelectorAll(`.${sliderMobileParams.card}`);

      e.target.style = "display: none";

      cards.forEach((card) => {
        card.classList.remove(sliderMobileParams.hiddenClass);
      });
    }

    function checkWindowWidthMobile(params) {
      const currentWidth = getWindowWidth();
      btn.style = "";
      params.cardsContainer = document.querySelector(
        `.${params.cardsContainerName}`
      );
      params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

      if (
        currentWidth <= MOBILE_WIDTH &&
        (!params.cardsSlider || params.cardsSlider.destroyed)
      ) {
        activateMobileSlider(params);
      } else if (currentWidth > MOBILE_WIDTH && params.cardsSlider) {
        destroyMobileSlider(params);
      }

      setHiddenCards(params, currentWidth);
    }

    checkWindowWidthMobile(sliderMobileParams);
    btn.addEventListener("click", showCards);

    window.addEventListener("resize", function () {
      checkWindowWidthMobile(sliderMobileParams);
    });
  })();

  // Editions swiper

  (() => {
    const MOBILE_WIDTH = 750;

    const sliderParamsNotMobile = {
      sliderWrap: "section-editions__content",
      cardsContainerName: "editions-swiper",
      cardsWrapName: "editions-swiper__wrap",
      card: "editions-slide",
      paginationClassName: "editions-swiper__fraction",
      navClassName: "editions-swiper__nav",
      navBtnClassName: "editions-swiper__btn",
      navPrev: "editions-swiper__btn-prev",
      navNext: "editions-swiper__btn-next"
    };

    function getWindowWidth() {
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
      );
    }

    function activateSlider(params) {
      const navigation = document.createElement("div");
      const pagination = document.createElement("div");
      const navBtnPrev = document.createElement("button");
      const navBtnNext = document.createElement("button");

      navigation.classList.add(params.navClassName);

      navBtnPrev.classList.add(params.navBtnClassName);
      navBtnPrev.classList.add(params.navPrev);
      navigation.prepend(navBtnPrev);

      pagination.classList.add(params.paginationClassName);
      navigation.append(pagination);

      navBtnNext.classList.add(params.navBtnClassName);
      navBtnNext.classList.add(params.navNext);
      navigation.append(navBtnNext);

      params.sliderWrapElem.prepend(navigation);

      params.cardsContainer.classList.add("swiper-container");
      params.cardsWrap.classList.add("swiper-wrapper");

      params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
         breakpoints: {
           751: {
             slidesPerView: 2,
             spaceBetween: 34,
             slidesPerGroup: 2
           },
           1024: {
              slidesPerView: 2,
              spaceBetween: 50,
              slidesPerGroup: 2
            },
           1400: {
             slidesPerView: 3,
             spaceBetween: 50,
             slidesPerGroup: 3
           },
         },

        pagination: {
          el: `.${params.sliderWrap} .${params.paginationClassName}`,
          type: "fraction"
        },

        navigation: {
          nextEl: `.${params.navNext}`,
          prevEl: `.${params.navPrev}`
        },

        a11y: false,
        keyboard: true,

        watchSlidesProgress: true,
        slideVisibleClass: 'slide-visible',

        on: {
          beforeInit() {
            document.querySelectorAll(`.${params.card}`).forEach((el) => {
              el.classList.add("swiper-slide");
            });
          },

          init: function () {
            this.slides.forEach(slide => {
              if (!slide.classList.contains('slide-visible')) {
                slide.querySelector('.editions-slide__link').tabIndex = '-1';
              } else {
                slide.querySelector('.editions-slide__link').tabIndex = '';
              }
            });
          },
          slideChange: function () {
            this.slides.forEach(slide => {
              if (!slide.classList.contains('slide-visible')) {
                slide.querySelector('.editions-slide__link').tabIndex = '-1';
              } else {
                slide.querySelector('.editions-slide__link').tabIndex = '';
              }
            });
          },

          beforeDestroy() {
            this.slides.forEach((el) => {
              el.classList.remove("swiper-slide");
              el.removeAttribute("role");
              el.removeAttribute("aria-label");
            });

            this.pagination.el.remove();
            navigation.remove();
          }
        }
      });
    }

    function destroySlider(params) {
      params.cardsSlider.destroy();
      params.cardsContainer.classList.remove("swiper-container");
      // params.cardsWrap.classList.remove("swiper-wrapper");
      params.cardsWrap.removeAttribute("aria-live");
      params.cardsWrap.removeAttribute("id");
    }

    function checkWindowWidth(params) {
      const currentWidth = getWindowWidth();
      params.sliderWrapElem = document.querySelector(`.${params.sliderWrap}`);
      params.cardsContainer = document.querySelector(
        `.${params.cardsContainerName}`
      );
      params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

      if (
        currentWidth > MOBILE_WIDTH &&
        (!params.cardsSlider || params.cardsSlider.destroyed)
      ) {
        activateSlider(params);
      } else if (currentWidth <= MOBILE_WIDTH && params.cardsSlider) {
        destroySlider(params);
      }
    }

    checkWindowWidth(sliderParamsNotMobile);

    window.addEventListener("resize", function () {
      checkWindowWidth(sliderParamsNotMobile);
    });
  })();
  (() => {
    const checkBtn = document.querySelector('.editions-form__legend_theme_cat');

    checkBtn.addEventListener('click', function () {
        this.classList.toggle('active');
    });
  })();

  // Tooltips
  tippy('.js-tooltip', {
    theme: "purple",
    trigger: 'click',
  });

  // Swiper projects
  const swiperProjects = new Swiper('.projects-swiper', {
    // Optional parameters
      slidesPerView: 1,
      speed: 500,
      navigation: {
        nextEl: '.projects-swiper__btn-next',
        prevEl: '.projects-swiper__btn-prev',
      },

      breakpoints: {
        577: {
          slidesPerView: 2,
          spaceBetween: 34
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 50
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 50
        }
      },

      a11y: false,
      keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

      // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
      watchSlidesProgress: true,
      slideVisibleClass: 'slide-visible',

      on: {
        init: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible')) {
              slide.tabIndex = '-1';
            } else {
              slide.tabIndex = '';
            }
          });
        },
        slideChange: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible')) {
              slide.tabIndex = '-1';
            } else {
              slide.tabIndex = '';
            }
          });
        }
      }
    });
    swiperProjects.on('breakpoint', function () {
      this.update();
    });
//     Swiper projects End

  // Map
  ymaps.ready(init);
  function init(){
      // Создание карты.
      var myMap = new ymaps.Map("map", {
          center: [55.76038883700101,37.59452245233143],
          zoom: 13,
          controls: ['geolocationControl', 'zoomControl']},
          {
            suppressMapOpenBlock: true,
            geolocationControlSize: "large",
            geolocationControlPosition:  { top: "200px", right: "20px" },
            geolocationControlFloat: 'none',
            zoomControlSize: "small",
            zoomControlFloat: "none",
            zoomControlPosition: { top: "120px", right: "20px" }
          });
      var myPlacemark = new ymaps.Placemark([55.76038883700101,37.59452245233143], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/icons/location.svg',
        iconImageSize: [20, 20]
      });
      myMap.geoObjects.add(myPlacemark);
  };

  // Form validation
  new JustValidate('.contacts-form', {
    colorWrong: '#d11616',
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 30,
        strength: {
          custom: '[A-Za-zА-Яа-яёЁ]'
        }
      },
      phone: {
        required: true,
        minLength: 7,
        maxLength: 20,
        strength: {
          custom: '^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$'
        }
      }
    },
    messages: {
      name: {
        required: 'Поле является обязательным',
        minLength:'Имя слишком короткое',
        maxLength: 'Имя слишком длинное',
        strength:'Недопустимый формат'
      },
      phone: {
        required: 'Поле является обязательным',
        minLength:'Номер слишком короткий',
        maxLength: 'Номер слишком длинный',
        strength:'Недопустимый формат'
      }
    }
  });

});


