import { initialWeapon } from "../utils/itemTable.js";

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
      <button class="toggleTabContentBtn closed">
        <i class="fas fa-angle-double-down"></i>
        <i class="fas fa-angle-double-up"></i>
      </button>
    </div>
    <ul id="initialWeaponBox" class="hide">
      ${initialWeapon
        .map(
          (weapon) => `
          <li data-id="${weapon.id}" data-sort="${weapon.sort}" data-name="${weapon.name}" data-img="${weapon.img}">
            <button class="initialWeaponBtn">
              <img src="./img/WSicon/${weapon.sort}.png" alt="${weapon.sort}_icon"/>
            </button>
          </li>`
        )
        .join("")}
    </ul>`;

    $bagInitialWeapon.querySelectorAll(".initialWeaponBtn").forEach((e) => {
      e.addEventListener("click", (clicked) => {
        const $li = clicked.target.closest("li");
        const clickedInfo = {
          id: $li.dataset.id,
          sort: $li.dataset.sort,
          name: $li.dataset.name,
          img: $li.dataset.img,
          count: 1,
          limit: 1,
          location: "weapon",
        };
        console.log(clickedInfo);
        onClick(clickedInfo);
      });
    });

    $bagInitialWeapon
      .querySelector(".toggleTabContentBtn")
      .addEventListener("click", (e) => {
        console.log("click");
        e.target.closest(".toggleTabContentBtn").classList.toggle("closed");
        $bagInitialWeapon
          .querySelector("#initialWeaponBox")
          .classList.toggle("hide");
      });
  };

  this.render();
}
