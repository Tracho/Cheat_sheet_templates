function dropdown_click() {

  const _container_dropdown = document.querySelectorAll("._container_dropdown");
  if (_container_dropdown) {
    _container_dropdown.forEach((container) => {
      let dropdownToggle = container.querySelector("._dropdownToggle");
      let dropdownMenu = container.querySelectorAll("._dropdownMenu");

      dropdownToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        let menu = dropdownToggle.nextElementSibling;
        if (dropdownToggle.dataset.dropdown_name == menu.dataset.dropdown_name) {
          if (menu.hasAttribute("active") == true) {
            menu.removeAttribute('active');
          } else {
            menu.setAttribute('active', '');
          }
        }
      });

      let autoclosedtime = container.dataset.autoclosedtime !== undefined ? container.dataset.autoclosedtime : null;
      if (/^\d+$/.test(autoclosedtime)) {
        autoclosedtime = Number(autoclosedtime);
      } else {
        autoclosedtime = null;
      }

      if (autoclosedtime !== null) {
        let AutoCloseDropDown = null;
        container.addEventListener('mouseenter', () => {
          if (AutoCloseDropDown) clearTimeout(AutoCloseDropDown); // Останавливаем авто закрытие меню
        });

        container.addEventListener('mouseleave', () => {
          AutoCloseDropDown = setTimeout(() => {
            dropdownMenu.forEach((menu) => {
              if (menu.hasAttribute("active")) {
                menu.removeAttribute('active');
              }
            });
          }, autoclosedtime); // Запускаем таймер на закрытие
        });
      }

      // Закрытие дропдауна при клике вне его области
      document.addEventListener('click', function (event) {
        if (!container.contains(event.target)) {
          // Клик вне контейнера — закрываем его
          dropdownMenu.forEach((menu) => {
            if (menu.hasAttribute("active")) {
              menu.removeAttribute('active');
            }
          });
        }
      });

    });
  }
}

export default dropdown_click;