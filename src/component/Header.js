export default function Header({ $target, pathFinder }) {
  const $header = document.createElement("div");
  $header.setAttribute("id", "headerBox");
  $target.appendChild($header);

  // <button id="headerStatusBtn">
  //   <i class="fas fa-user"></i>
  // </button>

  this.render = () => {
    $header.innerHTML = `
      <div id="logo">
        <img src="./img/ER_Logo_White.png" alt="logo" />
      </div>
      <div id="title">01RK</div>
      <div id="headerBtnBox">
        <button id="headerBagBtn">
          <i class="fas fa-suitcase"></i>
        </button>
        <button id="headerRouteBtn">
          <i class="fas fa-map-marked-alt"></i>
        </button>
      </div>
      <div id="allItemPath">
        <div class="tabName">
          추천 루트
          <button class="rePathFinderBtn">
            <i class="fas fa-redo"></i>
          </button>
        </div>
        <div class="itemPaths"></div>
      </div>
    `;

    $header.querySelector("#headerBagBtn").addEventListener("click", (e) => {
      e.target.closest("button").classList.toggle("openedBtn");
      document.querySelector("#bag").classList.toggle("active");
    });

    $header
      .querySelector("#headerRouteBtn")
      .addEventListener("click", async (e) => {
        e.target.closest("button").classList.toggle("openedBtn");
        const $allItemPath = $header.querySelector("#allItemPath");
        $allItemPath.classList.toggle("active");

        const $loadingModule = document.createElement("div");
        $loadingModule.classList.add("loadingModule");
        $loadingModule.innerHTML = "탐색중입니다.";
        $header.querySelector(".itemPaths").appendChild($loadingModule);

        const modalHeight =
          $allItemPath.querySelector(".itemPaths").style.height;
        modalHeight > 0 ? ($loadingModule.style.height = modalHeight) : "30px";

        if ([...$allItemPath.classList].includes("active")) {
          const paths = await pathFinder();
          if (paths) {
            if ($allItemPath.querySelector("ul")) {
              $allItemPath.querySelector("ul").remove();
            }
            $allItemPath.querySelector(".itemPaths").innerHTML += `<ul>
          ${paths.map((path) => `<li>${path.join(" -> ")}</li>`).join("")}
        </ul>`;
          }
        }

        $header.querySelector(".loadingModule").remove();
      });

    $header
      .querySelector(".rePathFinderBtn")
      .addEventListener("click", async () => {
        const $allItemPath = $header.querySelector("#allItemPath");

        const $loadingModule = document.createElement("div");
        $loadingModule.classList.add("loadingModule");
        $loadingModule.innerHTML = "탐색중입니다.";
        $header.querySelector(".itemPaths").appendChild($loadingModule);

        const modalHeight =
          $allItemPath.querySelector(".itemPaths").style.height;
        modalHeight > 0 ? ($loadingModule.style.height = modalHeight) : "30px";

        $allItemPath.querySelector("ul")
          ? $allItemPath.querySelector("ul").remove()
          : null;

        const paths = await pathFinder();
        $allItemPath.querySelector(".itemPaths").innerHTML += `<ul>
          ${paths.map((path) => `<li>${path.join(" -> ")}</li>`).join("")}
        </ul>`;

        $header.querySelector(".loadingModule").remove();
      });
  };

  this.render();
}
