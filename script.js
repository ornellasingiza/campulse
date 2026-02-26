<script>
let students = JSON.parse(localStorage.getItem("students")) || {};

function saveAttendance() {
  let name = document.getElementById("name").value;
  let status = Number(document.getElementById("status").value);

  if (!name) {
    alert("Enter student name!");
    return;
  }

  if (!students[name]) {
    students[name] = {present: 0, total: 0};
  }

  students[name].total++;
  students[name].present += status;

  localStorage.setItem("students", JSON.stringify(students));

  showTable();
}

function showTable() {
  let table = document.getElementById("table");
  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Present</th>
      <th>Total</th>
      <th>Percentage</th>
    </tr>
  `;

  for (let name in students) {
    let p = ((students[name].present / students[name].total) * 100).toFixed(2);
    table.innerHTML += `
      <tr>
        <td>${name}</td>
        <td>${students[name].present}</td>
        <td>${students[name].total}</td>
        <td>${p}%</td>
      </tr>
    `;
  }
}

// Load data when page opens
showTable();

// Add event listener to button
document.getElementById("submitBtn").addEventListener("click", saveAttendance);

<button id="submitBtn">Save Attendance</button>
</script>
