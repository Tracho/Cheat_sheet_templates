// Эту функцию не добавлять в JSON
import log_group from "../../log_group.js";

function Sliders_grid() {
  let container_card_grid = document.querySelectorAll('.container_sliders_grid');
  container_card_grid.forEach((container) => {
    let left = container.querySelector('.btn_navi_left_grid');
    let right = container.querySelector('.btn_navi_right_grid');
    let slide_grid = container.querySelectorAll('.slide_grid');
    let create_navi = container.querySelector('.create_navi_pagi_grid');
    let counter = 0;
    let timer = Number(container.dataset.timer);
    let interval = null;
    let isSliderVisible = false;
    let grid = Number(container.dataset.grid) || Number(1); // Получаем значение grid из data-атрибута, по умолчанию 1


    let SLIDENONE = () => {
      slide_grid.forEach((slide) => {
        slide.removeAttribute("active");
        slide.removeAttribute("active_after");
        slide.removeAttribute("active_before");
        slide.removeAttribute('style');
      });
    };

    //ADDACTIVE Функция для добавления атрибутов активного слайда, чтобы определить в какую сторону слайд должен двигаться
    let ADDACTIVE = () => {
      slide_grid.forEach((thisSlide, index) => { 
        // Показываем слайды с counter по counter + (grid - 1)
        if (index >= counter && index < counter + grid) {
          thisSlide.setAttribute("active", '');
          // Для первого видимого слайда translateX(0%), для следующего 100%, для следующего 200% и т.д.
          const offset = index - counter;
          thisSlide.style = `z-index: 1; transform: translateX(${offset * 100}%);`;
        }else if(index >= counter && index < counter + grid){
          
        } else {
          if (index <= counter - 1 && (index !== counter)) {
            thisSlide.setAttribute("active_after", '');
          } else if (index >= counter + 1 && (index !== counter)) {
            thisSlide.setAttribute("active_before", '');
          }
        }
      });

       
      if (counter === 0) {
        slide_grid[slide_grid.length - 1].setAttribute("active_after", '');
        slide_grid[slide_grid.length - 1].removeAttribute("active_before", '');
      } else if (counter === slide_grid.length - 1) {
        slide_grid[0].setAttribute("active_before", '');
        slide_grid[0].removeAttribute("active_after", '');
      }
    }; ADDACTIVE();

    slide_grid.forEach((slide, index) => {
      let active = counter === index ? "active" : '';
      create_navi.insertAdjacentHTML('beforeend', `<button class="btn_navi_grid" ${active} data-number="${index}"></button>`);
    });

    let btn_navi_grid = container.querySelectorAll('.btn_navi_grid');
    let NAVINONE = () => {
      btn_navi_grid.forEach((btn_navi) => {
        btn_navi.removeAttribute("active");
      });
    };

    let REFRESHSLID = () => {
      SLIDENONE();
      ADDACTIVE();
      NAVINONE();
      btn_navi_grid[counter].setAttribute("active", '');
    };

    btn_navi_grid.forEach((btn_navi) => {
      btn_navi.addEventListener('click', () => {
        clearInterval(interval); // Останавливаем интервал при нажатии на навигационную кнопку
        counter = Number(btn_navi.dataset.number);
        REFRESHSLID();
      });
    });

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

    // Изменяем StartInterval чтобы не запускался если слайдер не виден
    function StartInterval() {
      if (!isSliderVisible) return;
      if (interval !== null) { clearInterval(interval); } // Очищаем предыдущий интервал, если он существует
      interval = setInterval(() => {
        counter = counter < slide_grid.length - 1 ? counter + 1 : 0;
        REFRESHSLID();
      }, timer);
    }
    StartInterval(); // Запускаем интервал при инициализации

    container.addEventListener('mouseenter', () => {
      clearInterval(interval); // Останавливаем интервал при наведении курсора
    });

    container.addEventListener('mouseleave', () => {
      StartInterval(); // Возобновляем интервал при уходе курсора
    });

    left.addEventListener('click', () => {
      clearInterval(interval); // Останавливаем интервал при нажатии на кнопку "Назад"  
      counter = counter > 0 ? counter - 1 : slide_grid.length - 1;
      REFRESHSLID(counter);
    });

    right.addEventListener('click', () => {
      clearInterval(interval); // Останавливаем интервал при нажатии на кнопку "Вперед"
      counter = counter < slide_grid.length - 1 ? counter + 1 : 0;
      REFRESHSLID();
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
        } else {
          // свайп вправо — предыдущий слайд
          counter = counter > 0 ? counter - 1 : slide_grid.length - 1;
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


export default Sliders_grid;