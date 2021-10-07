import { areaData } from "../utils/itemTable.js";

// initialState: []

export default function CustomRoute({ $target, initialState }) {
  const $customRoute = document.createElement("div");
  $customRoute.setAttribute("id", "customRoute");
  $target.appendChild($customRoute);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $customRoute.innerHTML = `
    <div class="tabName">
      루트 순서
      <button class="toggleTabContentBtn">
        <i class="fas fa-angle-double-down"></i>
        <i class="fas fa-angle-double-up"></i>
      </button>
    </div>
    <ul id="routeOrderList">
      ${this.state
        .map(
          (area) => `
          <li data-id="${area}">${areaData[area].name}</li>`
        )
        .join("->")}
    </ul>
    `;

    $customRoute
      .querySelector(".toggleTabContentBtn")
      .addEventListener("click", (e) => {
        e.target.closest(".toggleTabContentBtn").classList.toggle("closed");
        $customRoute.querySelector("#routeOrderList").classList.toggle("hide");
      });
  };

  this.render();
}
