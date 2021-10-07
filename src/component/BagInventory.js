import BagInitialWeapon from "./BagInitialWeapon.js";
import BagEquip from "./BagEquip.js";
import BagItem from "./BagItem.js";
import { weaponSort } from "../utils/itemTable.js";

//  initialState: {
//    inventory: { },
//    equip: { weapon: {  }, clothes: {  }, helmet: {  }, bracelet: {  }, shoes:  {  }, accessory: {  } }
//  }

export default function BagInventory({
  $target,
  initialState,
  setInitialWeapon,
  bagUpdate,
}) {
  const $bagInventory = document.createElement("div");
  $bagInventory.setAttribute("id", "bagInventory");
  $target.appendChild($bagInventory);

  this.state = initialState;

  this.setState = (nextState, targetState) => {
    this.state = nextState;
    if (targetState === "equip") {
      bagEquip.setState(this.state.equip);
    } else if (targetState === "inventory") {
      bagItem.setState(this.state.inventory);
    } else if (targetState === "allBag") {
      bagEquip.setState(this.state.equip);
      bagItem.setState(this.state.inventory);
    }
  };

  const bagInitialWeapon = new BagInitialWeapon({
    $target: $bagInventory,
    initialState,
    onClick: (clickedInfo) => {
      if (this.state.equip.weapon.id) {
        if (!window.confirm("현재 장착 중인 무기가 사라집니다. 진행할까요?")) {
          return;
        }
      }
      const nextEquips = { ...this.state.equip, weapon: clickedInfo };
      this.setState({ ...this.state, equip: nextEquips }, "equip");
      setInitialWeapon(nextEquips);
    },
  });

  const $inventoryTab = document.createElement("div");
  $inventoryTab.classList.add("tabName");
  $bagInventory.appendChild($inventoryTab);
  $inventoryTab.innerHTML = `인벤토리`;

  const moveItems = { from: { id: false }, to: { id: false } };

  const bagEquip = new BagEquip({
    $target: $bagInventory,
    initialState: this.state.equip,
    onMove: (clickedInfo) => {
      // 우선 선택된 아이템이 없다면, 현 아이템이 우선항목이 된다
      if (!moveItems.from.id) {
        // 빈 항목이 선택되었을 때, 무효처리
        if (!clickedInfo.id)
          document.querySelector(".nowClicked").classList.remove("nowClicked");
        moveItems.from = clickedInfo;
        return;
      }

      moveItems.to = clickedInfo;
      const nextInventory = { ...this.state };
      if (moveItems.from.location.slice(0, 6) === "pocket") {
        if (
          moveItems.from.sort === moveItems.to.location ||
          (weaponSort.includes(moveItems.from.sort) &&
            moveItems.to.location === "weapon")
        ) {
          nextInventory.inventory[moveItems.from.location] = moveItems.to;
          nextInventory.equip[moveItems.to.location] = moveItems.from;
          this.setState(nextInventory, "inventory");
          this.setState(nextInventory, "equip");
        }
        moveItems.from = { id: false };
        moveItems.to = { id: false };
      } else {
        moveItems.from = { id: false };
        moveItems.to = { id: false };
      }
    },
    onRemove: (clickedInfo) => {
      const nextInventory = { ...this.state };
      nextInventory.equip[clickedInfo.location] = { id: false };

      this.setState(nextInventory, "equip");
      bagUpdate(nextInventory);
    },
  });

  const bagItem = new BagItem({
    $target: $bagInventory,
    initialState: this.state.inventory,
    onMove: (clickedInfo) => {
      // 우선 선택된 아이템이 없다면, 현 아이템이 우선항목이 된다
      if (!moveItems.from.id) {
        // 빈 항목이 선택되었을 때, 무효처리
        if (!clickedInfo.id)
          document.querySelector(".nowClicked").classList.remove("nowClicked");
        moveItems.from = clickedInfo;
        return;
      }

      moveItems.to = clickedInfo;
      const nextInventory = { ...this.state };
      if (moveItems.from.location.slice(0, 6) === "pocket") {
        if (!moveItems.to.id) {
          nextInventory.inventory[moveItems.from.location] = { id: false };
          nextInventory.inventory[moveItems.to.location] = moveItems.from;
          this.setState(nextInventory, "inventory");
        } else {
          nextInventory.inventory[moveItems.from.location] = moveItems.to;
          nextInventory.inventory[moveItems.to.location] = moveItems.from;
          this.setState(nextInventory, "inventory");
        }
        moveItems.from = { id: false };
        moveItems.to = { id: false };
      } else {
        if (!moveItems.to.id) {
          nextInventory.equip[moveItems.from.location] = { id: false };
          nextInventory.inventory[moveItems.to.location] = moveItems.from;
          this.setState(nextInventory, "inventory");
          this.setState(nextInventory, "equip");
        } else if (
          moveItems.from.sort === moveItems.to.sort ||
          (weaponSort.includes(moveItems.from.sort) &&
            weaponSort.includes(moveItems.to.sort))
        ) {
          nextInventory.equip[moveItems.from.location] = moveItems.to;
          nextInventory.inventory[moveItems.to.location] = moveItems.from;
          this.setState(nextInventory, "inventory");
          this.setState(nextInventory, "equip");
        }
        moveItems.from = { id: false };
        moveItems.to = { id: false };
      }
    },
    onRemove: (clickedInfo) => {
      const nextInventory = { ...this.state };
      nextInventory.inventory[clickedInfo.location] = { id: false };

      this.setState(nextInventory, "inventory");
      bagUpdate(nextInventory);
    },
  });
}
