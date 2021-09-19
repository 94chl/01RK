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
    console.log(this.state);
    $selectDept.innerHTML = `
      ${deptArray
        .map(
          (dept) => `
            <input type="radio" value="${dept}" class="dept" name="${dept}" 
            ${dept == this.state.dept ? "checked" : ""}>
            <label for="${dept}">${dept}</label>
          `
        )
        .join("")}
    `;
  };

  $selectDept.addEventListener("change", (e) => {
    $selectDept.querySelectorAll(".dept").forEach((dept) => {
      dept.value == e.target.value
        ? (dept.checked = true)
        : (dept.checked = false);
    });
    changeDept(e.target.value);
  });

  this.render();
}
