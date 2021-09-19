import { eng2Kor } from "./itemTable.js";

// initialState: {dept, category, categoryArray}

export default function SelectCategory({
  $target,
  initialState,
  changeCategory,
}) {
  const $selectCategory = document.createElement("div");
  $selectCategory.setAttribute("id", "selectCategory");
  $target.appendChild($selectCategory);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    console.log(this.state);
    $selectCategory.innerHTML = `
      <select data-name="selectCategory" id="categoryList">
      ${this.state.data.map(
        (list) =>
          `<option value="${list.category}" ${
            list.category == this.state.category ? "selected" : ""
          }>${eng2Kor[list.category]}</option>`
      )}
      </select>
    `;
  };

  this.render();

  $selectCategory.addEventListener("change", (e) => {
    changeCategory(e.target.value);
  });
}
