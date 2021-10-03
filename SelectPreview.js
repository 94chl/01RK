import { areaData, searchById, eng2Kor } from "./itemTable.js";
import { disassembleGD } from "./disassemble.js";

export default function SelectPreview({
  $target,
  initialState,
  searchItemInfo,
  pathFinder,
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
    $selectPreview.innerHTML = `
      <div data-id="${this.state.cart}" id="itemPreview">
        <div id="itemImg">
          <img src="" alt="" /> image
        </div>
        <ul id="itemOptions">
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
          } else if (key == "sort") {
            return `
              <li id="itemSort">
                <span class="attrKey">종류 : </span>
                <span class="attrValue">
                  ${eng2Kor[this.state.cartInfo[key]]}
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
                <span class="attrKey">드랍 : </span>
                <span class="attrValue">${this.state.cartInfo[key]
                  .map((area) => `${areaData[area].name}`)
                  .join(", ")}</span>
              </li>`;
          }
        })
        .join("")}
        </ul>
        <div id="itemPathBox">
          <button class="pathFinderBtn">route</button>
        </div>
        <div id="itemPathModal" class="hide">
          <button class="removePathBtn">X</button>
          <div id="itemPaths"></div>
        </div>
      </div>`;

    searchItemInfo(this.state);

    $selectPreview
      .querySelector(".pathFinderBtn")
      .addEventListener("click", (e) => {
        $selectPreview.querySelector("#itemPathModal").classList.remove("hide");
        const $itemPaths = $selectPreview.querySelector("#itemPaths");

        if ($itemPaths.querySelector("ul")) {
          $itemPaths.innerHTML = "";
        }

        const paths = pathFinder(e.target.closest("#itemPreview").dataset.id);

        console.log(paths);

        $itemPaths.innerHTML += `<ul>
          ${paths.map((path) => `<li>${path.join(" -> ")}</li>`).join("")}
        </ul>`;
      });

    $selectPreview
      .querySelector(".removePathBtn")
      .addEventListener("click", () => {
        $selectPreview.querySelector("#itemPathModal").classList.add("hide");
        $selectPreview.querySelector("#itemPaths").innerHTML = "";
      });
  };

  this.render();
}
