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
        <button class="toggleTabContentBtn">+</button>
      </div>
      <ul id="targetItemBox">
        ${this.state.targetItem
          .map(
            (item, index) =>
              `<li data-id="${item.id}${index}">
                ${item.name}
                <button class="targetItemsRemoveBtn">x</button>
                <button class="targetItemsInfoBtn">info</button>
              </li>`
          )
          .join("")}
      </ul>
      <div id="bagBtnBox">
        <button id="targetItemsRemoveAllBtn">전체 삭제</button>
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
      .addEventListener("click", () => {
        console.log("click");
        $targetItems.querySelector("#targetItemBox").classList.toggle("hide");
      });
  };

  this.render();
}