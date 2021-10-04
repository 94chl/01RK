import { areaData } from "./itemTable.js";

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
    console.log(this.state);
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
        console.log("click");
        e.target.closest(".toggleTabContentBtn").classList.toggle("closed");
        console.log($customRoute.querySelector("#routeOrderList"));
        $customRoute.querySelector("#routeOrderList").classList.toggle("hide");
      });
  };

  this.render();
}
