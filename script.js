let students = JSON.parse(localStorage.getItem("students")) || {};
let selectedClub = 'Chess Club';

function saveAttendance() {
  let name = document.getElementById("name").value;
  let status = Number(document.getElementById("status").value);
  let attendanceDate = document.getElementById("attendanceDate").value;

  // Validation with if-else
  if (!name) {
    alert("❌ Enter student name!");
    return;
  } else if (name.length < 2) {
    alert("❌ Name must be at least 2 characters!");
    return;
  } else if (!attendanceDate) {
    alert("❌ Select an attendance date!");
    return;
  } else if (!selectedClub) {
    alert("❌ Select a club!");
    return;
  }

  // Create unique key combining club and name
  let key = selectedClub + "_" + name;

  if (!students[key]) {
    students[key] = { present: 0, total: 0, dates: [] };
  }

  students[key].total++;
  students[key].present += status;
  students[key].dates.push(attendanceDate);

  localStorage.setItem("students", JSON.stringify(students));

  showTable();
  clearForm();
  
  // Show success message
  let statusText = status === 1 ? "Present" : "Absent";
  alert("✓ Attendance saved: " + name + " - " + statusText);
}

function showTable() {
  let table = document.getElementById("table");
  
  if (!table) {
    console.error("Table element not found");
    return;
  }

  table.innerHTML = `
    <tr>
      <th>Club</th>
      <th>Name</th>
      <th>Present</th>
      <th>Total</th>
      <th>Percentage</th>
    </tr>
  `;

  // Show only records for selected club
  for (let key in students) {
    if (key.startsWith(selectedClub)) {
      let name = key.replace(selectedClub + "_", "");
      let p = ((students[key].present / students[key].total) * 100).toFixed(2);
      table.innerHTML += `
        <tr>
          <td>${selectedClub}</td>
          <td>${name}</td>
          <td>${students[key].present}</td>
          <td>${students[key].total}</td>
          <td>${p}%</td>
        </tr>
      `;
    }
  }
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("status").value = "1";
  document.getElementById("attendanceDate").valueAsDate = new Date();
}

function selectClub(button, clubName) {
  if (!button || !clubName) {
    console.error("Invalid parameters");
    return;
  }

  // Remove active class from all buttons
  const allButtons = document.querySelectorAll('.club-btn');
  
  if (allButtons.length === 0) {
    console.error("No club buttons found");
    return;
  }

  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove('active');
  }

  // Add active class to clicked button
  button.classList.add('active');
  
  // Update selected club
  selectedClub = clubName;
  
  // Update displays
  const currentClubElement = document.getElementById('currentClub');
  if (currentClubElement) {
    currentClubElement.textContent = clubName;
  }

  const tableClubElement = document.getElementById('tableClubName');
  if (tableClubElement) {
    tableClubElement.textContent = clubName;
  }

  // Refresh table to show only this club's records
  showTable();
}

// Wait for DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Initialize date with today
  const dateInput = document.getElementById('attendanceDate');
  if (dateInput) {
    dateInput.valueAsDate = new Date();
  }

  // Attach click event to Save button
  const saveBtn = document.getElementById('saveBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', saveAttendance);
  } else {
    console.error("Save button not found - make sure button has id='saveBtn'");
  }

  // Load existing data
  showTable();
});

// Allow Enter key to save attendance
document.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    const statusSelect = document.getElementById('status');
    if (statusSelect && document.activeElement === statusSelect) {
      saveAttendance();
    }
  }
});
