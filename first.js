let semesterCount = 0;

/**
 * Adds a new semester card to the UI
 */
function addSemester() {
    semesterCount++;
    const semesterList = document.getElementById('semester-list');
    
    const semDiv = document.createElement('div');
    semDiv.className = 'card semester-card';
    semDiv.id = `sem-container-${semesterCount}`;
    
    semDiv.innerHTML = `
        <div class="semester-header">
            <h3>Semester ${semesterCount}</h3>
            <button class="delete-sem" onclick="removeElement('sem-container-${semesterCount}')">Delete Semester</button>
            <div class="result-badge">SGPA: <span class="sgpa-display">0.00</span></div>
        </div>
        <div class="course-list">
            <div class="course-row">
                <input type="text" placeholder="Course Name (e.g. Physics)">
                <input type="number" class="credits" placeholder="Credits" min="1">
                <select class="grade">
                    <option value="10">EX (10)</option>
                    <option value="9">A (9)</option>
                    <option value="8">B (8)</option>
                    <option value="7">C (7)</option>
                    <option value="6">D (6)</option>
                    <option value="5">P (5)</option>
                    <option value="0">F (0)</option>
                </select>
                <div></div> </div>
        </div>
        <button class="btn-add" onclick="addCourseRow(this)">+ Add Subject</button>
    `;
    
    semesterList.appendChild(semDiv);
}

/**
 * Adds a new course row inside a specific semester
 */
function addCourseRow(btn) {
    const courseList = btn.previousElementSibling;
    const row = document.createElement('div');
    row.className = 'course-row';
    
    row.innerHTML = `
        <input type="text" placeholder="Course Name">
        <input type="number" class="credits" placeholder="Credits" min="1">
        <select class="grade">
            <option value="10">EX (10)</option>
            <option value="9">A (9)</option>
            <option value="8">B (8)</option>
            <option value="7">C (7)</option>
            <option value="6 (D)">D (6)</option>
            <option value="5">P (5)</option>
            <option value="0">F (0)</option>
        </select>
        <button class="btn-remove" onclick="this.parentElement.remove()">×</button>
    `;
    courseList.appendChild(row);
}

function removeElement(id) {
    document.getElementById(id).remove();
}

/**
 * Core Logic: Calculates SGPA for each semester and weighted CGPA for the total
 */
function calculateEverything() {
    const semesterCards = document.querySelectorAll('.semester-card');
    
    let globalTotalPoints = 0;
    let globalTotalCredits = 0;

    if (semesterCards.length === 0) {
        alert("Please add at least one semester!");
        return;
    }

    semesterCards.forEach(card => {
        let semTotalPoints = 0;
        let semTotalCredits = 0;
        
        const rows = card.querySelectorAll('.course-row');
        
        rows.forEach(row => {
            const creditValue = parseFloat(row.querySelector('.credits').value);
            const gradeValue = parseFloat(row.querySelector('.grade').value);
            
            // Only calculate if credits are entered
            if (!isNaN(creditValue) && creditValue > 0) {
                semTotalPoints += (creditValue * gradeValue);
                semTotalCredits += creditValue;
            }
        });

        // Calculate and update SGPA for this card
        const sgpa = semTotalCredits > 0 ? (semTotalPoints / semTotalCredits) : 0;
        card.querySelector('.sgpa-display').innerText = sgpa.toFixed(2);

        // Add to global totals for CGPA
        globalTotalPoints += semTotalPoints;
        globalTotalCredits += semTotalCredits;
    });

    // Calculate final CGPA
    const finalCGPA = globalTotalCredits > 0 ? (globalTotalPoints / globalTotalCredits) : 0;
    
    // UI Update
    const resultBox = document.getElementById('final-cgpa-container');
    const valueDisplay = document.getElementById('cgpa-value');
    
    resultBox.style.display = 'block';
    valueDisplay.innerText = finalCGPA.toFixed(2);
    
    // Smooth scroll to result
    resultBox.scrollIntoView({ behavior: 'smooth' });
}

// Start with one semester on page load
window.onload = addSemester;