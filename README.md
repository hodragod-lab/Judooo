# Judo Nage no Kata Score Sheet

A professional, user-friendly scoring application for judging Nage no Kata in judo competitions. Features automatic score calculation, multiple deduction categories, and comprehensive score sheet printing.

## Features

✅ **Starting Score**: Begins at 100 points (standard judo kata scoring)
✅ **Deduction Categories**:
   - Technique Execution (0.5 - 5 points)
   - Balance & Posture (0.5 - 3 points)
   - Timing & Rhythm (0.5 - 2 points)
   - Form & Presentation (0.5 - 2 points)
   - Movement Quality (0.5 - 1.5 points)

✅ **Real-time Score Updates**: Final score updates instantly as deductions are added
✅ **Deduction Log**: Complete history of all deductions with timestamps
✅ **Judge Information**: Record competitor name, judge name, and date
✅ **Notes Section**: Add detailed comments and observations
✅ **Print Functionality**: Generate professional score sheets for records
✅ **Undo/Reset**: Correct mistakes with undo or reset entire score
✅ **Keyboard Shortcuts**: Quick access to common functions
✅ **Responsive Design**: Works on desktop, tablet, and mobile browsers

## Installation & Usage

### Web Version (Browser-based)

1. **Open in Browser**
   - Simply open `index.html` in any modern web browser
   - No installation required
   - Works offline

2. **Basic Usage**
   - Enter competitor information at the top
   - Click deduction buttons as needed during performance
   - Watch the final score update in real-time
   - Click "Print Score Sheet" to generate a printable record

### Desktop Version (Windows, Mac, Linux)

#### Installation

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/

2. **Install Dependencies**
   ```bash
   cd "path\to\JUDO score"
   npm install
   ```

3. **Run the Application**
   ```bash
   npm start
   ```

#### Building for Distribution

To create an installer:

```bash
npm run dist
```

This will create installers for your platform in the `dist/` folder.

## How to Use

### Scoring Process

1. **Enter Competitor Info** (optional but recommended)
   - Name of competitor
   - Judge name
   - Date (auto-filled with today)

2. **Monitor the Performance**
   - As the competitor performs Nage no Kata, click appropriate deduction buttons
   - Each category has multiple buttons for different severity levels

3. **Track Deductions**
   - View all deductions in the "Deduction Log" section with timestamps
   - See running total of deductions and current final score

4. **Complete the Score**
   - Add any judge notes in the "Judge Notes" section
   - Click "Print Score Sheet" to create a record

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+Z (Cmd+Z on Mac) | Undo last deduction |
| Ctrl+P (Cmd+P on Mac) | Print score sheet |
| Ctrl+R (Cmd+R on Mac) | Reset all scores |

### Buttons Reference

**Deduction Buttons**: Click to deduct points with descriptions for each type of error

**Control Buttons**:
- **Undo Last**: Removes the most recent deduction
- **Reset All**: Clears all deductions (confirms first)
- **Print Score Sheet**: Generates a printable PDF-ready document

## Scoring Breakdown

**Starting Score**: 100 points

**Deduction Categories**:
1. **Technique Execution** (most significant)
   - 0.5 points: Minor technique flaw
   - 1.0 points: Technique flaw
   - 2.0 points: Significant technique error
   - 5.0 points: Major technique error

2. **Balance & Posture**
   - 0.5 points: Minor balance loss
   - 1.0 points: Balance loss
   - 3.0 points: Poor posture/balance

3. **Timing & Rhythm**
   - 0.5 points: Timing slightly off
   - 1.0 points: Poor timing
   - 2.0 points: Broken rhythm

4. **Form & Presentation**
   - 0.5 points: Minor form issue
   - 1.0 points: Form deviation
   - 2.0 points: Incorrect form

5. **Movement Quality**
   - 0.5 points: Unclean movement
   - 1.0 points: Poor movement quality
   - 1.5 points: Jerky/awkward movement

**Score Ranges**:
- 90-100: Excellent
- 80-89: Very Good
- 70-79: Good
- Below 70: Needs Improvement

## System Requirements

### Web Version
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation needed

### Desktop Version
- Windows 10+, macOS 10.13+, or Linux (Ubuntu 18.04+)
- Node.js 12 or higher
- ~200MB disk space for installation

## Tips & Best Practices

1. **Familiar with Categories**: Review deduction categories before judging
2. **Consistent Scoring**: Use the same deduction amounts for similar errors
3. **Document Notes**: Use the notes section for context on major deductions
4. **Save Records**: Print score sheets for official records
5. **Practice**: Use test runs to familiarize yourself with the interface

## Troubleshooting

**Issue: Application won't start**
- Ensure Node.js is installed: `node --version`
- Reinstall dependencies: `npm install`
- Clear cache: `npm cache clean --force`

**Issue: Print not working**
- Check browser print settings
- Try different print options (Print to PDF)
- Ensure JavaScript is enabled

**Issue: Scores not saving**
- Web version doesn't auto-save (intentional for security)
- Use Print function to save records
- Take screenshots if needed

## File Structure

```
JUDO score/
├── index.html          # Main interface
├── style.css           # Styling and layout
├── script.js           # Scoring logic (web & desktop)
├── main.js             # Electron main process (desktop only)
├── preload.js          # Electron security layer (desktop only)
├── package.json        # Project configuration
└── README.md           # This file
```

## License

MIT License - Feel free to use and modify for your judo events

## Support

For issues or suggestions, review the code in the application folder and ensure all files are present.

---

**Version**: 1.0.0 | **Last Updated**: March 2026
