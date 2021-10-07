import SelectCategory from "./SelectCategory.js";
import SelectDetails from "./SelectDetails.js";
import SelectDept from "./SelectDept.js";
import SelectPreview from "./SelectPreview.js";
import { database } from "../utils/itemTable.js";

//initialState: { dept, category, data }

export default function SelectItem({
  $target,
  initialState,
  submitItem,
  pathFinder,
  setSessionStorage,
}) {
  const $selectItemBox = document.createElement("div");
  $selectItemBox.setAttribute("id", "selectItemBox");
  $target.appendChild($selectItemBox);
  $selectItemBox.innerHTML = `
  <div class="tabName">
    아이템 선택
    <button class="toggleTabContentBtn">
      <i class="fas fa-angle-double-down"></i>
      <i class="fas fa-angle-double-up"></i>
    </button>
  </div>`;

  this.state = {
    ...initialState,
    cart: "",
    cartInfo: { dropMat: {}, greenMat: {} },
    defaultCheck: false,
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      dept: nextState.dept,
      category: nextState.category,
      data: nextState.data,
      defaultCheck: nextState.defaultCheck,
      cart: nextState.cart || "",
    };

    selectCategory.setState(this.state);
    selectDetails.setState(this.state);
    selectPreview.setState(this.state);
  };

  const selectDept = new SelectDept({
    $target: $selectItemBox,
    initialState: this.state,
    changeDept: (selected) => {
      this.setState({
        dept: selected,
        category: database[`${selected}Data`][0].category,
        data: database[`${selected}Data`],
        defaultCheck: false,
      });
    },
  });

  const selectCategory = new SelectCategory({
    $target: $selectItemBox,
    initialState: this.state,
    changeCategory: (changed) => {
      this.state.category = changed;

      selectDetails.setState(this.state);

      selectPreview.setState({
        ...this.state,
        cart: document.querySelector("#detailsList").value,
      });
    },
  });

  const selectDetails = new SelectDetails({
    $target: $selectItemBox,
    initialState: this.state,
    changeDetails: (itemId) => {
      selectPreview.setState({ ...this.state, cart: itemId });
    },
  });

  const $itemSubmitBtn = document.createElement("button");
  $itemSubmitBtn.setAttribute("id", "itemSubmitBtn");
  $itemSubmitBtn.innerHTML = `<i class="fas fa-plus"></i>`;

  $selectItemBox.appendChild($itemSubmitBtn);
  $selectItemBox
    .querySelector("#itemSubmitBtn")
    .addEventListener("click", () => {
      submitItem(this.state.cartInfo);

      setSessionStorage();
    });

  const selectPreview = new SelectPreview({
    $target: $selectItemBox,
    initialState: {
      ...this.state,
      cart: document.querySelector("#detailsList").value,
    },
    searchItemInfo: (itemInfo) => {
      this.state = itemInfo;
    },
    pathFinder,
  });

  $selectItemBox
    .querySelector(".toggleTabContentBtn")
    .addEventListener("click", (e) => {
      e.target.closest(".toggleTabContentBtn").classList.toggle("closed");
      $selectItemBox.querySelector("#selectDept").classList.toggle("hide");
      $selectItemBox.querySelector("#selectCategory").classList.toggle("hide");
      $selectItemBox.querySelector("#selectDetails").classList.toggle("hide");
      $selectItemBox.querySelector("#itemSubmitBtn").classList.toggle("hide");
      $selectItemBox.querySelector("#selectPreview").classList.toggle("hide");
    });
}
