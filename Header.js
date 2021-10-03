export default function Header({ $target, initialState }) {
  const $header = document.createElement("div");
  $header.setAttribute("id", "headerBox");
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
      <div id="logo">logo</div>
      <div id="title">title</div>
      <div id="headerBtnBox">
        <button id="headerStatusBtn">status</button>
        <button id="headerItemBtn">item</button>
        <button id="headerBagBtn">bag</button>
        <button id="headerRouteBtn">route</button>
      </div>
    `;

    $header.querySelector("#headerBagBtn").addEventListener("click", (e) => {
      console.log("bag click");
      document.querySelector("#bagInventory").classList.toggle("active");
      document.querySelector("#bagAssembles").classList.toggle("active");
    });
  };

  this.render();
}
