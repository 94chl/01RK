// initialState: { targetItem: [  ], inventory, equip }

export default function BagEquip({ $target, initialState, onMove, onRemove }) {
  const $bagEquip = document.createElement("div");
  $bagEquip.setAttribute("id", "bagEquip");
  $target.appendChild($bagEquip);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    console.log(this.state);
    const bagEquipSort = Object.keys(this.state);
    console.log(bagEquipSort);
    $bagEquip.innerHTML = `<ul>
      ${bagEquipSort
        .map((sort) => {
          let equipNode;
          if (!this.state[sort].id) {
            equipNode = `<li 
            data-pocket="${sort}">
              <button class="moveBtn">
                <span class="itemImg empty">empty</span>
              </button>
              <button class="removeBtn">
                <i class="fas fa-minus"></i>
              </button>
            </li>`;
          } else {
            equipNode = `<li 
            data-id="${this.state[sort].id}" 
            data-sort="${this.state[sort].sort}" 
            data-name="${this.state[sort].name}" 
            data-img="${this.state[sort].img}"
            data-sort="${this.state[sort].sort}" 
            data-count="1" 
            data-pocket="${sort}">
              <button class="moveBtn">                
                <img src="${this.state[sort].img}" alt="${this.state[sort].img}_img" class="itemImg"/>
              </button>
              <button class="removeBtn">
                <i class="fas fa-minus"></i>
              </button>
            </li>`;
          }
          return equipNode;
        })
        .join("")}
    </ul>`;

    $bagEquip.querySelectorAll(".moveBtn").forEach((e) => {
      e.addEventListener("click", (clicked) => {
        const $li = clicked.target.closest("li");
        if (document.querySelector(".nowClicked")) {
          document.querySelector(".nowClicked").classList.remove("nowClicked");
        } else {
          $li.classList.add("nowClicked");
        }

        const clickedInfo = {
          id: $li.dataset.id,
          sort: $li.dataset.sort,
          name: $li.dataset.name,
          img: $li.dataset.img,
          count: 1,
          limit: 1,
          location: $li.dataset.pocket,
        };
        onMove(clickedInfo);
      });
    });

    $bagEquip.querySelectorAll(".removeBtn").forEach((e) => {
      e.addEventListener("click", (clicked) => {
        const $li = clicked.target.closest("li");
        const clickedInfo = {
          id: $li.dataset.id,
          sort: $li.dataset.sort,
          name: $li.dataset.name,
          img: $li.dataset.img,
          count: 1,
          limit: 1,
          location: $li.dataset.pocket,
        };
        if (clickedInfo.id) onRemove(clickedInfo);
      });
    });
  };

  this.render();
}
