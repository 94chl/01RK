import { disassembleGD } from "../utils/disassemble.js";

// initialState: {dept, category, data}

export default function SelectDetails({
  $target,
  initialState,
  changeDetails,
}) {
  const $selectDetails = document.createElement("div");
  $selectDetails.setAttribute("id", "selectDetails");
  $target.appendChild($selectDetails);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $selectDetails.innerHTML = `
      <select data-name="selectDetails" id="detailsList">
      ${this.state.data
        .filter((list) => list.category === this.state.category)[0]
        .items.map(
          (item) => `<option value="${item.id}">${item.name}</option>`
        )}
      </select>      
    `;
    if (!this.state.defaultCheck) {
      this.state.cart = $selectDetails.querySelector("#detailsList").value;
      this.state.cartInfo = disassembleGD([this.state.cart]);
      this.state.defaultCheck = true;
    }
  };

  this.render();

  $selectDetails.addEventListener("change", (e) => {
    changeDetails(e.target.value);
  });
}
