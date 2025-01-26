// Select DOM elements
const form = document.getElementById('student-form');
const tableBody = document.getElementById('student-table');

// Fetch existing data from local storage
let students = JSON.parse(localStorage.getItem('students')) || [];

// Function to render students in the table
function renderStudents() {
  tableBody.innerHTML = ''; // Clear table content
  students.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Add scrollable class dynamically if the row count exceeds a limit
  if (students.length > 5) {
    tableBody.parentElement.classList.add('scrollable');
  } else {
    tableBody.parentElement.classList.remove('scrollable');
  }
}

// Form submission handler
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const id = document.getElementById('student-id').value.trim();
  const email = document.getElementById('email').value.trim();
  const contact = document.getElementById('contact').value.trim();

  // Input validation
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    alert('Name should contain only alphabets.');
    return;
  }
  if (!/^\d+$/.test(id)) {
    alert('Student ID should contain only numbers.');
    return;
  }
  if (!/^\d{10}$/.test(contact)) {
    alert('Contact number should be a 10-digit number.');
    return;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Invalid email format.');
    return;
  }

  // Add new student
  students.push({ name, id, email, contact });
  localStorage.setItem('students', JSON.stringify(students));
  renderStudents();

  // Reset form
  form.reset();
});

// Function to edit student
function editStudent(index) {
  const student = students[index];

  // Fill form with current student data
  document.getElementById('name').value = student.name;
  document.getElementById('student-id').value = student.id;
  document.getElementById('email').value = student.email;
  document.getElementById('contact').value = student.contact;

  // Update student on form submission
  form.onsubmit = (event) => {
    event.preventDefault();

    // Update student data
    students[index] = {
      name: document.getElementById('name').value.trim(),
      id: document.getElementById('student-id').value.trim(),
      email: document.getElementById('email').value.trim(),
      contact: document.getElementById('contact').value.trim(),
    };

    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();

    // Reset form submission behavior
    form.onsubmit = null;
    form.reset();
  };
}

// Function to delete student
function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(students));
  renderStudents();
}

// Initial render
renderStudents();
