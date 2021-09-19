import { areaData, searchById } from "./itemTable.js";

// initialState: {areaId: "", dropMatArr:[]}

export default function AreaAllDrops({ $target, initialState }) {
  const $areaAllDrops = document.createElement("div");
  $areaAllDrops.setAttribute("id", "areaAllDrops");
  $target.appendChild($areaAllDrops);

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
    $areaAllDrops.innerHTML = `
    <ul>
      ${areaIdList
        .map(
          (material) => `
          <li data-id="${material.id}">${material.name}(x${material.count})</li>`
        )
        .join("")}
    </ul>
    `;
  };

  this.render();
}
