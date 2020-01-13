import { LockerManager, SuperLockerRobot } from './index.js'
import Locker from './Locker.js'

describe('test super robot deposit', () => {
  describe('success', () => {
    test('should deposit to locker 1 when super robot deposit given a 100% empty locker 1 and 50% empty locker 2', () => {
      const lockerSettings = []
      lockerSettings.push({ totalLockers: 1, lockerSize: 4 })
      lockerSettings.push({ totalLockers: 1, lockerSize: 2 })
      const lockerManager = new LockerManager(lockerSettings)
      lockerManager.lockers[1].deposit()

      const robot = new SuperLockerRobot(lockerManager)
      const result = robot.deposit()
      expect(result.lockerIndex).toBe(0)
    })
    test('should deposit to locker 1 when super robot deposit given a 50% empty locker 1 and 50% empty locker 2', () => {
      const lockerSettings = []
      lockerSettings.push({ totalLockers: 1, lockerSize: 2 })
      lockerSettings.push({ totalLockers: 1, lockerSize: 2 })
      const lockerManager = new LockerManager(lockerSettings)
      lockerManager.lockers[0].deposit()
      lockerManager.lockers[1].deposit()

      const robot = new SuperLockerRobot(lockerManager)
      const result = robot.deposit()
      expect(result.lockerIndex).toBe(0)
    })
  })
  describe('fail', () => {
    test('should return error when super robot deposit given a 0% empty locker 1 and 0% empty locker 2', () => {
      const lockerSettings = []
      lockerSettings.push({ totalLockers: 1, lockerSize: 1 })
      lockerSettings.push({ totalLockers: 1, lockerSize: 1 })
      const lockerManager = new LockerManager(lockerSettings)
      lockerManager.lockers[0].deposit()
      lockerManager.lockers[1].deposit()

      const robot = new SuperLockerRobot(lockerManager)
      const result = robot.deposit()
      expect(result).toBe(false)
    })
  })
})

describe('test super robot withdraw', () => {
  describe('success', () => {
    test('should return true when super robot withdraw given a valid ticket', () => {
      const lockerSettings = []
      lockerSettings.push({ totalLockers: 1, lockerSize: 2 })
      lockerSettings.push({ totalLockers: 1, lockerSize: 2 })
      const lockerManager = new LockerManager(lockerSettings)
      const ticket = lockerManager.deposit(0)

      const robot = new SuperLockerRobot(lockerManager)
      const result = robot.withdraw(ticket)
      expect(result).toBe(true)
    })
  })
  describe('fail', () => {
    test('should return false when super robot withdraw given a used ticket', () => {
      const lockerSettings = []
      lockerSettings.push({ totalLockers: 1, lockerSize: 2 })
      lockerSettings.push({ totalLockers: 1, lockerSize: 2 })
      const lockerManager = new LockerManager(lockerSettings)
      const ticket = lockerManager.deposit(0)
      lockerManager.withdraw(ticket)

      const robot = new SuperLockerRobot(lockerManager)
      const result = robot.withdraw(ticket)
      expect(result).toBe(false)
    })
    test('should return false when super robot withdraw given a fake ticket', () => {
      const lockerSettings = []
      lockerSettings.push({ totalLockers: 1, lockerSize: 2 })
      lockerSettings.push({ totalLockers: 1, lockerSize: 2 })
      const lockerManager = new LockerManager(lockerSettings)
      const ticket = {
        lockerIndex: 0,
        boxIndex: 1,
        barCode: '',
      }

      const robot = new SuperLockerRobot(lockerManager)
      const result = robot.withdraw(ticket)
      expect(result).toBe(false)
    })
  })
})
