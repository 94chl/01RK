const deptArray = ["weapon", "equip", "item"];

export default function SelectDepartment({
  $target,
  initialState,
  changeDept,
}) {
  const $selectDept = document.createElement("div");
  $selectDept.setAttribute("id", "selectDept");
  $target.appendChild($selectDept);

  this.state = initialState;

  this.render = () => {
    $selectDept.innerHTML = `
      ${deptArray
        .map(
          (dept) => `
            <input type="radio" value="${dept}" id="select${dept}" class="dept" name="${dept}" 
            ${dept == this.state.dept ? "checked" : ""}>
            <label for="select${dept}" 
              class="select${dept} ${dept == this.state.dept ? "selected" : ""}"
            >${dept}</label>`
        )
        .join("")}
    `;
  };

  $selectDept.addEventListener("change", (e) => {
    $selectDept.querySelectorAll(".dept").forEach((dept) => {
      if (dept.value == e.target.value) {
        $selectDept
          .querySelector(`label[for="select${dept.value}"]`)
          .classList.add("selected");
        dept.checked = true;
      } else {
        $selectDept
          .querySelector(`label[for="select${dept.value}"]`)
          .classList.remove("selected");
        dept.checked = false;
      }
    });
    changeDept(e.target.value);
  });

  this.render();
}
