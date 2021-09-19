// initialState: {targetItem: [  ] }

export default function BagTarget({ $target, initialState, onRemove }) {
  const $bagTarget = document.createElement("div");
  $bagTarget.setAttribute("id", "bagTarget");
  $target.appendChild($bagTarget);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };

  this.render = () => {
    console.log(this.state);
    $bagTarget.innerHTML = `
      <ul>
        ${this.state.targetItem
          .map(
            (item, index) =>
              `<li data-id="${item.id}${index}">${item.name}<button class="bagTargetRemoveBtn">x</button></li>`
          )
          .join("")}
      </ul>
      <button class="bagTargetRemoveAllBtn">ALL X</button>
    `;

    $bagTarget.querySelectorAll(".bagTargetRemoveBtn").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const target = e.target.closest("li").dataset.id;
        onRemove(target.slice(0, target.length - 1));
        $bagTarget.querySelector(`[data-id=${target}]`).remove();
      })
    );

    $bagTarget
      .querySelector(".bagTargetRemoveAllBtn")
      .addEventListener("click", (e) => {
        console.log(e.target);
        onRemove("ALL");
      });
  };

  this.render();
}
