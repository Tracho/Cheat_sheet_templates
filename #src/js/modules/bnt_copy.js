function bnt_copy() { 
  let bnt_copy = document.querySelectorAll("._bnt_copy");
  let input_view_code = document.querySelectorAll("._input_view_code");
 
  bnt_copy.forEach((btn, index) => {
    btn.addEventListener("click", () => { 
      let input = input_view_code[index];
      input.select();
      document.execCommand("copy");

      // Создаем Tooltip
      let tooltip = new bootstrap.Tooltip(btn, {
        title: "Сopied!", // Текст всплывающей подсказки
        placement: "top", // Расположение
        trigger: "manual" // Управляем вручную
      });

      tooltip.show(); // Показываем Tooltip

      // Закрываем Tooltip через 0,5 секунды
      setTimeout(() => {
        tooltip.hide();
      }, 1000);
    });
  });
}


export default bnt_copy;