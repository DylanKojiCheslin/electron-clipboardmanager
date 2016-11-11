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

## API

### clipboardManager.subscribe(callback)
Subscribe to changes to the clipboard. Callback will receive a **ClipBoardData** Object:
```javascript
//defaults:
{
  formats: [] //array of formats the data fits (['text/html','text/plain','text/rtf','image/png'])
  
  //data:
  HTML: null,
  text: null,
  RTF: null,
  image: null,

  time: new Date().getTime()
}
```

### clipboardManager.pause()
Stops notifying subscribers

### clipboardManager.resume()
Resumes notifying subscribers

### clipboardManager.write(data, [type])
Writes provided **ClipBoardData** to the clipboard.
If a type is provided, it will write it as that type, else it will analyse the formats property of the data and chose an appropriate type.

### clipboardManager.start()
start monitoring the clipboard
