import SelectItem from "./SelectItem.js";
import Bag from "./Bag.js";
import NeedDrops from "./NeedDrops.js";
import { weaponData, database, equippable, weaponSort } from "./itemTable.js";
import Area from "./Area.js";

const $target = document.querySelector("#app");

const selectItem = new SelectItem({
  $target,
  initialState: {
    dept: "weapon",
    category: "whip",
    data: weaponData,
  },
  submitItem: (selected) => {
    console.log(selected);
    const nextBagState = {
      ...bag.state,
      targetItem: [...bag.state.targetItem, selected],
    };
    console.log(nextBagState);
    bag.setState(nextBagState, "targetItem");
    needDrops.setState(nextBagState.targetItem);
  },
});

console.log(database);

const bag = new Bag({
  $target,
  initialState: {
    targetItem: [],
    inventory: {
      pocket0: {
        id: "WF007",
        sort: "food",
        name: "빵",
        count: 2,
        limit: 5,
      },
      pocket1: {
        id: "WD002",
        sort: "drink",
        name: "물",
        count: 2,
        limit: 5,
      },
      pocket2: { id: false },
      pocket3: { id: false },
      pocket4: { id: false },
      pocket5: { id: false },
      pocket6: { id: false },
      pocket7: { id: false },
      pocket8: { id: false },
      pocket9: { id: false },
    },
    equip: {
      weapon: { id: false },
      clothes: { id: false },
      helmet: { id: false },
      bracelet: { id: false },
      shoes: { id: false },
      accessory: { id: false },
    },
  },
  targetItemRemove: (nextTarget) => {
    console.log(nextTarget);
    needDrops.setState(nextTarget);
  },
});

const needDrops = new NeedDrops({
  $target,
  initialState: {
    greenMatId: {},
    dropMatArr: [],
    dropMatId: {},
  },
  onChange: (dropMatId) => {
    area.setState(dropMatId);
  },
});

const area = new Area({
  $target,
  initialState: [],
  getDrop: (dropInfo) => {
    const bagInfo = bag.state;
    console.log(dropInfo);
    console.log(bagInfo);

    // 장비칸으로
    if (equippable.includes(dropInfo.sort)) {
      const bagEquip = { ...bagInfo.equip };

      if (weaponSort.includes(dropInfo.sort) && !bagInfo.equip.weapon.id) {
        bagEquip.weapon = dropInfo;
        bag.setState({ ...bagInfo, equip: bagEquip }, "equip");
        return;
      } else if (
        !weaponSort.includes(dropInfo.sort) &&
        !bagInfo.equip[dropInfo.sort].id
      ) {
        bagEquip[dropInfo.sort] = dropInfo;
        bag.setState({ ...bagInfo, equip: bagEquip }, "equip");
        return;
      } else {
        console.log("no equip space for " + dropInfo.name);
      }
    }

    // 가방으로
    const bagInventory = { ...bagInfo.inventory };
    console.log(bagInventory);

    // 가방에 동일한 아이템이 있는지 확인
    let bagSpace = Object.keys(bagInventory).findIndex(
      (pocket) =>
        bagInventory[pocket].id === dropInfo.id &&
        bagInventory[pocket].count < bagInventory[pocket].limit
    );
    console.log(bagSpace);

    // 가방에 동일한 아이템이 없을 때
    if (bagSpace < 0) {
      // 빈 공간 있는지 확인
      bagSpace = Object.keys(bagInfo.inventory).findIndex(
        (e) => bagInfo.inventory[e].id === false
      );
      // 가방에 빈 공간이 없을 때
      if (bagSpace < 0) {
        console.log("no space in bag");
        console.log(bagInfo.inventory);
        return;
      }
      bagInventory[`pocket${bagSpace}`] = dropInfo;
    } else {
      const targetPocket = bagInventory[`pocket${bagSpace}`];
      console.log(targetPocket.count, dropInfo.count);
      if (targetPocket.count + dropInfo.count > targetPocket.limit) {
        targetPocket.count = targetPocket.limit;

        const remains = {
          ...dropInfo,
          count: targetPocket.count + dropInfo.count - targetPocket.limit,
        };

        // 빈 공간 있는지 확인
        bagSpace = Object.keys(bagInfo.inventory).findIndex(
          (e) => bagInfo.inventory[e].id === false
        );
        // 가방에 빈 공간이 없을 때
        if (bagSpace < 0) {
          console.log("no space in bag");
          console.log(bagInfo.inventory);
          return;
        }
        bagInventory[`pocket${bagSpace}`] = remains;
      } else {
        targetPocket.count += dropInfo.count;
      }
    }
    console.log("bag space: pocket" + bagSpace);
    console.log(bagInventory);
    bag.setState({ ...bagInfo, inventory: bagInventory }, "inventory");
  },
});

// const dataCtrl = () => {
//   const bigData = [];
//   Object.keys(database).forEach((dataType) => {
//     database[dataType].forEach((category) => {
//       category.items.forEach((item) => {
//         bigData.push(item);
//       });
//     });
//   });
//   return bigData;
// };

// const bigData = dataCtrl();

// const newData = bigData.map((itemA) => {
//   const maketo = bigData.reduce((acc, itemB) => {
//     if (itemB.material && itemB.material.includes(itemA.id)) {
//       acc.push(itemB.id);
//     }
//     return acc;
//   }, []);
//   itemA.maketo = maketo;
//   return itemA;
// });

// console.log(newData);
