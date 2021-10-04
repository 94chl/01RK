import { disassembleAllWD } from "./disassemble.js";

// initialState: { greenMatId: {  }, greenMatName: {  } }

export default function NeedDrops({ $target, initialState, onChange }) {
  const $needDrops = document.createElement("div");
  $needDrops.setAttribute("id", "needDrops");
  // $needDrops.classList.add("hide")
  $target.appendChild($needDrops);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = disassembleAllWD(nextState);
    console.log(this.state);
    this.render();
    onChange(this.state.dropMatId);
  };

  this.render = () => {
    $needDrops.innerHTML = `
    <div class="tabName">
      필요 드랍템
      <button class="toggleTabContentBtn">
        <i class="fas fa-angle-double-down"></i>
        <i class="fas fa-angle-double-up"></i>
      </button>
    </div>
    <ul id="needDropsBox">
      ${this.state.dropMatArr
        .map(
          (drop) => `<li data-id="${drop.id}">${drop.name}(x${drop.count})</li>`
        )
        .join("")}
    </ul>`;

    $needDrops
      .querySelector(".toggleTabContentBtn")
      .addEventListener("click", (e) => {
        console.log("click");
        e.target.closest(".toggleTabContentBtn").classList.toggle("closed");
        $needDrops.querySelector("#needDropsBox").classList.toggle("hide");
      });
  };

  this.render();
}
