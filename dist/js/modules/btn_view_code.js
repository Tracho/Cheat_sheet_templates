import bnt_copy from './bnt_copy.js';
let data = null;
async function loadJson() {
  let url = document.location.origin + '/json/json.json';
  let port = parseInt(document.location.port);
  let hostName = document.location.hostname;
  if (port === "" || hostName !== "localhost") {
    let pathName = document.location.pathname.split('dist/')[0] + 'dist/json/json.json';
    url = document.location.origin + pathName;
  }
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
} loadJson();
(async () => {
  await loadJson();
  console.group("Глобальная переменная data:")
  console.log(data);
  console.groupEnd()
})();


function listener_view_code(btn) {
  btn.addEventListener("click", function () {
    let directory = btn.dataset.directory.split(',').length <= 1 ? btn.dataset.directory : btn.dataset.directory.split(',');
    let d_key = btn.dataset.d_key.split(',').length <= 1 ? btn.dataset.d_key : btn.dataset.d_key.split(',');

    (async () => {
      await loadJson();
      if (Array.isArray(directory) && Array.isArray(d_key)) {
        const _create_form = document.querySelectorAll("._create_form");
        _create_form.forEach((this_form) => {this_form.innerHTML = "";});
        directory.map((objec_k, index)=>{
          let this_directory = objec_k.trim(); 
          let this_d_key = d_key[index].trim();
          let keys = Object.keys(data[this_directory][this_d_key]);
          let this_key = data[this_directory][this_d_key];

          Render_form(keys, this_key, this_directory, this_d_key);
          console.log(keys)
          console.log(this_key)
        
        });
      } else {
        let keys = Object.keys(data[directory][d_key]);
        let this_key = data[directory][d_key];

        const _create_form = document.querySelectorAll("._create_form");
        _create_form.forEach((this_form) => {this_form.innerHTML = "";});
        Render_form(keys, this_key,directory, d_key);
     
        console.group("Глобальная переменная data:")
        console.log(data);
        console.groupEnd() 

      }
      bnt_copy();
    })();
  });
}

function Render_form(keys, this_key,directory , d_key){
  const _create_form = document.querySelectorAll("._create_form");
  _create_form.forEach((this_form) => {
    // this_form.innerHTML = "";
    this_form.insertAdjacentHTML("beforeend", `
      <div class="mb-2">
      <h5 class="mb-0">${directory} > ${d_key}</h5>
      </div>
      `);
    keys.map((key, index) => {
      let sting_code = new String(this_key[key]);
      this_form.insertAdjacentHTML("beforeend", `
      <div class="mb-3">
        <label for="text_code_info_${d_key}_${d_key}_${key}_${index}" class="form-label">${key} cod: </label>
        <div class="input-group">
          <input type="text" id="text_code_info_${d_key}_${d_key}_${key}_${index}" class="form-control _input_view_code" data-input_view_code="${key}" placeholder="${key}...">
          <button class="btn btn-outline-secondary d-flex align-items-center _bnt_copy" type="button" data-bnt_copy="${key}">Copy <ion-icon class="ms-2" name="copy"></ion-icon></button>
        </div>
      </div>  
    `);

      let this_input = document.querySelector(`#text_code_info_${d_key}_${d_key}_${key}_${index}`);
      this_input.value = sting_code;
    });
  });
}

function btn_view_code() {
  let _mini_btn_view_code = document.querySelectorAll('._render_section ._mini_btn_view_code');
  if (_mini_btn_view_code.length > 0) {
    _mini_btn_view_code.forEach((btn) => {
      listener_view_code(btn)
    });  // Запускаем событие для мини-кнопок, если они есть в шаблоне.
  }

  let btn_view_code = document.querySelectorAll("._btn_view_code");
  btn_view_code.forEach((btn) => {
    listener_view_code(btn)
  });
}

export default btn_view_code;