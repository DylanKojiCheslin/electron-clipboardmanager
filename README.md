# electron-clipboardmanager

This is a simply utility for electron apps to monitor the clipboard and handle clipboard data.

## example
```javascript
import ClipboardManager from 'electron-clipboardmanager'
const clipboardManager = new ClipboardManager({
  interval: 100 //will check the clipboard for changes every 100 milliseconds
})

clipboardManager
  .subscribe((data) => console.log(data)) //whenever the clipboard changes, listener will be called
clipboardManager
  .start() //start monitoring the clipboard
```
