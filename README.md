# electron-selection-manager

A utility for electron apps to monitor OS level highlighted text.

forked from and heavily based on [Electron-ClipboardManager](https://github.com/Skaryon/electron-clipboardmanager)

## example
```javascript
import SelectionManager from 'electron-selection-manager'
const selectionManager = new SelectionManager({
  interval: 100 //will check the highlighted text for changes every 100 milliseconds
})

selectionManager
  .subscribe((data) => console.log(data)) //on the interval if the highlighted text has changed, listener will be called
selectionManager
  .start() //start monitoring highlighted text
```

## API

### selectionManager.subscribe(callback)
Subscribe to changes to highlighted text. Callback will receive a **SelectionManagerData** Object:
```javascript
{
  text: null, // null by default, String obj otherwise
  time: new Date().getTime()
}
```

### selectionManager.pause()
Stops notifying subscribers

### selectionManager.resume()
Resumes notifying subscribers

### selectionManager.start()
start monitoring highlighted text
