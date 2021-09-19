import SelectCategory from "./SelectCategory.js";
import SelectDetails from "./SelectDetails.js";
import SelectDept from "./SelectDept.js";
import SelectPreview from "./SelectPreview.js";
import { database, searchById } from "./itemTable.js";

//initialState: { dept, category, data }

export default function SelectItem({ $target, initialState, submitItem }) {
  const $selectItemBox = document.createElement("div");
  $selectItemBox.setAttribute("id", "selectItemBox");
  $target.appendChild($selectItemBox);

  this.state = {
    ...initialState,
    cart: "",
    cartInfo: { dropMat: {}, greenMat: {} },
    defaultCheck: false,
  };

  this.setState = (nextState) => {
    console.log(this.state);
    console.log(nextState);
    this.state = {
      ...this.state,
      dept: nextState.dept,
      category: nextState.category,
      data: nextState.data,
      defaultCheck: nextState.defaultCheck,
    };
    console.log(this.state);
    selectCategory.setState(this.state);
    selectDetails.setState(this.state);
    selectPreview.setState(this.state);
  };

  const selectDept = new SelectDept({
    $target: $selectItemBox,
    initialState: this.state,
    changeDept: (selected) => {
      console.log("CHANGE Dept");
      console.log(selected);
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
      console.log("CHANGE Category");
      console.log(changed);
      this.state.category = changed;

      selectDetails.setState(this.state);

      console.log(this.state);
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
      console.log("CHANGE Details", itemId);

      selectPreview.setState({ ...this.state, cart: itemId });
      console.log(this.state);
    },
  });

  const selectPreview = new SelectPreview({
    $target: $selectItemBox,
    initialState: {
      ...this.state,
      cart: document.querySelector("#detailsList").value,
    },
    searchItemInfo: (itemInfo) => {
      console.log(this.state);
      console.log(itemInfo);
      this.state = itemInfo;
    },
  });

  const $itemSubmitBtn = document.createElement("button");
  $itemSubmitBtn.setAttribute("id", "itemSubmitBtn");
  $itemSubmitBtn.innerHTML = `add`;

  $selectItemBox.appendChild($itemSubmitBtn);
  $selectItemBox
    .querySelector("#itemSubmitBtn")
    .addEventListener("click", () => {
      console.log(this.state);
      console.log(this.state.cartInfo);
      submitItem(this.state.cartInfo);
    });
}
