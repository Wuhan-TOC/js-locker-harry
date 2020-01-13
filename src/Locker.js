import Box from './Box.js'

export default class Locker {
  constructor(lockSize) {
    this.availableBoxes = []
    this.inUseBoxes = []
    this.lockSize = lockSize
    for (let i = 0; i < lockSize; i++) {
      const box = new Box(i, '')
      this.availableBoxes.push(box)
    }
  }

  setIndex(i) {
    this.index = i
  }

  getEmptyRate() {
    return this.availableBoxes.length / this.lockSize
  }

  deposit() {
    const box = this.availableBoxes.pop()
    if (box) {
      const code = this.generateCode()
      box.code = code
      this.inUseBoxes.push(box)
    }
    return box
  }

  withdraw(ticket) {
    let withdrawBox
    for (let i = 0; i < this.inUseBoxes.length; i++) {
      const currentBox = this.inUseBoxes[i]
      if (
        currentBox.index === ticket.boxIndex &&
        currentBox.code === ticket.barCode
      ) {
        withdrawBox = this.inUseBoxes.splice(i, 1)
        break
      }
    }
    if (withdrawBox) {
      withdrawBox.code = ''
      this.availableBoxes.push(withdrawBox)
      return true
    }
    return false
  }

  generateCode() {
    return Math.random()
      .toString(36)
      .slice(-8)
  }
}
