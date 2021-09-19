import { areaData, searchById } from "./itemTable.js";
import { disassembleGD } from "./disassemble.js";

export default function SelectPreview({
  $target,
  initialState,
  searchItemInfo,
}) {
  const $selectPreview = document.createElement("div");
  $selectPreview.setAttribute("id", "selectPreview");
  $target.appendChild($selectPreview);

  this.state = {
    ...initialState,
    cartInfo: {
      ...searchById(initialState.cart),
      ...disassembleGD([initialState.cart]),
    },
  };
  let itemInfoKeys = Object.keys(this.state.cartInfo);

  this.setState = (nextState) => {
    this.state = {
      ...nextState,
      cartInfo: {
        ...searchById(nextState.cart),
        ...disassembleGD([nextState.cart]),
      },
    };
    itemInfoKeys = Object.keys(this.state.cartInfo);
    this.render();
  };

  this.render = () => {
    console.log(this.state);
    console.log(itemInfoKeys);
    $selectPreview.innerHTML = `<ul>
      ${itemInfoKeys
        .map((key, index) => {
          if (key == "name") {
            return `
              <li id="itemName">
                <span class="attrKey">이름 : </span>
                <span class="attrValue"  data-grade="${this.state.cartInfo.id[0]}">
                  ${this.state.cartInfo[key]}
                </span>
              </li>`;
          } else if (key == "material") {
            return `<li id="itemMaterial">
              <span class="attrKey">재료 : </span>
              <span class="attrValue">
                <span data-id="${this.state.cartInfo[key][0]}" 
                data-grade="${this.state.cartInfo[key][0][0]}">
                  ${searchById(this.state.cartInfo[key][0]).name}
                </span>,
                <span data-id="${this.state.cartInfo[key][1]}" 
                data-grade="${this.state.cartInfo[key][1][0]}">
                  ${searchById(this.state.cartInfo[key][1]).name}
                </span>
              </span>
            </li>`;
          } else if (index > 8 && index < itemInfoKeys.length - 4) {
            return `
              <li>
                <span class="attrKey">${key} : </span>
                <span class="attrValue">${this.state.cartInfo[key]}</span>
              </li>`;
          } else if (key == "location" && this.state.cartInfo[key]) {
            return `
              <li>
                <span class="attrKey">드랍 장소 : </span>
                <span class="attrValue">${this.state.cartInfo[key]
                  .map((area) => `${areaData[area].name}`)
                  .join(", ")}</span>
              </li>`;
          }
        })
        .join("")}
    </ul>`;
    searchItemInfo(this.state);
  };

  this.render();
}
