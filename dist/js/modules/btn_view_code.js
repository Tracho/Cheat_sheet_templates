// import json from '../json.json';
let data = null;
 async function loadJson() {
  let url = document.location.origin   + '/json/json.json';
  // console.log(url) 
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Ошибка сети: ' + response.statusText);
    }
     data = await response.json();
    
    return data;
    // Здесь можно работать с данными из JSON-файла
  } catch (error) {
    console.error('Ошибка при загрузке JSON:', error);
  }
}loadJson();
(async () => {
  await loadJson();
  console.log(data);
})();
 

function listener_view_code(btn){
  btn.addEventListener("click", function() { 
    let objec_key = btn.dataset.objec_key; 
    let view_code_key = btn.dataset.view_code_key;

    (async () => {  
      await loadJson(); 
      let keys = Object.keys(data[objec_key][view_code_key]);
      let this_key = data[objec_key][view_code_key];
      console.log('Глобальная переменная data:', data);
      // console.log(keys)
      let input_view_code = document.querySelectorAll("._input_view_code");
      input_view_code.forEach((input, index) => {
        let d_inp = input.dataset.input_view_code;
        let full_data = this_key[d_inp]; 
        input.value = full_data;  
      });

    })(); 
  });
}
 
function btn_view_code() { 
  let _mini_btn_view_code = document.querySelectorAll('._render_section ._mini_btn_view_code');
  if(_mini_btn_view_code.length > 0){
    _mini_btn_view_code.forEach((btn) => {
      listener_view_code(btn)
    });  // Запускаем событие для мини-кнопок, если они есть в шаблоне.
  }console.log(_mini_btn_view_code)

  let btn_view_code = document.querySelectorAll("._btn_view_code");  
  btn_view_code.forEach((btn) => {
    listener_view_code(btn)
  });
} 

export default btn_view_code;