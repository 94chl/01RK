// initialState: {targetItem: [  ] }

export default function TargetItems({
  $target,
  initialState,
  onRemove,
  viewInfo,
}) {
  const $targetItems = document.createElement("div");
  $targetItems.setAttribute("id", "targetItems");
  $target.appendChild($targetItems);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };

  this.render = () => {
    console.log(this.state);
    $targetItems.innerHTML = `
      <div class="tabName">
        목표 아이템
        <button class="toggleTabContentBtn">
          <i class="fas fa-angle-double-down"></i>
          <i class="fas fa-angle-double-up"></i>
        </button>
      </div>
      <ul id="targetItemBox">
        ${this.state.targetItem
          .map(
            (item, index) =>
              `<li data-id="${item.id}${index}">
                <div id="targetItemName">${item.name}</div>
                <div id="targetItemBtnBox">
                  <button class="targetItemsRemoveBtn">
                    <i class="fas fa-minus"></i>
                  </button>
                  <button class="targetItemsInfoBtn">
                    <i class="fas fa-info-circle"></i>
                  </button>
                </div>
              </li>`
          )
          .join("")}
      </ul>
      <div id="targetItemsRemoveAllBtnBox">
        <button id="targetItemsRemoveAllBtn">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;

    $targetItems.querySelectorAll(".targetItemsRemoveBtn").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const target = e.target.closest("li").dataset.id;
        onRemove(target.slice(0, target.length - 1));
        $targetItems.querySelector(`[data-id=${target}]`).remove();
      })
    );

    $targetItems
      .querySelector("#targetItemsRemoveAllBtn")
      .addEventListener("click", () => {
        onRemove("ALL");
        $targetItems.querySelector(`#targetItemBox`).innerHTML = "";
      });

    $targetItems.querySelectorAll(".targetItemsInfoBtn").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const target = e.target.closest("li").dataset.id;
        viewInfo(target.slice(0, target.length - 1));
      })
    );

    $targetItems
      .querySelector(".toggleTabContentBtn")
      .addEventListener("click", (e) => {
        console.log("click");
        e.target.closest(".toggleTabContentBtn").classList.toggle("closed");
        $targetItems.querySelector("#targetItemBox").classList.toggle("hide");
      });
  };

  this.render();
}
