import { searchById } from "./itemTable.js";

// initialState: [{equip}, {inventory}]
// {id:[], tobe:{key:[values]}}

const makeBagNow = (state) => {
  const bagNow = Object.values(state[0])
    .concat(Object.values(state[1]))
    .reduce(
      (acc, item) => {
        if (item.id) {
          acc.id.push(item.id);
          const tobeArr = searchById(item.id).tobe;
          tobeArr ? (acc.tobe[item.id] = tobeArr) : null;
        }
        return acc;
      },
      { id: [], tobe: {} }
    );

  return bagNow;
};

const assemblable = (bagNow) => {
  const bagMatId = bagNow.id;
  const bagMatToBe = bagNow.tobe || [];
  const assemblables = {};
  bagMatId.forEach((matId) => {
    if (bagMatToBe[matId]) {
      bagMatToBe[matId].forEach((tobe) => {
        if (!assemblables[tobe]) {
          const tobeInfo = searchById(tobe);
          if (
            tobeInfo.material.every((needMat) => bagMatId.includes(needMat))
          ) {
            assemblables[tobeInfo.id] = tobeInfo;
          }
        }
      });
    }
  });
  console.log(assemblables);
  return assemblables;
};

export default function BagAssembles({ $target, initialState, onClick }) {
  const $bagAssembles = document.createElement("div");
  $bagAssembles.setAttribute("id", "bagAssembles");
  $target.appendChild($bagAssembles);

  this.state = makeBagNow(initialState);
  console.log(this.state);
  this.setState = (nextState) => {
    this.state = makeBagNow(nextState);
    console.log(this.state);
    this.render();
  };

  this.render = () => {
    console.log(this.state);
    const assemblables = assemblable(this.state);
    const assemblablesId = Object.keys(assemblables);
    $bagAssembles.innerHTML = `
      <div class="tabName">제작가능</div>
      <ul>
        ${
          assemblablesId.length > 0
            ? assemblablesId
                .map(
                  (itemId) =>
                    `<li data-id="${itemId}">
                <button class="assembleBtn">${assemblables[itemId].name}</button>
              </li>`
                )
                .join("")
            : "<li>없음</li>"
        }
      </ul>
    `;

    $bagAssembles.querySelectorAll(".assembleBtn").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        onClick(e.target.closest("li").dataset.id);
      })
    );
  };

  this.render();
}
