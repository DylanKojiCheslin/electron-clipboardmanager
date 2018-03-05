function SelectionManager (optionsIn) {
  const hash = require('object-hash')
  function SelectionManagerData () {
      Object.assign(this, {
        text: window.getSelection().toString()
      })
    this._hash = hash(this, {
      algorithm: 'md5'
    })
    this.time = new Date().getTime()
    return this
  }
  const subs = []
  let last = null
  let paused = false
  const options = Object.assign({
    interval: 100
  }, optionsIn)
  Object.assign(this, {
    start: function () {
      window.setInterval(() => {
        const data = new SelectionManagerData()
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
  })
  return this
}
module.exports = SelectionManager
