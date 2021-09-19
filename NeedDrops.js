import { disassembleAllWD } from "./disassemble.js";

// initialState: { greenMatId: {  }, greenMatName: {  } }

export default function NeedDrops({ $target, initialState, onChange }) {
  const $needDrops = document.createElement("div");
  $needDrops.setAttribute("id", "needDrops");
  $target.appendChild($needDrops);

  this.state = initialState;

  this.setState = (nextState) => {
    console.log(this.state);
    this.state = disassembleAllWD(nextState);
    console.log(this.state);
    this.render();
    onChange(this.state.dropMatId);
  };

  this.render = () => {
    $needDrops.innerHTML = `
    <ul>
      ${this.state.dropMatArr
        .map(
          (drop) => `<li data-id="${drop.id}">${drop.name}(x${drop.count})</li>`
        )
        .join("")}
    </ul>
    `;
  };

  this.render();
}
