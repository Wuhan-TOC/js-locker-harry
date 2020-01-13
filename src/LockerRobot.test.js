import { LockerManager, LockerRobot } from './index.js'

const BAR_CODE_SIZE = 8

describe('test robot deposit', () => {
  describe('success', () => {
    test('should return a valid bar code when robot deposite given an available locker', () => {
      const lockerSettings = []
      lockerSettings.push({ totalLockers: 2, lockerSize: 3 })
      const lockerManager = new LockerManager(lockerSettings)
      const robot = new LockerRobot(lockerManager)
      const ticket = robot.deposit()
      expect(ticket.barCode.length).toBe(BAR_CODE_SIZE)
      expect(ticket.lockerIndex).toBe(0)
      expect(ticket.boxIndex).not.toBeNull()
    })
  })
  describe('fail', () => {
    test('should return null when deposite given an full locker', () => {
      const lockerSettings = []
      lockerSettings.push({ totalLockers: 1, lockerSize: 0 })
      const lockerManager = new LockerManager(lockerSettings)
      const robot = new LockerRobot(lockerManager)
      const ticket = robot.deposit()
      expect(ticket).toBe(false)
    })
  })
})

describe('test robot withdraw', () => {
  describe('success', () => {
    describe('should return true when withdraw given a valid bar code', () => {
      test('', () => {
        const lockerSettings = []
        lockerSettings.push({ totalLockers: 1, lockerSize: 1 })
        const lockerManager = new LockerManager(lockerSettings)
        const barCode = lockerManager.deposit(0)
        const robot = new LockerRobot(lockerManager)
        const result = robot.withdraw(barCode)
        expect(result).toBe(true)
      })
    })
  })
  describe('fail', () => {
    describe('should return false when withdraw given an invalid bar code', () => {
      test('', () => {
        const fakeTicket = {
          lockerIndex: 0,
          boxIndex: 0,
          barCode: '1234abdc',
        }

        const lockerSettings = []
        lockerSettings.push({ totalLockers: 1, lockerSize: 1 })
        const lockerManager = new LockerManager(lockerSettings)
        const robot = new LockerRobot(lockerManager)
        const result = robot.withdraw(fakeTicket)
        expect(result).toBe(false)
      })
    })
  })
})
