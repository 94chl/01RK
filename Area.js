import AreaNeedDrops from "./AreaNeedDrops.js";
import { areaData } from "./itemTable.js";

// initialState: dropMatId

export default function Area({ $target, initialState, getDrop }) {
  const $areaBox = document.createElement("div");
  $areaBox.setAttribute("id", "areaBox");
  $target.appendChild($areaBox);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };

  const areaId = Object.keys(areaData);
  const areaIdList = areaId.slice(2).concat(areaId[0]);

  this.render = () => {
    console.log(areaIdList);
    console.log(this.state);
    $areaBox.innerHTML = `
    <div>지역</div>
    <ul id="areaList">
      ${areaIdList
        .map(
          (area) => `
          <li data-id="${area}">${areaData[area].name}
            <button class="toggleDropsBtn">toggle</button>
          </li>`
        )
        .join("")}
    </ul>
    `;

    areaIdList
      .map(
        (area) =>
          new AreaNeedDrops({
            $target: $areaBox.querySelector(`#areaList li[data-id="${area}"]`),
            initialState: {
              areaId: area,
              dropMatId: Object.keys(this.state).reduce((acc, dropMat) => {
                if (areaData[area].drop.includes(dropMat)) {
                  acc[dropMat] = this.state[dropMat];
                }
                return acc;
              }, {}),
            },
            getDrop,
          })
      )
      .join("");

    $areaBox.querySelectorAll(".toggleDropsBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.target
          .closest("li")
          .querySelectorAll(".noNeed")
          .forEach((hide) => {
            hide.classList.toggle("hide");
          });
      });
    });
  };

  this.render();
}
