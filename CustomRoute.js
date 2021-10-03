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
      <button class="toggleTabContentBtn">+</button>
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
      .addEventListener("click", () => {
        console.log("click");
        console.log($customRoute.querySelector("#routeOrderList"));
        $customRoute.querySelector("#routeOrderList").classList.toggle("hide");
      });
  };

  this.render();
}
