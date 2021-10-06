import { areaData, searchById } from "../utils/itemTable.js";

// initialState: {areaId: "", dropMatId:[]}

export default function AreaNeedDrops({ $target, initialState, getDrop }) {
  const $areaNeedDrops = document.createElement("div");
  $areaNeedDrops.setAttribute("class", "areaNeedDrops");
  $target.appendChild($areaNeedDrops);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $areaNeedDrops.innerHTML = `<ul>
      ${areaData[this.state.areaId].drop
        .map((dropId) => {
          const dropInfo = searchById(dropId);
          if (this.state.dropMatId[dropId])
            return `<li 
            data-id="${dropId}" 
            data-img="${dropInfo.img}"
            data-sort="${dropInfo.sort}"  
            data-pickup="${dropInfo.pickup}"
            data-limit="${dropInfo.limit}"
            class="neededDrops">
              <button class="getDropBtn">${dropInfo.name}</button>
              <span data-pickupCount="${this.state.dropMatId[dropId]}">(x${this.state.dropMatId[dropId]})</span>
            </li>`;
          else {
            return `<li 
            data-id="${dropId}" 
            data-img="${dropInfo.img}"
            data-sort="${dropInfo.sort}"  
            data-pickup="${dropInfo.pickup}"
            data-limit="${dropInfo.limit}"
            class="noNeededDrops hide">
              <button class="getDropBtn">${dropInfo.name}</button>
            </li>`;
          }
        })
        .join("")}
      </ul>`;

    $areaNeedDrops.querySelectorAll(".getDropBtn").forEach((e) => {
      e.addEventListener("click", (btn) => {
        const $li = btn.target.closest("li").dataset;
        const dropInfo = {
          id: $li.id,
          sort: $li.sort,
          name: btn.target.innerHTML,
          img: $li.img,
          count: parseInt($li.pickup),
          limit: parseInt($li.limit),
        };
        document.querySelector("#headerBagBtn").classList.toggle("gotDrops");
        getDrop(dropInfo);
        setTimeout(
          () =>
            document
              .querySelector("#headerBagBtn")
              .classList.toggle("gotDrops"),
          1000
        );
      });
    });
  };

  this.render();
}
