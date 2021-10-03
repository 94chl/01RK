import AreaNeedDrops from "./AreaNeedDrops.js";
import { areaData } from "./itemTable.js";

// initialState: {pickedArea, dropMatId}

export default function Area({ $target, initialState, getDrop, routeCustom }) {
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
    <div class="tabName">
      지역
      <button class="removeAllBtn">X</button>
    </div>
    <ul id="areaList">
      ${areaIdList
        .map((area) =>
          area === "A000"
            ? `
          <li data-id="${area}">
            <span class="areaName">${areaData[area].name}</span>
            <button class="toggleDropsBtn">toggle</button>
          </li>`
            : `<li data-id="${area}">
            <span class="areaName">${areaData[area].name}</span>
            <div class="customRouteOrder"></div>
            <div class="areaInfoBox">
              ${
                areaData[area].resurrection
                  ? "<div class='resurrection'>부활</div>"
                  : ""
              }
              ${
                areaData[area].hyperloop
                  ? "<div class='hyperloop'>텔포</div>"
                  : ""
              }
              <div class="areaBtnBox">
                <button class="pickAreaBtn">pick</button>
                <button class="toggleDropsBtn">toggle</button>
              </div>
            </div>
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
              ).innerHTML = `
              <span class="order${index + 1}">
                ${index + 1}
              </span>`)
          );
        } else {
          customRoute.push(picked.dataset.id);
          picked.querySelector(".customRouteOrder").innerHTML = `
          <span class="order${customRoute.length}">
           ${customRoute.length}
          </span>`;
        }
        console.log(customRoute);
        this.state.pickedArea = customRoute;
        routeCustom(this.state.pickedArea);
      });
    });

    $areaBox.querySelector(".removeAllBtn").addEventListener("click", () => {
      this.state.pickedArea = [];
      routeCustom(this.state.pickedArea);
      $areaBox.querySelectorAll(".picked").forEach((el) => {
        el.classList.remove("picked");
        el.innerHTML = "";
      });
    });
  };

  this.render();
}
