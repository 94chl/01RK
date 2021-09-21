// initialState: {targetItem: [  ] }

export default function BagTarget({
  $target,
  initialState,
  onRemove,
  viewInfo,
  pathFinder,
}) {
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
      <div>목표 아이템</div>
      <ul>
        ${this.state.targetItem
          .map(
            (item, index) =>
              `<li data-id="${item.id}${index}">
                ${item.name}
                <button class="bagTargetRemoveBtn">x</button>
                <button class="bagTargetInfoBtn">info</button>
              </li>`
          )
          .join("")}
      </ul>
      <button id="bagTargetRemoveAllBtn">목표 전체 삭제</button>
      <button class="pathFinderBtn">route</button>
      <button class="removePathBtn">path X</button>
      <div id="itemPath"></div>
    `;

    $bagTarget.querySelectorAll(".bagTargetRemoveBtn").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const target = e.target.closest("li").dataset.id;
        onRemove(target.slice(0, target.length - 1));
        $bagTarget.querySelector(`[data-id=${target}]`).remove();
      })
    );

    $bagTarget
      .querySelector("#bagTargetRemoveAllBtn")
      .addEventListener("click", (e) => {
        onRemove("ALL");
      });

    $bagTarget.querySelectorAll(".bagTargetInfoBtn").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        const target = e.target.closest("li").dataset.id;
        viewInfo(target.slice(0, target.length - 1));
      })
    );

    $bagTarget.querySelector(".pathFinderBtn").addEventListener("click", () => {
      const $itemPath = $bagTarget.querySelector("#itemPath");

      if ($itemPath.querySelector("ul")) return;

      const paths = pathFinder("total");

      console.log(paths);

      $itemPath.innerHTML += `<ul>
        ${paths.map((path) => `<li>${path.join(" -> ")}</li>`).join("")}
      </ul>`;
    });

    $bagTarget.querySelector(".removePathBtn").addEventListener("click", () => {
      $bagTarget.querySelector("#itemPath").innerHTML = "";
    });
  };

  this.render();
}
