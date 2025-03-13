function listener_and_dorper() {
  let _btn_listener = document.querySelectorAll("._btn_listener");
  _btn_listener.forEach((btn) => {
    btn.addEventListener("click", () => {
      let btn_dst = btn.dataset.where_droper;
      if (btn.hasAttribute("active") == true) {
        btn.removeAttribute('active')
      } else {
        btn.setAttribute('active', '');
      }
      if (btn_dst !== null || btn_dst !== undefined || btn_dst !== "none") {
        let _this_droper = document.querySelectorAll("._this_droper");
        if (_this_droper) {
          _this_droper.forEach((menu) => {
            let menu_dst = menu.dataset.where_listener;
            if (menu_dst == btn_dst) {
              if (menu.hasAttribute("active") == true) {
                menu.removeAttribute('active')
              } else {
                menu.setAttribute('active', '');
              }
            }
          });
        }
      }
    });
  });
}

export default listener_and_dorper;