import Header from "./Header.js";
import SelectItem from "./SelectItem.js";
import TargetItems from "./TargetItems.js";
import Bag from "./Bag.js";
import NeedDrops from "./NeedDrops.js";
import { weaponData, equippable, weaponSort } from "./itemTable.js";
import { disassembleWD } from "./disassemble.js";
import Area from "./Area.js";
import { pathFinder } from "./pathFinder.js";
import CustomRoute from "./customRoute.js";

const $target = document.querySelector("#app");

const header = new Header({
  $target: document.querySelector("#header"),
  pathFinder: () => {
    const needsInfo = JSON.parse(JSON.stringify(needDrops.state));
    const needsIdArray = Object.keys(needsInfo.dropMatId);

    console.log(needsIdArray);

    const bagEquip = Object.values(bag.state.equip).reduce((acc, item) => {
      if (item.id) acc.push(item.id);
      return acc;
    }, []);
    const bagInventory = Object.values(bag.state.inventory).reduce(
      (acc, item) => {
        if (item.id) acc.push(item.id);
        return acc;
      },
      []
    );

    const bagNow = bagEquip.concat(bagInventory);
    console.log(bagNow);

    const loading = document.createElement("div");
    loading.classList.add("loading");
    loading.innerHTML = "루트 탐색 중";
    $target.appendChild(loading);

    const routes = pathFinder(customRoute.state, needsIdArray, bagNow);

    $target.querySelector(".loading").remove();

    return routes;
  },
});

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
      targetItem: [...targetItems.state.targetItem, selected],
    };
    console.log(nextBagState);
    targetItems.setState(nextBagState, "targetItem");
    needDrops.setState(nextBagState.targetItem);
  },
  pathFinder: (selectedId) => {
    const bagTarget = [selectedId];
    const needsInfo = disassembleWD(bagTarget);
    const needsIdArray = Object.keys(needsInfo.dropMatId);

    console.log(needsInfo);
    console.log(needsIdArray);

    const bagEquip = Object.values(bag.state.equip).reduce((acc, item) => {
      if (item.id) acc.push(item.id);
      return acc;
    }, []);
    const bagInventory = Object.values(bag.state.inventory).reduce(
      (acc, item) => {
        if (item.id) acc.push(item.id);
        return acc;
      },
      []
    );

    const bagNow = bagEquip.concat(bagInventory);
    console.log(bagNow);
    console.log(bagTarget);

    const loading = document.createElement("div");
    loading.classList.add("loading");
    loading.innerHTML = "루트 탐색 중";
    $target.appendChild(loading);

    const routes = pathFinder(customRoute.state, needsIdArray, bagNow);

    $target.querySelector(".loading").remove();

    return routes;
  },
});

const targetItems = new TargetItems({
  $target,
  initialState: { targetItem: [] },
  onRemove: (targetId) => {
    console.log(targetId);
    const bagInfo = JSON.parse(JSON.stringify(targetItems.state));
    console.log(bagInfo);

    if (targetId === "ALL") {
      bagInfo.targetItem = [];
    } else {
      bagInfo.targetItem.splice(bagInfo.targetItem.indexOf(targetId), 1);
    }

    targetItems.state = bagInfo;
    needDrops.setState(targetItems.state.targetItem);
  },
  viewInfo: (targetId) => {
    console.log(targetId);
    selectItem.setState({ ...selectItem.state, cart: targetId });
  },
});

const bag = new Bag({
  $target,
  initialState: {
    inventory: {
      pocket0: {
        id: "WF007",
        sort: "food",
        name: "빵",
        count: 2,
        limit: 5,
        location: "pocket0",
      },
      pocket1: {
        id: "WD002",
        sort: "drink",
        name: "물",
        count: 2,
        limit: 5,
        location: "pocket1",
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
});

const needDrops = new NeedDrops({
  $target,
  initialState: {
    greenMatId: {},
    dropMatArr: [],
    dropMatId: {},
  },
  onChange: (dropMatId) => {
    area.setState({ ...area.state, dropMatId });
  },
});

const area = new Area({
  $target,
  initialState: { pickedArea: [], dropMatId: [] },
  getDrop: (dropInfo) => {
    const bagInfo = JSON.parse(JSON.stringify(bag.state));
    console.log(dropInfo);
    console.log(bagInfo);

    // 장비칸으로
    if (equippable.includes(dropInfo.sort)) {
      const bagEquip = { ...bagInfo.equip };

      if (weaponSort.includes(dropInfo.sort) && !bagInfo.equip.weapon.id) {
        dropInfo.location = "weapon";
        bagEquip.weapon = dropInfo;
        bag.setState({ ...bagInfo, equip: bagEquip }, "equip");
        return;
      } else if (
        !weaponSort.includes(dropInfo.sort) &&
        !bagInfo.equip[dropInfo.sort].id
      ) {
        dropInfo.location = dropInfo.sort;
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

    // 가방에 동일한 아이템을 겹칠 수 있는지 확인
    let bagSpace = Object.keys(bagInventory).findIndex(
      (pocket) =>
        bagInventory[pocket].id === dropInfo.id &&
        bagInventory[pocket].count < bagInventory[pocket].limit
    );
    console.log(bagSpace);

    // 가방에 동일한 아이템을 겹칠 수 없을 때
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
      dropInfo.location = `pocket${bagSpace}`;
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
        remains.location = `pocket${bagSpace}`;
        bagInventory[`pocket${bagSpace}`] = remains;
      } else {
        targetPocket.count += dropInfo.count;
      }
    }
    console.log("bag space: pocket" + bagSpace);
    console.log(bagInventory);
    bag.setState({ ...bagInfo, inventory: bagInventory }, "inventory");
    console.log(bag.state);
  },
  routeCustom: (route) => {
    customRoute.setState(route);
  },
});

const customRoute = new CustomRoute({
  $target,
  initialState: [],
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
