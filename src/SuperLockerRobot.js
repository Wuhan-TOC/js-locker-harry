export default class SuperLockerRobot {
  constructor(lockerManager) {
    this.lockerManager = lockerManager
  }

  deposit() {
    const lockerIndex = this.lockerManager.getHighestEmptyRateLockerIndex()
    return lockerIndex >= 0 && this.lockerManager.deposit(lockerIndex)
  }

  withdraw(ticket) {
    return this.lockerManager.withdraw(ticket)
  }
}
