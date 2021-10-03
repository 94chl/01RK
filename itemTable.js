import readJSON from "./readJSON.js";

export const eng2Kor = {
  dagger: "단검",
  twoHand: "양손검",
  axe: "도끼",
  dual: "쌍검",
  pistol: "권총",
  rifle: "돌격소총",
  sniper: "저격총",
  rapier: "레이피어",
  spear: "창",
  hammer: "망치",
  bat: "방망이",
  throw: "투척",
  shuriken: "암기",
  bow: "활",
  crossbow: "석궁",
  glove: "글러브",
  tonfa: "톤파",
  guitar: "기타",
  nunchaku: "쌍절곤",
  whip: "채찍",
  camera: "카메라",
  clothes: "옷",
  helmet: "머리",
  bracelet: "팔",
  shoes: "다리",
  accessory: "장신구",
  material: "재료",
  food: "음식",
  drink: "음료",
  trap: "함정",
};

export const idToCategory = {
  weapon: {
    A: "dagger",
    B: "twoHand",
    C: "axe",
    D: "dual",
    E: "glove",
    F: "tonfa",
    G: "bat",
    H: "whip",
    I: "throw",
    J: "shuriken",
    K: "bow",
    L: "crossbow",
    M: "pistol",
    N: "rifle",
    O: "sniper",
    P: "hammer",
    Q: "spear",
    R: "nunchaku",
    S: "rapier",
    T: "guitar",
    U: "camera",
  },
  equip: {
    C: "clothes",
    H: "helmet",
    B: "bracelet",
    S: "shoes",
    A: "accessory",
  },
  item: {
    M: "material",
    T: "trap",
    F: "food",
    D: "drink",
  },
};

export const initialWeapon = [
  { id: "WWA003", sort: "dagger", name: "식칼" },
  { id: "WWB001", sort: "twoHand", name: "녹슨 검" },
  { id: "WWD001", sort: "dual", name: "쌍칼" },
  { id: "WWC002", sort: "axe", name: "손도끼" },
  { id: "WWE002", sort: "glove", name: "목장갑" },
  { id: "WWF001", sort: "tonfa", name: "대나무" },
  { id: "WWG001", sort: "bat", name: "단봉" },
  { id: "WWH001", sort: "whip", name: "채찍" },
  { id: "WWI002", sort: "throw", name: "야구공" },
  { id: "WWJ001", sort: "shuriken", name: "면도칼" },
  { id: "WWK001", sort: "bow", name: "양궁" },
  { id: "WWL001", sort: "crossbow", name: "석궁" },
  { id: "WWM001", sort: "pistol", name: "발터 PPK" },
  { id: "WWN001", sort: "rifle", name: "페도로프 자동소총" },
  { id: "WWO001", sort: "sniper", name: "화승총" },
  { id: "WWP001", sort: "hammer", name: "망치" },
  { id: "WWQ001", sort: "spear", name: "단창" },
  { id: "WWR001", sort: "nunchaku", name: "쇠사슬" },
  { id: "WWS001", sort: "rapier", name: "바늘" },
  { id: "WWT001", sort: "guitar", name: "보급형 기타" },
  { id: "WWU001", sort: "camera", name: "렌즈" },
];

export const equippable = [
  "dagger",
  "twoHand",
  "axe",
  "dual",
  "glove",
  "tonfa",
  "bat",
  "whip",
  "throw",
  "shuriken",
  "bow",
  "crossbow",
  "pistol",
  "rifle",
  "sniper",
  "hammer",
  "spear",
  "nunchaku",
  "rapier",
  "guitar",
  "camera",
  "clothes",
  "helmet",
  "bracelet",
  "shoes",
  "accessory",
];

export const weaponSort = [...equippable.slice(0, 21)];

export const weaponData = await readJSON("weapon");

export const areaData = await readJSON("area");

export const equipData = await readJSON("equip");

export const itemData = await readJSON("item");

export const database = { weaponData, equipData, itemData };

export const searchById = (itemId) => {
  const itemInfo = { id: itemId, dept: "", category: "", details: {} };
  if (itemId[1] == "W") {
    itemInfo.dept = "weapon";
    itemInfo.category = idToCategory[itemInfo.dept][itemId[2]];
  } else if (["C", "H", "B", "S", "A"].includes(itemId[1])) {
    itemInfo.dept = "equip";
    itemInfo.category = idToCategory[itemInfo.dept][itemId[1]];
  } else if (["M", "T", "F", "D"].includes(itemId[1])) {
    itemInfo.dept = "item";
    itemInfo.category = idToCategory[itemInfo.dept][itemId[1]];
  }
  itemInfo.details = database[`${itemInfo.dept}Data`]
    .filter((dept) => dept.category == itemInfo.category)[0]
    .items.filter((list) => list.id == itemInfo.id)[0];
  return itemInfo.details;
};
