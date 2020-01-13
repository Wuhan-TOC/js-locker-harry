import Locker from './Locker.js'

export default class LockerManager {
  constructor(lockerSettings) {
    this.lockers = []
    this.totalLockers = 0
    for (let i = 0; i < lockerSettings.length; i++) {
      this.totalLockers += lockerSettings[i].totalLockers
      for (let j = 0; j < lockerSettings[i].totalLockers; j++) {
        const locker = new Locker(lockerSettings[i].lockerSize)
        locker.setIndex(this.lockers.length)
        this.lockers.push(locker)
      }
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

  getHighestEmptyRateLockerIndex() {
    let highestEmptyRate = 0
    let targetLockerIndex = -1
    for (let i = 0; i < this.totalLockers; i++) {
      const locker = this.lockers[i]
      const emptyRate = locker.getEmptyRate()
      if (emptyRate > highestEmptyRate) {
        highestEmptyRate = emptyRate
        targetLockerIndex = i
      }
    }
    return targetLockerIndex
  }

  deposit(index) {
    const locker = this.lockers[index]
    // console.log(locker)
    const box = locker.deposit()
    // console.log(box)
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
