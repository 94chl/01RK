import BagInventory from "./BagInventory.js";
import BagAssembles from "./BagAssembles.js";
import { equippable, searchById, weaponSort } from "../utils/itemTable.js";

//  initialState: {
//    targetItem: [  ],
//    inventory: { },
//    equip: { weapon: {  }, clothes: {  }, helmet: {  }, bracelet: {  }, shoes:  {  }, accessory: {  } }
//  }

export default function Bag({ $target, initialState }) {
  const $bag = document.createElement("div");
  $bag.setAttribute("id", "bag");
  $target.appendChild($bag);

  this.state = initialState;

  this.setState = (nextState, targetState) => {
    this.state = nextState;
    if (targetState === "targetItem") {
      // bagTarget.setState({ targetItem: this.state.targetItem });
    } else {
      bagInventory.setState(
        { inventory: this.state.inventory, equip: this.state.equip },
        targetState
      );
      bagAssembles.setState([this.state.equip, this.state.inventory]);
    }
  };

  const bagInventory = new BagInventory({
    $target: $bag,
    initialState: {
      inventory: this.state.inventory,
      equip: this.state.equip,
    },
    setInitialWeapon: (newEquips) => {
      this.state.equip = newEquips;
    },
    bagUpdate: (nextBag) => {
      this.state = { ...this.state, ...nextBag };
      bagAssembles.setState([this.state.equip, this.state.inventory]);
    },
  });

  const bagAssembles = new BagAssembles({
    $target: $bag,
    initialState: [this.state.equip, this.state.inventory],
    onClick: (assembled) => {
      const bagInfo = JSON.parse(JSON.stringify(this.state));

      const assembledInfo = searchById(assembled);
      assembledInfo.count = assembledInfo.pickup;

      const needMat = [...assembledInfo.material];

      // 조합 시 재료 소모 처리
      for (const key of Object.keys(bagInfo)) {
        Object.values(bagInfo[key]).forEach((bagItem) => {
          if (bagItem.id && needMat.includes(bagItem.id)) {
            bagItem.count < 2
              ? (bagInfo[key][bagItem.location] = { id: false })
              : bagItem.count--;
            needMat.splice(needMat.indexOf(bagItem.id), 1);
          }
        });
        if (needMat.length < 1) break;
      }

      // 장비칸으로
      if (equippable.includes(assembledInfo.sort)) {
        const bagEquip = bagInfo.equip;

        if (
          weaponSort.includes(assembledInfo.sort) &&
          !bagInfo.equip.weapon.id
        ) {
          assembledInfo.location = "weapon";
          bagEquip.weapon = assembledInfo;
          this.setState({ ...bagInfo, equip: bagEquip }, "allBag");
          return;
        } else if (
          !weaponSort.includes(assembledInfo.sort) &&
          !bagInfo.equip[assembledInfo.sort].id
        ) {
          assembledInfo.location = assembledInfo.sort;
          bagEquip[assembledInfo.sort] = assembledInfo;
          this.setState({ ...bagInfo, equip: bagEquip }, "allBag");
          return;
        }
      }

      // 가방으로
      const bagInventory = bagInfo.inventory;

      // 가방에 동일한 아이템을 겹칠 수 있는지 확인
      let bagSpace = Object.keys(bagInventory).findIndex(
        (pocket) =>
          bagInventory[pocket].id === assembledInfo.id &&
          bagInventory[pocket].count < bagInventory[pocket].limit
      );

      // 가방에 동일한 아이템을 겹칠 수 없을 때
      if (bagSpace < 0) {
        // 빈 공간 있는지 확인
        bagSpace = Object.keys(bagInfo.inventory).findIndex(
          (e) => bagInfo.inventory[e].id === false
        );
        // 가방에 빈 공간이 없을 때
        if (bagSpace < 0) {
          return;
        }
        assembledInfo.location = `pocket${bagSpace}`;
        bagInventory[`pocket${bagSpace}`] = assembledInfo;
      } else {
        const targetPocket = bagInventory[`pocket${bagSpace}`];

        if (targetPocket.count + assembledInfo.count > targetPocket.limit) {
          const remains = {
            ...assembledInfo,
            count:
              targetPocket.count + assembledInfo.count - targetPocket.limit,
          };
          targetPocket.count = targetPocket.limit;

          // 빈 공간 있는지 확인
          bagSpace = Object.keys(bagInfo.inventory).findIndex(
            (e) => bagInfo.inventory[e].id === false
          );

          // 가방에 빈 공간이 없을 때
          if (bagSpace < 0) return;

          remains.location = `pocket${bagSpace}`;
          bagInventory[`pocket${bagSpace}`] = remains;
        } else {
          targetPocket.count += assembledInfo.count;
        }
      }
      this.setState({ ...bagInfo, inventory: bagInventory }, "allBag");
    },
  });
}
