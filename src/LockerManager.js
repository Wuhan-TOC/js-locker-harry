import Locker from './Locker.js'

export default class LockerManager {
  constructor(lockSize) {
    this.availableLockers = []
    this.inUseLockers = []
    for (let i = 0; i < lockSize; i++) {
      const locker = new Locker(i, '')
      this.availableLockers.push(locker)
    }
  }

  deposit() {
    const locker = this.availableLockers.pop()
    if (locker) {
      const barCode = this.generateCode()
      locker.currentCode = barCode
      this.inUseLockers.push(locker)
    }
    return locker
  }

  withdraw(locker) {
    let withdrawLocker
    for (let i = 0; i < this.inUseLockers.length; i++) {
      const l = this.inUseLockers[i]
      if (l.index === locker.index && l.currentCode === locker.currentCode) {
        withdrawLocker = this.inUseLockers.splice(i, 1)
        break
      }
    }
    if (withdrawLocker) {
      withdrawLocker.currentCode = ''
      this.availableLockers.push(withdrawLocker)
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
