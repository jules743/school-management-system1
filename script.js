
const studentForm = document.getElementById('student-form');
const studentList = document.getElementById('student-list');
const studentCount = document.getElementById('student-count');
const studentSearch = document.getElementById('student-search');

let students = [];

studentForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('student-name').value.trim();
  const id = document.getElementById('student-id').value.trim();
  const gender = document.getElementById('student-gender').value;
  const studentClass = document.getElementById('student-class').value.trim();

  if (students.some(student => student.id.toLowerCase() === id.toLowerCase())) {
    alert('This Student ID already exists!');
    return;
  }

  students.push({
    name,
    id,
    gender,
    studentClass
  });

  displayStudents();

  studentForm.reset();

  alert('Student registered successfully!');
});

function displayStudents() {
  const search = studentSearch.value.toLowerCase();

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search) ||
    student.id.toLowerCase().includes(search) ||
    student.studentClass.toLowerCase().includes(search)
  );

  studentList.innerHTML = '';

  filteredStudents.forEach(student => {
    const row = document.createElement('tr');

    [student.id, student.name, student.gender, student.studentClass]
      .forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });

    studentList.appendChild(row);
  });

  studentCount.textContent = students.length;
}

studentSearch.addEventListener('input', displayStudents);

// Highlight the selected navigation link
document.querySelectorAll('.sidebar nav a').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelectorAll('.sidebar nav a')
      .forEach(item => item.classList.remove('active'));

    this.classList.add('active');
  });
});
