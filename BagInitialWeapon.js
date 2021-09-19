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
    <ul style="display:flex;">
      ${initialWeapon
        .map(
          (weapon) =>
            `<li data-id="${weapon.id}" data-sort="${weapon.sort}" style="list-style:none;"><button class="initialWeaponBtn">${weapon.name}</button></li>`
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
        };
        onClick(clickedInfo);
      });
    });
  };

  this.render();
}
