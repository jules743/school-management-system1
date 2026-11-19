
const studentForm = document.getElementById('student-form');
const studentList = document.getElementById('student-list');
const studentCount = document.getElementById('student-count');
const studentSearch = document.getElementById('student-search');

// Load previously saved students
let students = JSON.parse(
  localStorage.getItem('schoolStudents') || '[]'
);

function saveStudents() {
  localStorage.setItem('schoolStudents', JSON.stringify(students));
}

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

studentForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('student-name').value.trim();
  const id = document.getElementById('student-id').value.trim();
  const gender = document.getElementById('student-gender').value;
  const studentClass = document.getElementById('student-class').value.trim();

  if (students.some(student =>
    student.id.toLowerCase() === id.toLowerCase()
  )) {
    alert('This Student ID already exists!');
    return;
  }

  students.push({ name, id, gender, studentClass });

  saveStudents();
  displayStudents();
  studentForm.reset();

  alert('Student registered successfully!');
});

studentSearch.addEventListener('input', displayStudents);

// Display saved records when the page opens
displayStudents();
