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
    <div>루트 순서</div>
    <ul id="routeOrderList">
      ${this.state
        .map(
          (area) => `
          <li data-id="${area}">${areaData[area].name}</li>`
        )
        .join("")}
    </ul>
    `;
  };

  this.render();
}
