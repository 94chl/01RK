// initialState: { targetItem: [  ], inventory, equip }

export default function BagItem({ $target, initialState, onMove, onRemove }) {
  const $bagItem = document.createElement("div");
  $bagItem.setAttribute("id", "bagItem");
  $target.appendChild($bagItem);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    console.log(this.state);
    const pocketName = Object.keys(this.state);
    $bagItem.innerHTML = `
    <ul style="display:flex; justify-content: space-evenly;">
      ${pocketName
        .map((pocket) => {
          let pocketNode;
          if (!this.state[pocket].id) {
            pocketNode = `<li 
            data-pocket="${pocket}">
              <span class="itemName">empty</span>
              <div>
                <button class="moveBtn">이동</button>
                <button class="removeBtn">삭제</button>
              </div>
            </li>`;
          } else {
            pocketNode = `<li 
            data-id="${this.state[pocket].id}" 
            data-sort="${this.state[pocket].sort}" 
            data-count="${this.state[pocket].count}" 
            data-limit="${this.state[pocket].limit}" 
            data-pocket="${pocket}">
              <span class="itemName">${this.state[pocket].name}</span>
              (x${this.state[pocket].count ? this.state[pocket].count : 1})
              <div>
                <button class="moveBtn">이동</button>
                <button class="removeBtn">삭제</button>
              </div>
            </li>`;
          }
          return pocketNode;
        })
        .join("")}
    </ul>`;

    $bagItem.querySelectorAll(".moveBtn").forEach((e) => {
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
          name: $li.querySelector(".itemName").innerText,
          count: parseInt($li.dataset.count),
          limit: parseInt($li.dataset.limit),
          location: $li.dataset.pocket,
        };
        onMove(clickedInfo);
      });
    });

    $bagItem.querySelectorAll(".removeBtn").forEach((e) => {
      e.addEventListener("click", (clicked) => {
        const $li = clicked.target.closest("li");
        const clickedInfo = {
          id: $li.dataset.id,
          sort: $li.dataset.sort,
          name: $li.querySelector(".itemName").innerText,
          count: parseInt($li.dataset.count),
          limit: parseInt($li.dataset.limit),
          location: $li.dataset.pocket,
        };
        if (clickedInfo.id) onRemove(clickedInfo);
      });
    });
  };

  this.render();
}
