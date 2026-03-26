# Quick Start Guide

## Option 1: Web Version (Easiest - No Installation)

1. Open **index.html** in any web browser
2. Start using immediately!

That's it. No installation needed.

---

## Option 2: Desktop Version (Windows/Mac/Linux)

### Step 1: Install Node.js
- Download from: https://nodejs.org/
- Install with default settings
- Verify installation by opening PowerShell/Terminal and typing: `node --version`

### Step 2: Set Up the Application

**Windows PowerShell:**
```powershell
cd "D:\yubos\APP MAKING\JUDO score"
npm install
npm start
```

**Mac/Linux Terminal:**
```bash
cd /path/to/JUDO\ score
npm install
npm start
```

The application will launch automatically.

---

## Using the Score Sheet

1. **Enter Information** (top section)
   - Name of competitor
   - Name of judge
   - Date (auto-filled)

2. **Record Deductions** (middle section)
   - Click deduction buttons as you observe errors
   - Deductions are grouped by category (Technique, Balance, Timing, etc.)

3. **Monitor Score** (top right)
   - Starting Score: 100
   - Total Deductions: Running total
   - Final Score: 100 - Deductions (shown in color)

4. **Manage Entries**
   - **Undo Last**: Remove most recent deduction
   - **Reset All**: Clear everything and start over
   - **Print Score Sheet**: Create a PDF-ready record

5. **Add Notes** (bottom section)
   - Optional: Add any comments or observations
   - These appear when you print

---

## Keyboard Shortcuts

- **Ctrl+Z** (Cmd+Z on Mac) = Undo
- **Ctrl+P** (Cmd+P on Mac) = Print
- **Ctrl+R** (Cmd+R on Mac) = Reset

---

## Common Issues & Quick Fixes

**"npm is not recognized"**
- Restart your PowerShell/Terminal after installing Node.js

**Application won't start**
- Try: `npm cache clean --force`
- Then: `npm install` again
- Then: `npm start`

**Can't open index.html**
- Use File Explorer to find it
- Right-click → "Open with" → Choose your browser

---

## Files You'll See

- **index.html** - The interface (open this in browser for web version)
- **script.js** - All the scoring logic
- **style.css** - Colors and layout
- **main.js** - Desktop app launcher (ignore if using web version)
- **package.json** - Configuration file (needed for desktop version)
- **README.md** - Full documentation

---

## Need Help?

Check the main README.md file for detailed information about all features and troubleshooting.

---

**Ready to score?** Open index.html in your browser and you're good to go! ✓
