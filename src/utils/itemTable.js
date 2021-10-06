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
  {
    id: "WWA003",
    sort: "dagger",
    name: "식칼",
    img: "https://lh3.google.com/u/0/d/1-thtb3zpwJfk7aOFG4b85EvrlvjTXiQu=w1402-h684-iv1",
  },
  {
    id: "WWB001",
    sort: "twoHand",
    name: "녹슨 검",
    img: "https://lh3.google.com/u/0/d/1DRGR0m_QAjMozo4naJ92rro0yeltJpmm=w1402-h684-iv2",
  },
  {
    id: "WWD001",
    sort: "dual",
    name: "쌍칼",
    img: "https://lh3.google.com/u/0/d/1uAUvkCU9u0oSSVZKzJrD6r-eBkm79dXm=w1402-h684-iv1",
  },
  {
    id: "WWC002",
    sort: "axe",
    name: "손도끼",
    img: "https://lh3.google.com/u/0/d/1nN70PUENStL1EdvxXZfVINS-IvzMVYf5=w1402-h684-iv2",
  },
  {
    id: "WWE002",
    sort: "glove",
    name: "목장갑",
    img: "https://lh3.google.com/u/0/d/1G3HGtOE-6SgbO2DIceFot6ukit9jHFZH=w1402-h684-iv2",
  },
  {
    id: "WWF001",
    sort: "tonfa",
    name: "대나무",
    img: "https://lh3.google.com/u/0/d/19qVuSi26IHVs69BzJpeGSnLiK7khzzZk=w1402-h684-iv2",
  },
  {
    id: "WWG001",
    sort: "bat",
    name: "단봉",
    img: "https://lh3.google.com/u/0/d/1IKMo3vBEb9QpGH4KYMXXVcQFuFOqh1Fu=w1402-h684-iv2",
  },
  {
    id: "WWH001",
    sort: "whip",
    name: "채찍",
    img: "https://lh3.google.com/u/0/d/1cE3bPU5jHsTIBe2IUzoBQ4hKDdRwCPCC=w1402-h684-iv2",
  },
  {
    id: "WWI002",
    sort: "throw",
    name: "야구공",
    img: "https://lh3.google.com/u/0/d/1UBia45v27Xh2pNU-fQMmXdfgEk85s3J_=w1402-h684-iv3",
  },
  {
    id: "WWJ001",
    sort: "shuriken",
    name: "면도칼",
    img: "https://lh3.google.com/u/0/d/1yA_VbjPtUJGlMFSIbbVLEJcC4yUx7yfB=w1402-h684-iv2",
  },
  {
    id: "WWK001",
    sort: "bow",
    name: "양궁",
    img: "https://lh3.google.com/u/0/d/1YtMAV6lsT3yHVo1mUofehoPnjT5x8rj4=w1402-h684-iv2",
  },
  {
    id: "WWL001",
    sort: "crossbow",
    name: "석궁",
    img: "https://lh3.google.com/u/0/d/1jXz4vdx3_-ld_J_FTO2ryB5c4toS66u7=w1402-h684-iv2",
  },
  {
    id: "WWM001",
    sort: "pistol",
    name: "발터 PPK",
    img: "https://lh3.google.com/u/0/d/1CTbwc8mKSEl8taDnXQBZk9nBw3DNbjxZ=w1402-h684-iv1",
  },
  {
    id: "WWN001",
    sort: "rifle",
    name: "페도로프 자동소총",
    img: "https://lh3.google.com/u/0/d/1orRlMARJ9ZmT_bfVBfc67WV82tigS1mC=w1402-h684-iv2",
  },
  {
    id: "WWO001",
    sort: "sniper",
    name: "화승총",
    img: "https://lh3.google.com/u/0/d/1tGLcheDsZE29HQtBZGnv3aluf2mzzjBK=w1402-h684-iv2",
  },
  {
    id: "WWP001",
    sort: "hammer",
    name: "망치",
    img: "https://lh3.google.com/u/0/d/19us6vAJPcxC0YLC2oCKgcGfBKM18v9b_=w1402-h684-iv2",
  },
  {
    id: "WWQ001",
    sort: "spear",
    name: "단창",
    img: "https://lh3.google.com/u/0/d/1Y4_GsHIDPj88qiz8jKcQvomWUgl9cHuq=w1402-h684-iv2",
  },
  {
    id: "WWR001",
    sort: "nunchaku",
    name: "쇠사슬",
    img: "https://lh3.google.com/u/0/d/1PbVd4gi__Ej5kadoPnRYq1g5PS4-WiAL=w1402-h684-iv2",
  },
  {
    id: "WWS001",
    sort: "rapier",
    name: "바늘",
    img: "https://lh3.google.com/u/0/d/1m8sFnxHP9IqxDq2DDITPAWaH6DF-ofpL=w1402-h684-iv2",
  },
  {
    id: "WWT001",
    sort: "guitar",
    name: "보급형 기타",
    img: "https://lh3.google.com/u/0/d/1y8x0BXvTs-HlPNLOEINPEiyN3Lo4lBpM=w1402-h684-iv2",
  },
  {
    id: "WWU001",
    sort: "camera",
    name: "렌즈",
    img: "https://lh3.google.com/u/0/d/1AX6l6JwCUJeXx8J3qXKhfiICHIRESI7j=w1402-h684-iv2",
  },
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
