export default class LockerRobot {
  constructor(lockerManager) {
    this.lockerManager = lockerManager
  }

  deposit() {
    const i = this.lockerManager.getFirstAvailableLocker()
    return i >= 0 && this.lockerManager.deposit(i)
  }

  withdraw(ticket) {
    return this.lockerManager.withdraw(ticket)
  }
}
