// Score tracking
const STARTING_SCORE = 100;
const MINIMUM_SCORE = 0;
const NUM_TECHNIQUES = 15;

// Initialize date field with today's date
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('judgeDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    updateScore();
});

// Calculate and display the score based on selected radiobuttons
function updateScore() {
    let totalDeductions = 0;
    
    // Check Bow In
    const bowInGroup = document.getElementsByName('bowIn');
    for (let radio of bowInGroup) {
        if (radio.checked) {
            totalDeductions += parseFloat(radio.value);
            break;
        }
    }
    
    // Check all 15 techniques - each has LEFT and RIGHT sides
    for (let i = 1; i <= NUM_TECHNIQUES; i++) {
        // Get LEFT side value
        const radioGroupLeft = document.getElementsByName(`technique${i}L`);
        for (let radio of radioGroupLeft) {
            if (radio.checked) {
                totalDeductions += parseFloat(radio.value);
                break;
            }
        }
        
        // Get RIGHT side value
        const radioGroupRight = document.getElementsByName(`technique${i}R`);
        for (let radio of radioGroupRight) {
            if (radio.checked) {
                totalDeductions += parseFloat(radio.value);
                break;
            }
        }
    }
    
    // Check Bow Out
    const bowOutGroup = document.getElementsByName('bowOut');
    for (let radio of bowOutGroup) {
        if (radio.checked) {
            totalDeductions += parseFloat(radio.value);
            break;
        }
    }
    
    const finalScore = Math.max(MINIMUM_SCORE, STARTING_SCORE - totalDeductions);
    
    // Update score displays
    document.getElementById('totalDeductions').textContent = totalDeductions.toFixed(1);
    document.getElementById('finalScore').textContent = finalScore.toFixed(1);
    
    // Change color based on score
    const scoreBox = document.querySelector('.score-box.final');
    if (finalScore >= 90) {
        scoreBox.style.background = 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)';
    } else if (finalScore >= 80) {
        scoreBox.style.background = 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)';
    } else if (finalScore >= 70) {
        scoreBox.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
    } else {
        scoreBox.style.background = 'linear-gradient(135deg, #34495e 0%, #2c3e50 100%)';
    }
}

// Reset everything
function resetScore() {
    if (confirm('Are you sure you want to reset all scores?')) {
        // Clear Bow In
        const bowInGroup = document.getElementsByName('bowIn');
        for (let radio of bowInGroup) {
            radio.checked = false;
        }
        
        // Clear all radiobuttons for techniques - both LEFT and RIGHT sides
        for (let i = 1; i <= NUM_TECHNIQUES; i++) {
            // Clear LEFT side
            const radioGroupLeft = document.getElementsByName(`technique${i}L`);
            for (let radio of radioGroupLeft) {
                radio.checked = false;
            }
            
            // Clear RIGHT side
            const radioGroupRight = document.getElementsByName(`technique${i}R`);
            for (let radio of radioGroupRight) {
                radio.checked = false;
            }
        }
        
        // Clear Bow Out
        const bowOutGroup = document.getElementsByName('bowOut');
        for (let radio of bowOutGroup) {
            radio.checked = false;
        }
        
        document.getElementById('judgeNotes').value = '';
        document.getElementById('competitorName').value = '';
        document.getElementById('judgeName').value = '';
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('judgeDate').value = today;
        
        updateScore();
    }
}

// Print the score sheet
function printScore() {
    const competitorName = document.getElementById('competitorName').value || 'N/A';
    const judgeName = document.getElementById('judgeName').value || 'N/A';
    const judgeDate = document.getElementById('judgeDate').value || 'N/A';
    const judgeNotes = document.getElementById('judgeNotes').value || 'None';
    
    // Collect all scores
    let totalDeductions = 0;
    let scoreDetails = [];
    
    const techniques = [
        'Bow In (Aisatsu)',
        '1. Uki Otoshi (Floating Drop)',
        '2. Seoi Nage (Shoulder Throw)',
        '3. Kata Guruma (Shoulder Wheel)',
        '4. Uki Goshi (Floating Hip Throw)',
        '5. Harai Goshi (Sweeping Hip Throw)',
        '6. Tsurikomi Goshi (Lifting Hip Throw)',
        '7. Okuriashi Harai (Sliding Foot Sweep)',
        '8. Sasae Tsurikomi Ashi (Propping Ankle Throw)',
        '9. Uchi Mata (Inner Thigh Throw)',
        '10. Tomoe Nage (Circle Throw)',
        '11. Ura Nage (Rear Throw)',
        '12. Sumi Gaeshi (Corner Reversal)',
        '13. Yoko Gake (Side Hook)',
        '14. Yoko Guruma (Side Wheel)',
        '15. Uki Waza (Floating Technique)',
        'Bow Out (Aisatsu)'
    ];
    
    // Check Bow In
    const bowInGroup = document.getElementsByName('bowIn');
    let bowInValue = 0;
    let bowInLabel = 'No Mistake';
    for (let radio of bowInGroup) {
        if (radio.checked) {
            bowInValue = parseFloat(radio.value);
            bowInLabel = radio.parentElement.textContent.trim();
            break;
        }
    }
    totalDeductions += bowInValue;
    if (bowInValue > 0) {
        scoreDetails.push(`Bow In (Aisatsu): ${bowInLabel} (-${bowInValue} pts)`);
    }
    
    // Check all 15 techniques
    for (let i = 1; i <= NUM_TECHNIQUES; i++) {
        const radioGroup = document.getElementsByName(`technique${i}`);
        let selectedValue = 0;
        let selectedLabel = 'No Mistake';
        
        for (let radio of radioGroup) {
            if (radio.checked) {
                selectedValue = parseFloat(radio.value);
                const label = radio.parentElement;
                selectedLabel = label.textContent.trim();
                break;
            }
        }
        
        totalDeductions += selectedValue;
        if (selectedValue > 0) {
            scoreDetails.push(`${techniques[i]}: ${selectedLabel} (-${selectedValue} pts)`);
        }
    }
    
    // Check Bow Out
    const bowOutGroup = document.getElementsByName('bowOut');
    let bowOutValue = 0;
    let bowOutLabel = 'No Mistake';
    for (let radio of bowOutGroup) {
        if (radio.checked) {
            bowOutValue = parseFloat(radio.value);
            bowOutLabel = radio.parentElement.textContent.trim();
            break;
        }
    }
    totalDeductions += bowOutValue;
    if (bowOutValue > 0) {
        scoreDetails.push(`Bow Out (Aisatsu): ${bowOutLabel} (-${bowOutValue} pts)`);
    }
    
    const finalScore = Math.max(MINIMUM_SCORE, STARTING_SCORE - totalDeductions);
    
    let scoreText = '';
    if (scoreDetails.length > 0) {
        scoreText = scoreDetails.join('\n');
    } else {
        scoreText = 'Perfect performance - No deductions';
    }
    
    const printContent = `
╔════════════════════════════════════════════════════════════════╗
║           NAGE NO KATA SCORE SHEET                            ║
╚════════════════════════════════════════════════════════════════╝

COMPETITOR INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:  ${competitorName.padEnd(55)}
Judge: ${judgeName.padEnd(55)}
Date:  ${judgeDate.padEnd(55)}

SCORING SUMMARY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Starting Score:      100.0
Total Deductions:    ${totalDeductions.toFixed(1).padEnd(6)} pts
FINAL SCORE:         ${finalScore.toFixed(1)} pts

DEDUCTIONS BY TECHNIQUE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${scoreText}

JUDGE NOTES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${judgeNotes}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated: ${new Date().toLocaleString()}
    `;
    
    // Create print window
    const printWindow = window.open('', '', 'width=900,height=700');
    printWindow.document.write(`
        <html>
        <head>
            <title>Nage no Kata Score Sheet - ${competitorName}</title>
            <style>
                body {
                    font-family: 'Courier New', monospace;
                    padding: 40px;
                    background: white;
                    line-height: 1.4;
                }
                pre {
                    font-family: 'Courier New', monospace;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    font-size: 11px;
                }
                h1 {
                    text-align: center;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body onload="window.print(); window.close();">
            <pre>${printContent}</pre>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// View Final Score in new window (printable, not auto-printing)
function viewFinalScore() {
    const competitorName = document.getElementById('competitorName').value || 'Unnamed';
    const judgeName = document.getElementById('judgeName').value || 'N/A';
    const judgeDate = document.getElementById('judgeDate').value || 'N/A';
    const judgeNotes = document.getElementById('judgeNotes').value || 'None';
    
    // Collect all scores
    let totalDeductions = 0;
    let scoreDetails = [];
    
    const techniques = [
        'Bow In (Aisatsu)',
        '1. Uki Otoshi (Floating Drop)',
        '2. Seoi Nage (Shoulder Throw)',
        '3. Kata Guruma (Shoulder Wheel)',
        '4. Uki Goshi (Floating Hip Throw)',
        '5. Harai Goshi (Sweeping Hip Throw)',
        '6. Tsurikomi Goshi (Lifting Hip Throw)',
        '7. Okuriashi Harai (Sliding Foot Sweep)',
        '8. Sasae Tsurikomi Ashi (Propping Ankle Throw)',
        '9. Uchi Mata (Inner Thigh Throw)',
        '10. Tomoe Nage (Circle Throw)',
        '11. Ura Nage (Rear Throw)',
        '12. Sumi Gaeshi (Corner Reversal)',
        '13. Yoko Gake (Side Hook)',
        '14. Yoko Guruma (Side Wheel)',
        '15. Uki Waza (Floating Technique)',
        'Bow Out (Aisatsu)'
    ];
    
    // Check Bow In
    const bowInGroup = document.getElementsByName('bowIn');
    let bowInValue = 0;
    let bowInLabel = 'No Mistake';
    for (let radio of bowInGroup) {
        if (radio.checked) {
            bowInValue = parseFloat(radio.value);
            bowInLabel = radio.parentElement.textContent.trim();
            break;
        }
    }
    totalDeductions += bowInValue;
    if (bowInValue > 0) {
        scoreDetails.push(`Bow In (Aisatsu): ${bowInLabel} (-${bowInValue} pts)`);
    }
    
    // Check all 15 techniques - both LEFT and RIGHT sides
    for (let i = 1; i <= NUM_TECHNIQUES; i++) {
        let leftValue = 0;
        let rightValue = 0;
        let leftLabel = 'No Mistake';
        let rightLabel = 'No Mistake';
        
        // Get LEFT side value
        const radioGroupLeft = document.getElementsByName(`technique${i}L`);
        for (let radio of radioGroupLeft) {
            if (radio.checked) {
                leftValue = parseFloat(radio.value);
                const label = radio.parentElement;
                leftLabel = label.textContent.trim();
                break;
            }
        }
        
        // Get RIGHT side value
        const radioGroupRight = document.getElementsByName(`technique${i}R`);
        for (let radio of radioGroupRight) {
            if (radio.checked) {
                rightValue = parseFloat(radio.value);
                const label = radio.parentElement;
                rightLabel = label.textContent.trim();
                break;
            }
        }
        
        const techniqueTotal = leftValue + rightValue;
        totalDeductions += techniqueTotal;
        
        // Show details for this technique
        if (techniqueTotal > 0) {
            if (leftValue > 0 && rightValue > 0) {
                scoreDetails.push(`${techniques[i]}: LEFT ${leftLabel} (-${leftValue} pts) + RIGHT ${rightLabel} (-${rightValue} pts) = -${techniqueTotal} pts`);
            } else if (leftValue > 0) {
                scoreDetails.push(`${techniques[i]}: LEFT ${leftLabel} (-${leftValue} pts)`);
            } else if (rightValue > 0) {
                scoreDetails.push(`${techniques[i]}: RIGHT ${rightLabel} (-${rightValue} pts)`);
            }
        }
    }
    
    // Check Bow Out
    const bowOutGroup = document.getElementsByName('bowOut');
    let bowOutValue = 0;
    let bowOutLabel = 'No Mistake';
    for (let radio of bowOutGroup) {
        if (radio.checked) {
            bowOutValue = parseFloat(radio.value);
            bowOutLabel = radio.parentElement.textContent.trim();
            break;
        }
    }
    totalDeductions += bowOutValue;
    if (bowOutValue > 0) {
        scoreDetails.push(`Bow Out (Aisatsu): ${bowOutLabel} (-${bowOutValue} pts)`);
    }
    
    const finalScore = Math.max(MINIMUM_SCORE, STARTING_SCORE - totalDeductions);
    
    let scoreText = '';
    if (scoreDetails.length > 0) {
        scoreText = scoreDetails.join('\n');
    } else {
        scoreText = 'Perfect performance - No deductions';
    }
    
    const printContent = `
╔════════════════════════════════════════════════════════════════╗
║           NAGE NO KATA SCORE SHEET                            ║
╚════════════════════════════════════════════════════════════════╝

COMPETITOR INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:  ${competitorName.padEnd(55)}
Judge: ${judgeName.padEnd(55)}
Date:  ${judgeDate.padEnd(55)}

SCORING SUMMARY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Starting Score:      100.0
Total Deductions:    ${totalDeductions.toFixed(1).padEnd(6)} pts
FINAL SCORE:         ${finalScore.toFixed(1)} pts

DEDUCTIONS BY TECHNIQUE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${scoreText}

JUDGE NOTES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${judgeNotes}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated: ${new Date().toLocaleString()}
    `;
    
    // Create new window with score (doesn't auto-print, user can choose to print/save as PDF)
    const scoreWindow = window.open('', '', 'width=1000,height=800');
    scoreWindow.document.write(`
        <html>
        <head>
            <title>Nage no Kata Score Sheet - ${competitorName}</title>
            <style>
                body {
                    font-family: 'Courier New', monospace;
                    padding: 40px;
                    background: white;
                    line-height: 1.4;
                    margin: 0;
                }
                pre {
                    font-family: 'Courier New', monospace;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    font-size: 12px;
                }
                .header {
                    text-align: center;
                    padding: 20px;
                    border-bottom: 2px solid #333;
                    margin-bottom: 20px;
                }
                .controls {
                    text-align: center;
                    margin-bottom: 20px;
                }
                button {
                    padding: 10px 20px;
                    margin: 0 10px;
                    background: #667eea;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                }
                button:hover {
                    background: #5568d3;
                }
                @media print {
                    .controls {
                        display: none;
                    }
                    body {
                        padding: 20px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="controls">
                <button onclick="window.print()">Print / Save as PDF</button>
                <button onclick="window.close()">Close</button>
            </div>
            <pre>${printContent}</pre>
        </body>
        </html>
    `);
    scoreWindow.document.close();
}

// Save Score to PDF file using jsPDF
function saveScore() {
    const competitorName = document.getElementById('competitorName').value || 'Unnamed';
    
    if (!competitorName || competitorName.trim() === '') {
        alert('Please enter competitor name before saving.');
        return;
    }
    
    // Collect all scores for the PDF
    let totalDeductions = 0;
    let scoreDetails = [];
    let deductionsList = [];
    
    const techniques = [
        'Bow In (Aisatsu)',
        '1. Uki Otoshi (Floating Drop)',
        '2. Seoi Nage (Shoulder Throw)',
        '3. Kata Guruma (Shoulder Wheel)',
        '4. Uki Goshi (Floating Hip Throw)',
        '5. Harai Goshi (Sweeping Hip Throw)',
        '6. Tsurikomi Goshi (Lifting Hip Throw)',
        '7. Okuriashi Harai (Sliding Foot Sweep)',
        '8. Sasae Tsurikomi Ashi (Propping Ankle Throw)',
        '9. Uchi Mata (Inner Thigh Throw)',
        '10. Tomoe Nage (Circle Throw)',
        '11. Ura Nage (Rear Throw)',
        '12. Sumi Gaeshi (Corner Reversal)',
        '13. Yoko Gake (Side Hook)',
        '14. Yoko Guruma (Side Wheel)',
        '15. Uki Waza (Floating Technique)',
        'Bow Out (Aisatsu)'
    ];
    
    // Check Bow In
    const bowInGroup = document.getElementsByName('bowIn');
    let bowInValue = 0;
    let bowInLabel = 'No Mistake';
    for (let radio of bowInGroup) {
        if (radio.checked) {
            bowInValue = parseFloat(radio.value);
            bowInLabel = radio.parentElement.textContent.trim();
            break;
        }
    }
    totalDeductions += bowInValue;
    if (bowInValue > 0) {
        deductionsList.push(`Bow In (Aisatsu): ${bowInLabel} (-${bowInValue} pts)`);
    }
    
    // Check all 15 techniques - both LEFT and RIGHT sides
    for (let i = 1; i <= NUM_TECHNIQUES; i++) {
        let leftValue = 0;
        let rightValue = 0;
        let leftLabel = 'No Mistake';
        let rightLabel = 'No Mistake';
        
        // Get LEFT side value - unselected = 0 (no mistake)
        const radioGroupLeft = document.getElementsByName(`technique${i}L`);
        for (let radio of radioGroupLeft) {
            if (radio.checked) {
                leftValue = parseFloat(radio.value);
                const label = radio.parentElement;
                leftLabel = label.textContent.trim();
                break;
            }
        }
        
        // Get RIGHT side value - unselected = 0 (no mistake)
        const radioGroupRight = document.getElementsByName(`technique${i}R`);
        for (let radio of radioGroupRight) {
            if (radio.checked) {
                rightValue = parseFloat(radio.value);
                const label = radio.parentElement;
                rightLabel = label.textContent.trim();
                break;
            }
        }
        
        const techniqueTotal = leftValue + rightValue;
        totalDeductions += techniqueTotal;
        
        // Only show details if there are deductions
        if (techniqueTotal > 0) {
            if (leftValue > 0 && rightValue > 0) {
                deductionsList.push(`${techniques[i]}: LEFT ${leftLabel} (-${leftValue}) + RIGHT ${rightLabel} (-${rightValue}) = -${techniqueTotal}`);
            } else if (leftValue > 0) {
                deductionsList.push(`${techniques[i]}: LEFT ${leftLabel} (-${leftValue})`);
            } else if (rightValue > 0) {
                deductionsList.push(`${techniques[i]}: RIGHT ${rightLabel} (-${rightValue})`);
            }
        }
    }
    
    // Check Bow Out
    const bowOutGroup = document.getElementsByName('bowOut');
    let bowOutValue = 0;
    let bowOutLabel = 'No Mistake';
    for (let radio of bowOutGroup) {
        if (radio.checked) {
            bowOutValue = parseFloat(radio.value);
            bowOutLabel = radio.parentElement.textContent.trim();
            break;
        }
    }
    totalDeductions += bowOutValue;
    if (bowOutValue > 0) {
        deductionsList.push(`Bow Out (Aisatsu): ${bowOutLabel} (-${bowOutValue} pts)`);
    }
    
    const finalScore = Math.max(MINIMUM_SCORE, STARTING_SCORE - totalDeductions);
    const judgeDate = document.getElementById('judgeDate').value || 'N/A';
    const judgeName = document.getElementById('judgeName').value || 'N/A';
    const judgeNotes = document.getElementById('judgeNotes').value || 'None';
    
    // Create PDF using jsPDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    let yPosition = 20;
    
    // Title
    pdf.setFontSize(20);
    pdf.setTextColor(44, 62, 80);
    pdf.text('NAGE NO KATA - SCORE SHEET', 105, yPosition, { align: 'center' });
    
    // Line separator
    pdf.setDrawColor(102, 126, 234);
    pdf.line(20, yPosition + 5, 190, yPosition + 5);
    yPosition += 15;
    
    // Competitor Info
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Competitor Name: ${competitorName}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Judge: ${judgeName}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Date: ${judgeDate}`, 20, yPosition);
    yPosition += 8;
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, yPosition);
    yPosition += 12;
    
    // Score Box
    pdf.setFillColor(240, 244, 255);
    pdf.rect(20, yPosition, 170, 35, 'F');
    
    pdf.setFontSize(12);
    pdf.text(`Starting Score: 100.0 pts`, 25, yPosition + 8);
    pdf.text(`Total Deductions: ${totalDeductions.toFixed(1)} pts`, 25, yPosition + 18);
    
    pdf.setFontSize(16);
    pdf.setTextColor(46, 204, 113);
    pdf.setFont(undefined, 'bold');
    pdf.text(`FINAL SCORE: ${finalScore.toFixed(1)} pts`, 25, yPosition + 28);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFont(undefined, 'normal');
    yPosition += 40;
    
    // Deductions section
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.text('Deductions by Technique:', 15, yPosition);
    yPosition += 7;
    
    pdf.setFontSize(7.5);
    pdf.setFont(undefined, 'normal');
    
    if (deductionsList.length > 0) {
        deductionsList.forEach((deduction) => {
            // Keep all text on single line - wider margin
            pdf.text(deduction, 16, yPosition);
            yPosition += 4.5;
            
            // Check if we need a new page
            if (yPosition > 270) {
                pdf.addPage();
                yPosition = 15;
            }
        });
    } else {
        pdf.text('Perfect performance - No deductions', 16, yPosition);
        yPosition += 4.5;
    }
    
    yPosition += 3;
    
    // Judge Notes section
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.text('Judge Notes:', 15, yPosition);
    yPosition += 6;
    
    pdf.setFontSize(8);
    pdf.setFont(undefined, 'normal');
    const notesLines = pdf.splitTextToSize(judgeNotes, 185);
    pdf.text(notesLines, 16, yPosition);
    
    // Save the PDF
    const filename = `${competitorName}_Nage_no_Kata.pdf`;
    pdf.save(filename);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl+P or Cmd+P for view score
    if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault();
        viewFinalScore();
    }
    // Ctrl+S or Cmd+S for save
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        saveScore();
    }
    // Ctrl+R or Cmd+R for reset
    if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
        resetScore();
    }
});
