import { initialWeapon } from "./itemTable.js";

// initialState: { targetItem: [  ], inventory, equip }

export default function BagInitialWeapon({ $target, initialState, onClick }) {
  const $bagInitialWeapon = document.createElement("div");
  $bagInitialWeapon.setAttribute("id", "bagInitialWeapon");
  $target.appendChild($bagInitialWeapon);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    console.log(this.state);
    $bagInitialWeapon.innerHTML = `
    <div class="tabName">
      시작 무기    
      <button class="toggleTabContentBtn">+</button>
    </div>
    <ul id="initialWeaponBox">
      ${initialWeapon
        .map(
          (weapon) =>
            `<li data-id="${weapon.id}" data-sort="${weapon.sort}"><button class="initialWeaponBtn">${weapon.name}</button></li>`
        )
        .join("")}
    </ul>`;

    $bagInitialWeapon.querySelectorAll(".initialWeaponBtn").forEach((e) => {
      e.addEventListener("click", (clicked) => {
        const $li = clicked.target.closest("li");
        const clickedInfo = {
          id: $li.dataset.id,
          sort: $li.dataset.sort,
          name: $li.innerText,
          count: 1,
          limit: 1,
          location: "weapon",
        };
        onClick(clickedInfo);
      });
    });

    $bagInitialWeapon
      .querySelector(".toggleTabContentBtn")
      .addEventListener("click", () => {
        console.log("click");
        $bagInitialWeapon
          .querySelector("#initialWeaponBox")
          .classList.toggle("hide");
      });
  };

  this.render();
}
