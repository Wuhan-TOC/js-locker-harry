import Locker from './Locker.js'

export default class LockerManager {
  constructor(totalLockers, lockerSize) {
    this.lockers = []
    this.totalLockers = totalLockers
    for (let i = 0; i < totalLockers; i++) {
      const locker = new Locker(lockerSize)
      locker.setIndex(i)
      this.lockers.push(locker)
    }
  }

  getFirstAvailableLocker() {
    for (let i = 0; i < this.totalLockers; i++) {
      const locker = this.lockers[i]
      if (locker.availableBoxes.length > 0) {
        return i
      }
    }
    return -1
  }

  deposit(index) {
    const locker = this.lockers[index]
    const box = locker.deposit()
    if (box) {
      return {
        lockerIndex: locker.index,
        boxIndex: box.index,
        barCode: box.code,
      }
    }
    return box
  }

  withdraw(ticket) {
    const locker = this.lockers[ticket.lockerIndex]
    return locker.withdraw(ticket)
  }
}
