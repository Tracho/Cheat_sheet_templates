function Sliders_op() {
  let container_card_op = document.querySelectorAll('.container_sliders_op');
  container_card_op.forEach((container) => {
    let left = container.querySelector('.btn_navi_left_op');
    let right = container.querySelector('.btn_navi_right_op');
    let slide_op = container.querySelectorAll('.slide_op');
    let create_navi = container.querySelector('.create_navi_pagi_op');
    let counter = 0;
    let timer = Number(container.dataset.timer);
    let interval; // Переменная для хранения идентификатора интервала

    let SLIDENONE = () =>{
      slide_op.forEach((slide) => { 
        slide.removeAttribute("active");
      }); 
    };

    slide_op.forEach((slide, index)=>{
      let active = counter === index ? "active" : '';
      create_navi.insertAdjacentHTML('beforeend', `<button class="btn_navi_op" ${active} data-number="${index}"></button>`);
    });

    let btn_navi_op = container.querySelectorAll('.btn_navi_op');
    let NAVINONE = () =>{
      btn_navi_op.forEach((btn_navi) => {
        btn_navi.removeAttribute("active");
      });
    };

    let REFRESHSLID = () =>{
      SLIDENONE(); 
      slide_op[counter].setAttribute("active", '');
      NAVINONE();
      btn_navi_op[counter].setAttribute("active", '');
    };

    btn_navi_op.forEach((btn_navi) => {
      btn_navi.addEventListener('click', () => {
        clearInterval(interval); // Останавливаем интервал при нажатии на навигационную кнопку
        counter = Number(btn_navi.dataset.number);
        REFRESHSLID();
      });
    });

    function StartInterval() {
      clearInterval(interval); // Очищаем предыдущий интервал, если он существует
      interval = setInterval(() => {
        REFRESHSLID();
        counter = counter < slide_op.length - 1 ? counter + 1 : 0; 
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
      counter = counter > 0? counter - 1 : slide_op.length - 1;
      REFRESHSLID();
    });

    right.addEventListener('click', () => {
      clearInterval(interval); // Останавливаем интервал при нажатии на кнопку "Вперед"
      counter = counter < slide_op.length - 1 ? counter + 1 : 0;
      REFRESHSLID();
    });
  

  });
}


export default Sliders_op;