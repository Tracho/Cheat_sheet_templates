function render_section() {
  // return (  );
  let _sections = document.querySelectorAll('._render_section'); 
  _sections.forEach((section) => {
    let children = section.firstChild !== null ? section.firstChild.outerHTML : null;
    let children_html = '';
    if (children !== null) {
      children_html = `
        <div class="py-3 my-3 border_deshed border-1"> 
          ${children}
        </div>
      `
      section.removeChild(section.firstChild)
    } 
 

    const dts = section.dataset;
    let d_titles = dts.details_title.includes("#") == false ? `<p class="my-1">${dts.details_title}</p>` : arr_d_titles(dts.details_title);
    function arr_d_titles(dt_titles) {
      let arr_title = '';
      dt_titles.split("#").filter(part => part.trim() !== '').forEach((dt) => {
        if (dt.length !== 0) arr_title += `<p class="my-1">${dt}</p>`;
      });
      return arr_title;
    }
    section.insertAdjacentHTML("beforeend", `
    <div class="mb-5 py-3 bg_info border border-dark border-1 border-start-0 border-end-0">
      <div class="container-lg">
        <div class="row px-3">
          <div class="d-flex justify-content-between align-items-center mb-3 p-0">
            <h2 class="fs21 d-flex m-0">${dts.header}</h2>
            <button class="btn btn-success d-inline-flex align-items-center _btn_view_code" data-objec_key="${dts.objec_key}" data-view_code_key="${dts.view_code_key}" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
              <span class="me-2">View code</span>
              <ion-icon class="wh21px" name="code-working"></ion-icon>
            </button>
          </div>
          <div class="py-3 border_deshed border-1">
            <details>
              <summary class="fs18"><span class="d-inline-flex align-items-center">Details</span></summary> 
              ${d_titles} 
            </details>
          </div>
          ${children_html}   
        </div>
      </div>
    </div>
  `);
  });
}

export default render_section;