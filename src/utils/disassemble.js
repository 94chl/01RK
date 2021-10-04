import { searchById } from "./itemTable.js";

// 녹색, 드랍 수준으로 분해
export function disassembleGD(materialArr) {
  let need2Disassemble = [...materialArr];
  const materials = {
    dropMatId: {},
    dropMatName: {},
    greenMatId: {},
    greenMatName: {},
  };
  console.log(materials);
  console.log(need2Disassemble);
  for (let i = 0; i < need2Disassemble.length; ) {
    const result = searchById(need2Disassemble[i]);
    if (!result.location) {
      if (result.id[0] == "G" && materials.greenMatId[result.id]) {
        materials.greenMatId[result.id]++;
        materials.greenMatName[result.name]++;
      } else if (result.id[0] == "G" && !materials.greenMatId[result.id]) {
        materials.greenMatId[result.id] = 1;
        materials.greenMatName[result.name] = 1;
      } else if (result.id[0] == "W") {
        console.log(result);
        materials.dropMatId[result.id] = 1;
        materials.dropMatName[result.name] = 1;
      } else {
        need2Disassemble = need2Disassemble.concat(result.material);
      }
      need2Disassemble.splice(i, 1);
    } else {
      if (materials.dropMatId[result.id]) {
        materials.dropMatId[result.id]++;
        materials.dropMatName[result.name]++;
      } else {
        materials.dropMatId[result.id] = 1;
        materials.dropMatName[result.name] = 1;
      }
      i++;
    }
  }

  return materials;
}

//흰색, 드랍 수준으로 분해
export function disassembleWD(materialArr) {
  let need2Disassemble = [...materialArr];
  const materials = {
    dropMatId: {},
    dropMatName: {},
  };
  console.log(materials);
  console.log(need2Disassemble);
  for (let i = 0; i < need2Disassemble.length; ) {
    const result = searchById(need2Disassemble[i]);
    if (!result.location && result.id[0] !== "W") {
      need2Disassemble = need2Disassemble.concat(result.material);
      need2Disassemble.splice(i, 1);
    } else {
      if (materials.dropMatId[result.id]) {
        materials.dropMatId[result.id]++;
        materials.dropMatName[result.name]++;
      } else {
        materials.dropMatId[result.id] = 1;
        materials.dropMatName[result.name] = 1;
      }
      i++;
    }
  }

  return materials;
}

// 아이템정보 배열을 받아서 종합하여 드랍템 수준으로
export function disassembleAllWD(itemArr) {
  const drops = {};
  const greens = {};
  itemArr.forEach((item) => {
    Object.keys(item.greenMatId).forEach((id) => {
      greens[id] = greens[id]
        ? greens[id] + item.greenMatId[id]
        : item.greenMatId[id];
    });
    Object.keys(item.dropMatId).forEach((id) => {
      drops[id] = drops[id]
        ? drops[id] + item.dropMatId[id]
        : item.dropMatId[id];
    });
  });

  const greensId = Object.keys(greens);
  greensId.forEach((id) => {
    const itemInfo = searchById(id);
    const count = Math.ceil(greens[id] / itemInfo.pickup);

    drops[itemInfo.material[0]] = drops[itemInfo.material[0]]
      ? drops[itemInfo.material[0]] + count
      : count;
    drops[itemInfo.material[1]] = drops[itemInfo.material[1]]
      ? drops[itemInfo.material[1]] + count
      : count;
  });

  const dropsId = Object.keys(drops);
  const dropsInfo = dropsId.map((id) => {
    const itemInfo = searchById(id);
    return { id, name: itemInfo.name, count: drops[id] };
  });

  const itemMatInfo = {
    greenMatId: greens,
    dropMatArr: dropsInfo,
    dropMatId: drops,
  };

  console.log(itemMatInfo);

  return itemMatInfo;
}
