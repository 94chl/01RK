import AreaNeedDrops from "./AreaNeedDrops.js";
import { areaData } from "./itemTable.js";

// initialState: {pickedArea, dropMatId}

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
          <li data-id="${area}">
            <span class="areaName">${areaData[area].name}</span>
            <div class="customRouteOrder"></div>
            <button class="toggleDropsBtn">toggle</button>
            <button class="pickAreaBtn">pick</button>
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
              dropMatId: Object.keys(this.state.dropMatId).reduce(
                (acc, dropMat) => {
                  if (areaData[area].drop.includes(dropMat)) {
                    acc[dropMat] = this.state.dropMatId[dropMat];
                  }
                  return acc;
                },
                {}
              ),
            },
            getDrop,
          })
      )
      .join("");

    // 드랍템 토글
    $areaBox.querySelectorAll(".toggleDropsBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.target
          .closest("li")
          .querySelectorAll(".noNeededDrops")
          .forEach((hide) => {
            hide.classList.toggle("hide");
          });
      });
    });

    // 지역 루트 담기
    // setState 쓰지 않기. 렌더링을 다시할 필요가 없다
    $areaBox.querySelectorAll(".pickAreaBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const picked = e.target.closest("li");
        const customRoute = [...this.state.pickedArea];
        picked.querySelector(".customRouteOrder").classList.toggle("picked");
        if (customRoute.includes(picked.dataset.id)) {
          $areaBox
            .querySelectorAll(".customRouteOrder")
            .forEach((route) => (route.innerHTML = ""));

          customRoute.splice(customRoute.indexOf(picked.dataset.id), 1);
          customRoute.forEach(
            (area, index) =>
              ($areaBox.querySelector(
                `#areaList [data-id=${area}] .customRouteOrder`
              ).innerHTML = `<span class="order${index + 1}">${
                index + 1
              }</span>`)
          );
        } else {
          customRoute.push(picked.dataset.id);
          picked.querySelector(
            ".customRouteOrder"
          ).innerHTML = `<span class="order${customRoute.length}">${customRoute.length}</span>`;
        }
        console.log(customRoute);
        this.state.pickedArea = customRoute;
      });
    });
  };

  this.render();
}
