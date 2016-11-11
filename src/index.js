const hash = require('object-hash')
function ClipBoardData (clipboard) {
  const formats = clipboard.availableFormats()
  formats.forEach((format) => {
    Object.assign(this, {
      formats: formats,
      HTML: null,
      text: null,
      RTF: null,
      image: null
    })
    switch (format) {
      case 'text/html':
        Object.assign(this, {
          HTML: clipboard.readHTML()
        })
        break
      case 'text/plain':
        Object.assign(this, {
          text: clipboard.readText()
        })
        break
      case 'text/rtf':
        Object.assign(this, {
          RTF: clipboard.readRTF()
        })
        break
      case 'image/png':
        Object.assign(this, {
          image: clipboard.readImage()
        })
        break
    }
  })
  this._hash = hash(this, {
    algorithm: 'md5'
  })
  this.time = new Date().getTime()
  return this
}
function ClipboardManager (optionsIn) {
  const {clipboard} = require('electron')
  const subs = []
  let last = null
  let paused = false
  const options = Object.assign({
    interval: 100
  }, optionsIn)
  const typeOrder = ['image/png', 'text/html', 'text/rtf', 'text/plain']
  Object.assign(this, {
    start: function () {
      window.setInterval(() => {
        const data = new ClipBoardData(clipboard)
        if (!last || last._hash !== data._hash) {
          last = data
          if (!paused) {
            subs.forEach((sub) => sub(data))
          }
        }
      }, options.interval)
    },
    pause: function () {
      paused = true
    },
    resume: function () {
      paused = false
    },
    subscribe: (callback) => {
      subs.push(callback)
    },
    read: () => last,
    write: (data, type) => {
      let useType = null
      if (typeof type === 'undefined') {
        for (var i = 0; i < typeOrder.length; i++) {
          if (data.formats.indexOf(typeOrder[i]) > -1) {
            useType = typeOrder[i]
            break
          }
        }
      } else {
        if (data.formats.indexOf(type) > -1) {
          useType = type
        }
      }
      if (!useType) {
        throw new ('no supported type found')
      }
      switch (useType) {
        case 'text/html':
          clipboard.writeHTML(data.HTML)
          break
        case 'text/plain':
          clipboard.writeText(data.text)
          break
        case 'text/rtf':
          clipboard.writeRTF(data.RTF)
          break
        case 'image/png':
          clipboard.writeImage(data.image)
          break
      }
    }
  })
  return this
}
export default ClipboardManager
