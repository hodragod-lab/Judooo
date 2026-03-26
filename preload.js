const { ipcRenderer } = require('electron');

// This preload script sets up secure IPC communication
// between the main process and renderer process

window.electronAPI = {
    // Listen for print command from menu
    onPrintScore: (callback) => ipcRenderer.on('print-score', callback),
    
    // Listen for reset command from menu
    onResetScore: (callback) => ipcRenderer.on('reset-score', callback),
    
    // Listen for undo command from menu
    onUndoDeduction: (callback) => ipcRenderer.on('undo-deduction', callback),
    
    // Remove listeners
    removeAllListeners: () => {
        ipcRenderer.removeAllListeners('print-score');
        ipcRenderer.removeAllListeners('reset-score');
        ipcRenderer.removeAllListeners('undo-deduction');
    }
};
