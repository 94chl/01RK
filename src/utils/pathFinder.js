import { areaData } from "./itemTable.js";

//맵(이동정보)
const areaPath = [
  //골목길# 002 : 0
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //번화가# 003 : 1
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //절# 004 : 2
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //연못 005 : 3
  [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //병원# 006 : 4
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //묘지 007 : 5
  [0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  //공장# 008 : 6
  [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  //성당# 009 : 7
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  //항구 010 : 8
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 0, 0],
  //고주가# 011 : 9
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  //숲 012 : 10
  [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0],
  //모사 013 : 11
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0],
  //호텔# 014 : 12
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  //학교 015 : 13
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  //양궁장 016 : 14
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
];

// 지역 드랍테이블, 남은 드랍 갯수를 포인트로 변환
function checkAreaDrop(area, needs) {
  Object.keys(area).forEach((areaId) => {
    const areaDrop = needs.filter((needsId) =>
      area[areaId].drop.includes(needsId)
    );

    area[areaId].drop = areaDrop;
    area[areaId].point = areaDrop.length;
  });
  return area;
}

//파라미터 = 아이템 아이디
export function pathFinder(route, needsNow, bagNow) {
  const pathInfo = JSON.parse(JSON.stringify(areaPath));
  let mapInfo = JSON.parse(JSON.stringify(areaData));

  const routeStack = [...route];
  const finishedRoute = [];

  const bag = bagNow.filter((item) => needsNow.includes(item));
  const needs = needsNow.filter(
    (need) => !bag.includes(need) && !mapInfo.A000.drop.includes(need)
  );

  mapInfo = checkAreaDrop(mapInfo, needs);

  if (routeStack.length > 0) {
    routeStack.forEach((area) => {
      mapInfo[area].drop.forEach((drop) => {
        needs.includes(drop) ? needs.splice(needs.indexOf(drop), 1) : null;
      });
    });
  }

  if (needs.includes("WWD001")) {
    alert("쌍칼은 시작무기로 미선택 시 획득할 수 없습니다.");
    return [];
  }

  const startPoint = Object.keys(mapInfo)
    .reduce((acc, areaId) => {
      if (mapInfo[areaId].point > 0) {
        acc.push({ ...mapInfo[areaId], id: areaId });
      }
      return acc;
    }, [])
    .sort((a, b) => b.point - a.point);

  // 최단 경로 탐색
  let maxLength = 10;

  function shortRoute(needs, bag, path, map, startPoint, route) {
    //긴 경로 제외
    if (route.length > maxLength) return;

    // 출발지 [{id, name, drop, point}...]
    let startT = JSON.parse(JSON.stringify(startPoint));

    // 출발지 별 도착지 탐색
    for (let i = 0; i < startT.length; i++) {
      const needsT = [...needs];
      const bagT = [...bag];
      let mapInfo = JSON.parse(JSON.stringify(map));
      const pathInfo = JSON.parse(JSON.stringify(path));

      // 출발지의 드랍템 처리
      mapInfo[startT[i].id].drop.forEach((dropId) => {
        if (needsT.includes(dropId)) {
          bagT.push(dropId);
          needsT.splice(needsT.indexOf(dropId), 1);
        }
      });

      // 드랍템 처리 후 지역 점수 및 드랍 재측정
      mapInfo = checkAreaDrop(mapInfo, needsT);

      // 이동 가능 지역 갱신
      for (let e = 0; e < pathInfo.length; e++) {
        pathInfo[e][parseInt(startT[i].id.substring(1) - 2)] = 0;
      }

      //도착지 후보 선정(드랍템 유무, 이동가능 유무)
      const dest = [];
      for (const [areaId, areaDetail] of Object.entries(mapInfo)) {
        if (parseInt(areaId.substring(1)) < 2) continue;
        if (
          areaDetail.point > 0 &&
          pathInfo[parseInt(startT[i].id.substring(1)) - 2][
            parseInt(areaId.substring(1)) - 2
          ] > 0
        ) {
          dest.push({ ...areaDetail, id: areaId });
        }
      }

      dest.sort((a, b) => b.point - a.point);

      //출발지를 루트에 추가, 재귀함수 호출
      //이동경로
      const routeT = [...route];
      if (needsT.length < 1) {
        routeT.push(startT[i].id);
        if (maxLength >= routeT.length) {
          maxLength = routeT.length;
          const routeName = routeT.map((areaId) => areaData[areaId].name);
          finishedRoute.push(routeName);
        }
      } else if (needsT.length > 0 && dest.length > 0) {
        routeT.push(startT[i].id);
        // 탐색 중인 루트 폐기, 다음 루트 탐색
        if (routeT.length >= maxLength) {
          continue;
        } else {
          shortRoute(needsT, bagT, pathInfo, mapInfo, dest, routeT);
        }
      } else {
        //탐색 불가
      }
    }
  } //shortRoute

  shortRoute(needs, bag, pathInfo, mapInfo, startPoint, routeStack);

  const shortestRoute = finishedRoute.filter(
    (route) => route.length <= maxLength
  );

  return shortestRoute;
}
