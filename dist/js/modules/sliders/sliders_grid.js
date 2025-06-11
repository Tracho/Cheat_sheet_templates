// Эту функцию не добавлять в JSON
import log_group from "../../log_group.js";

function Sliders_grid() {
  let container_card_grid = document.querySelectorAll('.container_sliders_grid');

  let cleanup = null;
  function handleResize() {
    if (cleanup) cleanup(); // Всегда очищаем предыдущую инициализацию
    cleanup = ThisSliderFunctions(); // И всегда запускаем новую
  }

  window.addEventListener('resize', handleResize);
  handleResize();
  function ThisSliderFunctions() {
    container_card_grid.forEach((container) => {
      let left = container.querySelector('.btn_navi_left_grid');
      let right = container.querySelector('.btn_navi_right_grid');
      let slide_grid = container.querySelectorAll('.slide_grid');
      let create_navi = container.querySelector('.create_navi_pagi_grid');
      let counter = 0;
      let timer = Number(container.dataset.timer);
      let interval = null;
      let isSliderVisible = false;

      let pagi = container.hasAttribute('data-pagi') ? container.dataset.pagi : true; // Получаем значение data-pagi, по умолчанию true
      let mobpagi = container.hasAttribute('data-mobpagi') ? container.dataset.mobpagi : true; // Получаем значение data-mobpagi, по умолчанию true
      pagi = mobpagi !== true && window.innerWidth < 768 ? false : pagi; // Если mobpagi не true, то pagi тоже не true

      let grid = Number(container.dataset.grid) || Number(1); // Получаем значение grid из data-атрибута, по умолчанию 1
      let step = Number(container.dataset.step) || Number(1); // Получаем значение step из data-атрибута, по умолчанию 1
      let oldgrid = container.hasAttribute('data-oldgrid') === false ? grid : Number(container.dataset.oldgrid);
      container.setAttribute('data-oldgrid', oldgrid); // Сохраняем старое значение grid в атрибут oldgrid

      if (window.innerWidth < 768) {
        grid = window.innerWidth < 768 ? 1 : grid; // Если мобильный, то grid всегда 1
        container.dataset.grid = grid; // Устанавливаем grid в 1 для мобильной версии
        step = window.innerWidth < 768 ? 1 : step; // Если мобильный, то шаг всегда 1
      } else {
        container.dataset.grid = container.hasAttribute('data-oldgrid') === false ? grid : Number(container.dataset.oldgrid); // Устанавливаем grid в значение из data-атрибута
      }


      create_navi.innerHTML = ''; // Очищаем предыдущие кнопки навигации
      function CreatePagination() {
        // Создаем навигационные кнопки
        let all_slides_count = Math.round(Number(slide_grid.length) / step);
        for (let i = 0; i < all_slides_count; i++) {
          let index = i * step; // Индекс слайда для навигации
          let active = counter === index ? "active" : '';
          create_navi.insertAdjacentHTML('beforeend', `<button class="btn_navi_grid" ${active} data-number="${index}"></button>`);
        };
      }
      if (pagi == true || (window.innerWidth < 768 && mobpagi == true)) {
        CreatePagination();
      }

      let btn_navi_grid = container.querySelectorAll('.btn_navi_grid');
      let flag_pagi_active = false; // флаг для активации класс active у кнопок навигации при старте слайдера
      let ADDACTIVE = () => {
        slide_grid.forEach((thisSlide, index) => {
          if (btn_navi_grid[index] && flag_pagi_active === true) {
            btn_navi_grid[index].removeAttribute("active");
          }

          thisSlide.removeAttribute("active");
          thisSlide.removeAttribute("active_after");
          thisSlide.removeAttribute("active_before");
          thisSlide.removeAttribute('style');

          if (index <= counter - 1 && (index !== counter)) {
            thisSlide.setAttribute("active_after", '');
          } else if (index >= counter + grid && (index !== counter)) {
            thisSlide.setAttribute("active_before", '');
          }

          // if (counter + grid >= slide_grid.length && index < counter) {
          //   thisSlide.setAttribute("active_before", '');
          //   thisSlide.removeAttribute("active_after");
          // }
        });


        // Показываем grid слайдов начиная с counter, с кольцевым переходом
        for (let i = 0; i < grid; i++) {
          const slideIndex = (counter + i) % slide_grid.length;
          const thisSlide = slide_grid[slideIndex];
          thisSlide.removeAttribute("active_after");
          thisSlide.removeAttribute("active_before");
          thisSlide.setAttribute("active", '');
          thisSlide.style = `z-index: 3; transform: translateX(${i * 100}%);`;
        }
        flag_pagi_active = true; // флаг для активации класс active у кнопок навигации при старте слайдера
      }; ADDACTIVE();

      let REFRESHSLID = () => {
        ADDACTIVE();
        console.log(counter);
        console.log(counter + grid);
        console.log(slide_grid.length);
        if (pagi == true || (window.innerWidth < 768 && mobpagi == true)) {
          let pagi_scounter = (Math.round(counter / step) >= btn_navi_grid.length) ? 0 : Math.round(counter / step);
          btn_navi_grid[pagi_scounter].setAttribute("active", '');
        }
      };

      if (pagi == true || (window.innerWidth < 768 && mobpagi == true)) {
        btn_navi_grid.forEach((btn_navi) => {
          btn_navi.addEventListener('click', () => {
            clearInterval(interval); // Останавливаем интервал при нажатии на навигационную кнопку
            counter = Number(btn_navi.dataset.number);
            REFRESHSLID();
          });
        });
      }


      // Intersection Observer для запуска/остановки слайдера
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isSliderVisible = true;
            StartInterval();
          } else {
            isSliderVisible = false;
            clearInterval(interval);
          }
        });
      }, { threshold: 0.2 }); // 20% слайдера должно быть видно
      observer.observe(container);



      container.addEventListener('mouseenter', () => {
        clearInterval(interval); // Останавливаем интервал при наведении курсора
      });

      container.addEventListener('mouseleave', () => {
        StartInterval(); // Возобновляем интервал при уходе курсора
      });

      function counter_left() {
        counter = counter > 0 ? Math.round(counter - step) : slide_grid.length - 1;
        counter = counter < 0 ? 0 : counter; // Проверка на выход за пределы массива
      }
      function counter_right() {
        counter = counter < slide_grid.length - 1 ? Math.round(counter + step) : 0;
        counter = counter >= slide_grid.length ? 0 : counter; // Проверка на выход за пределы массива
      }

      left.addEventListener('click', () => {
        clearInterval(interval); // Останавливаем интервал при нажатии на кнопку "Назад"  
        counter_left();
        REFRESHSLID(counter);
      });

      right.addEventListener('click', () => {
        clearInterval(interval); // Останавливаем интервал при нажатии на кнопку "Вперед"
        counter_right();
        REFRESHSLID();
      });

      // Изменяем StartInterval чтобы не запускался если слайдер не виден
      function StartInterval() {
        if (!isSliderVisible) return;
        if (interval !== null) { clearInterval(interval); } // Очищаем предыдущий интервал, если он существует
        interval = setInterval(() => {
          // counter = counter < slide_grid.length - 1 ? counter + 1 : 0;
          counter_right(); // Переход к следующему слайду
          REFRESHSLID();
        }, timer);
      }
      StartInterval(); // Запускаем интервал при инициализации

      window.addEventListener('resize', () => {
        clearInterval(interval);
        setTimeout(() => {
          StartInterval();
        }, timer * 2);
      });

      let startX = 0;
      let endX = 0;
      container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      });
      container.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
      });

      container.addEventListener('touchend', () => {
        let diffX = endX - startX;
        if (Math.abs(diffX) > 50) { // порог свайпа
          clearInterval(interval);
          if (diffX < 0) {
            // свайп влево — следующий слайд
            counter = counter < slide_grid.length - 1 ? counter + 1 : 0;
            // counter_left();
          } else {
            // свайп вправо — предыдущий слайд
            counter = counter > 0 ? counter - 1 : slide_grid.length - 1;
            // counter_right();
          }
          REFRESHSLID();
        }
        startX = 0;
        endX = 0;
        setTimeout(() => {
          StartInterval();
        }, timer * 2);
      });
    });
  }
}


export default Sliders_grid;