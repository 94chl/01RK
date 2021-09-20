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

//파라미터 = 아이템 아이디
function itemRoute(itemId, route) {
  $(`.tab.${itemId} .routeBox`).toggleClass("hide");
  //계산 여부 확인
  if ($(`.tab.${itemId} .routeBox .shortRoute`).length > 0) {
    return;
  }
  let needs = [];
  let routeArr = [];
  let routeStack = JSON.parse(JSON.stringify(route));
  let startPoint = [];
  let pathT = JSON.parse(JSON.stringify(areaPath));
  let mapT = JSON.parse(JSON.stringify(area));
  if (itemId == "total") {
    for (let i = 0; i < needDrops.length; i++) {
      if (needDrops[i].ID == startW && needDrops[i].count == 1) {
      } else {
        needs.push(needDrops[i].ID);
      }
    }
  } else {
    let equipMat = JSON.parse(JSON.stringify(getById(itemId, selectedG).drops));
    if (equipMat.indexOf(startW) >= 0) {
      equipMat.splice(equipMat.indexOf(startW), 1);
    }
    needs = needs.concat(equipMat);
  }

  needs = needs.reduce(function (acc, cur) {
    if (acc.indexOf(cur) < 0) {
      acc.push(cur);
    }
    return acc;
  }, []);

  $(needs).each(function (a, n) {
    if (bag.indexOf(n) >= 0) {
      needs.splice(needs.indexOf(n), 1);
    }
  });
  mapT = calcP(mapT, needs);

  if (routeStack.length > 0) {
    for (let i = 0; i < routeStack.length; i++) {
      let routeTemp = getById(routeStack[i], mapT).drop;
      needs = needs.filter(function (x) {
        if (routeTemp.includes(x)) {
          return false;
        } else {
          return true;
        }
      });
    }
    mapT = calcP(mapT, needs);
    for (let o = 2; o < mapT.length; o++) {
      if (
        mapT[o].pt > 0 &&
        pathT[Number(routeStack[routeStack.length - 1].substring(1)) - 2][
          o - 2
        ] > 0
      ) {
        startPoint.push(mapT[o]);
      }
    }
  } else {
    $(mapT).each(function () {
      if (this.pt > 0) {
        startPoint.push(this);
      }
    });
  }

  startPoint.sort(function (a, b) {
    return b.pt - a.pt;
  });
  //렌즈, 보급형기타 없이 상위템 만들기 불가능(드랍이 안댐)
  if (needs.indexOf("DW027") >= 0 || needs.indexOf("DW028") >= 0) {
    alert("보급형 기타, 렌즈는 시작무기를 통해 추가해주세요");
    return;
  }

  //지역 드랍테이블, 남은 드랍 갯수를 포인트로 변환
  function calcP(areaTemp, needTemp) {
    $(areaTemp).each(function (a, at) {
      for (let i = 0; i < at.drop.length; ) {
        if (needTemp.indexOf(at.drop[i]) < 0) {
          at.drop.splice(i, 1);
        } else {
          i++;
        }
      }
      at.pt = at.drop.length;
    });
    return areaTemp;
  }

  let shortest = 10;
  function shortRoute(needs, bag, path, map, idx, route) {
    //출발지
    let startT = JSON.parse(JSON.stringify(idx));
    if (route.length > shortest) {
      //긴 경로 제외
    } else {
      //출발지 별 도착지 탐색
      for (let i = 0; i < startT.length; i++) {
        let needsT = JSON.parse(JSON.stringify(needs));
        let bagT = JSON.parse(JSON.stringify(bag));
        let mapT = JSON.parse(JSON.stringify(map));
        let pathT = JSON.parse(JSON.stringify(path));
        //출발지의 드랍템 처리
        $(getById(startT[i].ID, mapT).drop).each(function (a, drop) {
          bagT.push(drop);
          if (needsT.indexOf(drop) >= 0) {
            needsT.splice(needsT.indexOf(drop), 1);
          }
        });
        mapT = calcP(mapT, needsT);
        for (let e = 0; e < pathT.length; e++) {
          pathT[e][Number(startT[i].ID.substring(1) - 2)] = 0;
        }
        //도착지 후보 선정(드랍템 유무, 이동가능 유무)
        let nextIdxs = [];
        for (let o = 2; o < mapT.length; o++) {
          if (
            mapT[o].pt > 0 &&
            pathT[Number(startT[i].ID.substring(1)) - 2][o - 2] > 0
          ) {
            nextIdxs.push(mapT[o]);
          }
        }
        nextIdxs.sort(function (a, b) {
          return b.pt - a.pt;
        });
        //출발지를 루트에 추가, 재귀함수 호출
        //이동경로
        let routeT = JSON.parse(JSON.stringify(route));
        if (needsT.length < 1) {
          routeT.push(startT[i].ID);
          if (shortest >= routeT.length) {
            shortest = routeT.length;
            let setRoute = [];
            $(routeT).each(function () {
              setRoute.push(getById(this, area).name);
            });
            routeArr.push(setRoute);
          }
        } else if (needsT.length > 0 && nextIdxs.length > 0) {
          routeT.push(startT[i].ID);
          if (routeT.length >= shortest) {
            continue;
          } else {
            shortRoute(needsT, bagT, pathT, mapT, nextIdxs, routeT);
          }
        } else {
          //탐색 불가
        }
      }
    }
  } //shortRoute

  shortRoute(needs, bag, pathT, mapT, startPoint, routeStack);

  routeArr = routeArr.filter(function (e) {
    return e.length <= shortest;
  });

  return routeArr;
}
