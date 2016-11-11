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
# Licence



**MIT License**

Copyright (c) 2016 Michael Klein

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
