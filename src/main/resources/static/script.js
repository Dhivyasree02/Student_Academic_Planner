
const API_URL = "http://localhost:8080/api";

// Common API request function
async function apiRequest(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        }
    });

    const text = await response.text();
    let data = null;

    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }

    if (!response.ok) {
        throw new Error(
            data?.message ||
            data?.error ||
            `Request failed: ${response.status}`
        );
    }

    return data;
}

// Display a message on the page
function showMessage(message, isError = false) {
    let element = document.getElementById("appMessage");

    if (!element) {
        element = document.createElement("p");
        element.id = "appMessage";
        document.body.prepend(element);
    }

    element.textContent = message;
    element.style.color = isError ? "red" : "green";
}

// Get input value safely
function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : "";
}

// Display records in a table or list
function displayRecords(containerId, records, fields) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.warn(`HTML element not found: ${containerId}`);
        return;
    }

    container.replaceChildren();

    if (!records || records.length === 0) {
        container.textContent = "No records found.";
        return;
    }

    const table = document.createElement("table");
    const header = document.createElement("tr");

    fields.forEach(field => {
        const th = document.createElement("th");
        th.textContent = field.label;
        header.appendChild(th);
    });

    table.appendChild(header);

    records.forEach(record => {
        const row = document.createElement("tr");

        fields.forEach(field => {
            const td = document.createElement("td");
            const value = record[field.key];

            td.textContent =
                value === true ? "Yes" :
                    value === false ? "No" :
                        value == null ? "" : String(value);

            row.appendChild(td);
        });

        table.appendChild(row);
    });

    container.appendChild(table);
}

// ================================
// ASSIGNMENTS
// Endpoint: /api/assignments
// ================================

async function loadAssignments() {
    try {
        const records = await apiRequest("/assignments");

        displayRecords("assignmentsList", records, [
            { key: "id", label: "ID" },
            { key: "title", label: "Title" },
            { key: "subject", label: "Subject" },
            { key: "dueDate", label: "Due Date" },
            { key: "completed", label: "Completed" }
        ]);
    } catch (error) {
        showMessage("Could not load assignments: " + error.message, true);
    }
}

async function addAssignment(event) {
    if (event) event.preventDefault();

    const title = getValue("title");
    const subject = getValue("subject");
    const dueDate = getValue("dueDate");

    if (!title || !subject || !dueDate) {
        showMessage("Enter assignment title, subject and due date.", true);
        return;
    }

    try {
        await apiRequest("/assignments", {
            method: "POST",
            body: JSON.stringify({
                title,
                subject,
                dueDate,
                completed: false
            })
        });

        showMessage("Assignment saved successfully!");
        await loadAssignments();

        const form = document.getElementById("assignmentForm");
        if (form) form.reset();
    } catch (error) {
        showMessage("Could not save assignment: " + error.message, true);
    }
}

async function completeAssignment(id) {
    try {
        await apiRequest(`/assignments/${id}/complete`, {
            method: "PUT"
        });

        showMessage("Assignment marked as completed.");
        await loadAssignments();
    } catch (error) {
        showMessage("Could not update assignment: " + error.message, true);
    }
}

// ================================
// ATTENDANCE
// Endpoint: /api/attendance
// ================================

async function loadAttendance() {
    try {
        const records = await apiRequest("/attendance");

        displayRecords("attendanceList", records, [
            { key: "id", label: "ID" },
            { key: "subject", label: "Subject" },
            { key: "totalClasses", label: "Total Classes" },
            { key: "attendedClasses", label: "Attended Classes" }
        ]);
    } catch (error) {
        showMessage("Could not load attendance: " + error.message, true);
    }
}

async function addAttendance(event) {
    if (event) event.preventDefault();

    const subject = getValue("subject");
    const totalClasses = Number(getValue("totalClasses"));
    const attendedClasses = Number(getValue("attendedClasses"));

    if (
        !subject ||
        !Number.isInteger(totalClasses) ||
        !Number.isInteger(attendedClasses) ||
        totalClasses < 1 ||
        attendedClasses < 0 ||
        attendedClasses > totalClasses
    ) {
        showMessage("Enter valid attendance details.", true);
        return;
    }

    try {
        await apiRequest("/attendance", {
            method: "POST",
            body: JSON.stringify({
                subject,
                totalClasses,
                attendedClasses
            })
        });

        showMessage("Attendance saved successfully!");
        await loadAttendance();

        const form = document.getElementById("attendanceForm");
        if (form) form.reset();
    } catch (error) {
        showMessage("Could not save attendance: " + error.message, true);
    }
}

// ================================
// EXAMS
// Endpoint: /api/exams
// ================================

async function loadExams() {
    try {
        const records = await apiRequest("/exams");

        displayRecords("examsList", records, [
            { key: "id", label: "ID" },
            { key: "subject", label: "Subject" },
            { key: "examType", label: "Exam Type" },
            { key: "examDate", label: "Exam Date" }
        ]);
    } catch (error) {
        showMessage("Could not load exams: " + error.message, true);
    }
}

async function addExam(event) {
    if (event) event.preventDefault();

    const subject = getValue("subject");
    const examType = getValue("examType");
    const examDate = getValue("examDate");

    if (!subject || !examType || !examDate) {
        showMessage("Enter all exam details.", true);
        return;
    }

    try {
        await apiRequest("/exams", {
            method: "POST",
            body: JSON.stringify({
                subject,
                examType,
                examDate
            })
        });

        showMessage("Exam saved successfully!");
        await loadExams();

        const form = document.getElementById("examForm");
        if (form) form.reset();
    } catch (error) {
        showMessage("Could not save exam: " + error.message, true);
    }
}

// ================================
// SEMESTER MARKS
// Endpoint: /api/marks
// ================================

async function loadMarks() {
    try {
        const records = await apiRequest("/marks");

        displayRecords("marksList", records, [
            { key: "id", label: "ID" },
            { key: "subject", label: "Subject" },
            { key: "semester", label: "Semester" },
            { key: "marks", label: "Marks Obtained" },
            { key: "totalMarks", label: "Total Marks" }
        ]);
    } catch (error) {
        showMessage("Could not load semester marks: " + error.message, true);
    }
}

async function addMark(event) {
    if (event) event.preventDefault();

    const subject = getValue("subject");
    const semester = Number(getValue("semester"));
    const marks = Number(getValue("marks"));
    const totalMarks = Number(getValue("totalMarks"));

    if (
        !subject ||
        !Number.isInteger(semester) ||
        semester < 1 ||
        !Number.isFinite(marks) ||
        !Number.isFinite(totalMarks) ||
        totalMarks <= 0 ||
        marks < 0 ||
        marks > totalMarks
    ) {
        showMessage("Enter valid semester marks details.", true);
        return;
    }

    try {
        await apiRequest("/marks", {
            method: "POST",
            body: JSON.stringify({
                subject,
                semester,
                marks,
                totalMarks
            })
        });

        showMessage("Semester marks saved successfully!");
        await loadMarks();

        const form = document.getElementById("marksForm");
        if (form) form.reset();
    } catch (error) {
        showMessage("Could not save marks: " + error.message, true);
    }
}

// ================================
// REGISTER
// Endpoint: /api/register
// ================================

async function registerStudent(event) {
    if (event) event.preventDefault();

    const name = getValue("name");
    const email = getValue("email");
    const password = getValue("password");

    if (!name || !email || !password) {
        showMessage("Enter name, email and password.", true);
        return;
    }

    try {
        const result = await apiRequest("/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password })
        });

        showMessage(result?.message || "Registration successful!");
    } catch (error) {
        showMessage("Registration failed: " + error.message, true);
    }
}

// ================================
// LOGIN
// Endpoint: /api/login
// ================================

async function loginStudent(event) {
    if (event) event.preventDefault();

    const email = getValue("email");
    const password = getValue("password");

    if (!email || !password) {
        showMessage("Enter email and password.", true);
        return;
    }

    try {
        const result = await apiRequest("/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        });

        showMessage(result?.message || "Login request successful!");
    } catch (error) {
        showMessage("Login failed: " + error.message, true);
    }
}

// ================================
// INITIALIZE PAGE
// ================================

document.addEventListener("DOMContentLoaded", () => {
    const page = window.location.pathname.toLowerCase();

    if (page.includes("assignments")) loadAssignments();
    if (page.includes("attendance")) loadAttendance();
    if (page.includes("exams")) loadExams();
    if (page.includes("marks")) loadMarks();

    const assignmentForm = document.getElementById("assignmentForm");
    if (assignmentForm) {
        assignmentForm.addEventListener("submit", addAssignment);
    }

    const attendanceForm = document.getElementById("attendanceForm");
    if (attendanceForm) {
        attendanceForm.addEventListener("submit", addAttendance);
    }

    const examForm = document.getElementById("examForm");
    if (examForm) {
        examForm.addEventListener("submit", addExam);
    }

    const marksForm = document.getElementById("marksForm");
    if (marksForm) {
        marksForm.addEventListener("submit", addMark);
    }

    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", registerStudent);
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", loginStudent);
    }
});

