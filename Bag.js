import BagTarget from "./BagTarget.js";
import BagInventory from "./BagInventory.js";

//  initialState: {
//    targetItem: [  ],
//    inventory: { },
//    equip: { weapon: {  }, clothes: {  }, helmet: {  }, bracelet: {  }, shoes:  {  }, accessory: {  } }
//  }

export default function Bag({ $target, initialState, targetItemRemove }) {
  const $bag = document.createElement("div");
  $bag.setAttribute("id", "bag");
  $target.appendChild($bag);

  this.state = initialState;

  this.setState = (nextState, targetState) => {
    this.state = nextState;
    if (targetState === "targetItem") {
      bagTarget.setState({ targetItem: this.state.targetItem });
    } else {
      bagInventory.setState(this.state, targetState);
    }
    console.log(this.state);
  };

  const bagTarget = new BagTarget({
    $target: $bag,
    initialState: { targetItem: this.state.targetItem },
    onRemove: (targetId) => {
      console.log(targetId);
      if (targetId === "ALL") {
        this.setState({ ...this.state, targetItem: [] });
      } else {
        this.state.targetItem.splice(
          this.state.targetItem.indexOf(targetId),
          1
        );
      }
      console.log(this.state);
      targetItemRemove(this.state.targetItem);
    },
  });

  const bagInventory = new BagInventory({
    $target: $bag,
    initialState: {
      inventory: this.state.inventory,
      equip: this.state.equip,
    },
    setInitialWeapon: (newEquips) => {
      this.state.equip = newEquips;
      console.log(this.state);
    },
    bagUpdate: (nextBag) => {
      this.state = { ...this.state, ...nextBag };
    },
  });
}
