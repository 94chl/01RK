import Header from "./component/Header.js";
import SelectItem from "./component/SelectItem.js";
import TargetItems from "./component/TargetItems.js";
import Bag from "./component/Bag.js";
import NeedDrops from "./component/NeedDrops.js";
import { weaponData, equippable, weaponSort } from "./utils/itemTable.js";
import { disassembleWD } from "./utils/disassemble.js";
import Area from "./component/Area.js";
import { pathFinder } from "./utils/pathFinder.js";
import CustomRoute from "./component/CustomRoute.js";
import Footer from "./component/Footer.js";

const $target = document.querySelector("#app");
let needsIdArrayNow = [];

const header = new Header({
  $target: document.querySelector("#header"),
  pathFinder: (refresh) => {
    const needsInfo = JSON.parse(JSON.stringify(needDrops.state));
    const needsIdArray = Object.keys(needsInfo.dropMatId);

    if (needsIdArray.length === needsIdArrayNow.length) {
      const checkNeedsChange = needsIdArrayNow.filter((id) =>
        needsIdArray.includes(id)
      );
      if (checkNeedsChange.length > 0 && !refresh) return false;
    }

    needsIdArrayNow = [...needsIdArray];

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

    const routes = pathFinder(customRoute.state, needsIdArray, bagNow);

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
    const nextBagState = {
      targetItem: [...targetItems.state.targetItem, selected],
    };

    targetItems.setState(nextBagState, "targetItem");
    needDrops.setState(nextBagState.targetItem);
  },
  pathFinder: (selectedId) => {
    const bagTarget = [selectedId];
    const needsInfo = disassembleWD(bagTarget);
    const needsIdArray = Object.keys(needsInfo.dropMatId);

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

    const routes = pathFinder(customRoute.state, needsIdArray, bagNow);

    return routes;
  },
  setSessionStorage: () => {
    sessionStorage.setItem(
      "targetItems",
      JSON.stringify(targetItems.state.targetItem)
    );
  },
});

const targetItems = new TargetItems({
  $target,
  initialState: {
    targetItem: JSON.parse(sessionStorage.getItem("targetItems")) || [],
  },
  onRemove: (targetId) => {
    const bagInfo = JSON.parse(JSON.stringify(targetItems.state));

    if (targetId === "ALL") {
      bagInfo.targetItem = [];
    } else {
      bagInfo.targetItem.splice(bagInfo.targetItem.indexOf(targetId), 1);
    }

    targetItems.state = bagInfo;
    needDrops.setState(targetItems.state.targetItem);
    sessionStorage.setItem(
      "targetItems",
      JSON.stringify(targetItems.state.targetItem)
    );
  },
  viewInfo: (targetId) => {
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
        img: "https://lh3.google.com/u/0/d/180oAkY10VN8i1hjNW_O8BXo5A1R3d0-2=w1402-h253-iv1",
        count: 2,
        limit: 5,
        location: "pocket0",
      },
      pocket1: {
        id: "WD002",
        sort: "drink",
        name: "물",
        img: "https://lh3.google.com/u/0/d/1PbX7TO3Fa0M11FB-aYqxNvoi_XStkvRF=w1402-h684-iv2",
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
  initialState: JSON.parse(sessionStorage.getItem("needDrops")) || {
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
  initialState: {
    pickedArea: [],
    dropMatId: JSON.parse(sessionStorage.getItem("needDrops")).dropMatId || [],
  },
  getDrop: (dropInfo) => {
    const bagInfo = JSON.parse(JSON.stringify(bag.state));

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
      }
    }

    // 가방으로
    const bagInventory = { ...bagInfo.inventory };

    // 가방에 동일한 아이템을 겹칠 수 있는지 확인
    let bagSpace = Object.keys(bagInventory).findIndex(
      (pocket) =>
        bagInventory[pocket].id === dropInfo.id &&
        bagInventory[pocket].count < bagInventory[pocket].limit
    );

    // 가방에 동일한 아이템을 겹칠 수 없을 때
    if (bagSpace < 0) {
      // 빈 공간 있는지 확인
      bagSpace = Object.keys(bagInfo.inventory).findIndex(
        (e) => bagInfo.inventory[e].id === false
      );
      // 가방에 빈 공간이 없을 때
      if (bagSpace < 0) return;

      dropInfo.location = `pocket${bagSpace}`;
      bagInventory[`pocket${bagSpace}`] = dropInfo;
    } else {
      const targetPocket = bagInventory[`pocket${bagSpace}`];
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
        if (bagSpace < 0) return;

        remains.location = `pocket${bagSpace}`;
        bagInventory[`pocket${bagSpace}`] = remains;
      } else {
        targetPocket.count += dropInfo.count;
      }
    }

    bag.setState({ ...bagInfo, inventory: bagInventory }, "inventory");
  },
  routeCustom: (route) => {
    customRoute.setState(route);
  },
});

const customRoute = new CustomRoute({
  $target,
  initialState: [],
});

new Footer({ $target: document.querySelector("#footer") });
