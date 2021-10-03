export default function Header({ $target, pathFinder }) {
  const $header = document.createElement("div");
  $header.setAttribute("id", "headerBox");
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
      <div id="logo">logo</div>
      <div id="title">title</div>
      <div id="headerBtnBox">
        <button id="headerStatusBtn">status</button>
        <button id="headerBagBtn">bag</button>
        <button id="headerRouteBtn">route</button>
      </div>
      <div id="allItemPath">        
        <button class="removePathBtn">x</button>
        <div class="itemPaths">test</div>
      </div>
    `;

    $header.querySelector("#headerBagBtn").addEventListener("click", () => {
      console.log("bag click");
      document.querySelector("#bagInventory").classList.toggle("active");
      document.querySelector("#bagAssembles").classList.toggle("active");
    });

    $header.querySelector("#headerRouteBtn").addEventListener("click", () => {
      const $allItemPath = $header.querySelector("#allItemPath");
      $allItemPath.classList.toggle("active");
      if ($allItemPath.querySelector("ul")) {
        $header.querySelector(".itemPaths").innerHTML = "";
      }
      document.querySelector("#loading").classList.toggle("hide");

      const paths = pathFinder();

      document.querySelector("#loading").classList.toggle("hide");
      console.log(paths);

      $allItemPath.innerHTML += `<ul>
        ${paths.map((path) => `<li>${path.join(" -> ")}</li>`).join("")}
      </ul>`;
    });

    $header.querySelector(".removePathBtn").addEventListener("click", () => {
      $header.querySelector(".itemPaths").innerHTML = "";
    });
  };

  this.render();
}
