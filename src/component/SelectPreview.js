import { areaData, searchById, eng2Kor } from "../utils/itemTable.js";
import { disassembleGD } from "../utils/disassemble.js";

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
          <img src="${this.state.cartInfo.img}" alt="${
      this.state.cartInfo.name
    }_img" />
        </div>
        <ul id="itemOptions">
      ${itemInfoKeys
        .map((key, index) => {
          if (key == "name") {
            return `
              <li id="itemName">
                <span class="attrKey">이름 : </span>
                <span class="attrValue value${this.state.cartInfo.id[0]}">
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
                <button data-id="${this.state.cartInfo[key][0]}" 
                class="matInfoBtn value${this.state.cartInfo[key][0][0]}">
                  ${searchById(this.state.cartInfo[key][0]).name}
                </button>
                <button data-id="${this.state.cartInfo[key][1]}" 
                class="matInfoBtn value${this.state.cartInfo[key][1][0]}">
                  ${searchById(this.state.cartInfo[key][1]).name}
                </button>
              </span>
            </li>`;
          } else if (index > 9 && index < itemInfoKeys.length - 4) {
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
        <div id="itemPreviewBtnBox">
          <button class="undoInfoBtn">
            <i class="fas fa-undo"></i>
          </button>
          <button class="pathFinderBtn">
            <i class="fas fa-map-marked-alt"></i>
          </button>
        </div>
        <div id="itemPathModal" class="hide">
          <div id="itemPathModalBtnBox">
            <button class="rePathFinderBtn">
              <i class="fas fa-redo"></i>
            </button>
            <button class="removePathBtn">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="itemPaths"></div>
        </div>
      </div>`;

    searchItemInfo(this.state);

    $selectPreview.querySelectorAll(".matInfoBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.setState({ ...this.state, cart: e.target.dataset.id });
      });
    });

    $selectPreview
      .querySelector(".undoInfoBtn")
      .addEventListener("click", () => {
        this.setState({
          ...this.state,
          cart: document.querySelector("#detailsList").value,
        });
      });

    $selectPreview
      .querySelector(".pathFinderBtn")
      .addEventListener("click", async (e) => {
        $selectPreview.querySelector("#itemPathModal").classList.remove("hide");
        const $itemPaths = $selectPreview.querySelector(".itemPaths");

        const $loadingModule = document.createElement("div");
        $loadingModule.classList.add("loadingModule");
        $loadingModule.innerHTML = "탐색중입니다.";
        $itemPaths.appendChild($loadingModule);

        if ($itemPaths.querySelector("ul")) {
          $itemPaths.innerHTML = "";
        }

        const paths = await pathFinder(
          e.target.closest("#itemPreview").dataset.id
        );
        $selectPreview.querySelector(".itemPaths").innerHTML += `<ul>
          ${paths.map((path) => `<li>${path.join(" -> ")}</li>`).join("")}
        </ul>`;

        $itemPaths.querySelector(".loadingModule").remove();
      });

    $selectPreview
      .querySelector(".rePathFinderBtn")
      .addEventListener("click", async (e) => {
        const $itemPathModal = $selectPreview.querySelector("#itemPathModal");
        $itemPathModal.querySelector("ul").remove();

        const $loadingModule = document.createElement("div");
        $loadingModule.classList.add("loadingModule");
        $loadingModule.innerHTML = "탐색중입니다.";
        $loadingModule.style.height =
          $itemPathModal.querySelector(".itemPaths").style.height;
        $selectPreview.querySelector(".itemPaths").appendChild($loadingModule);

        const paths = await pathFinder(
          e.target.closest("#itemPreview").dataset.id
        );
        $selectPreview.querySelector(".itemPaths").innerHTML += `<ul>
          ${paths.map((path) => `<li>${path.join(" -> ")}</li>`).join("")}
        </ul>`;

        $selectPreview.querySelector(".loadingModule").remove();
      });

    $selectPreview
      .querySelector(".removePathBtn")
      .addEventListener("click", () => {
        $selectPreview.querySelector("#itemPathModal").classList.add("hide");
        $selectPreview.querySelector(".itemPaths").innerHTML = "";
      });
  };

  this.render();
}
