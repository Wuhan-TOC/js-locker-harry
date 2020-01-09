import { LockerManager, LockerRobot } from './index.js'

const BAR_CODE_SIZE = 8

describe('test human deposit', () => {
  describe('success', () => {
    test('should return valid bar code when deposite given an available locker', () => {
      const lockerManager = new LockerManager(2, 2)
      const ticket = lockerManager.deposit(1)
      expect(ticket.barCode.length).toBe(BAR_CODE_SIZE)
      expect(ticket.lockerIndex).toBe(1)
      expect(ticket.boxIndex).not.toBeNull()
    })
  })
  describe('fail', () => {
    test('should return null when deposite given an full locker', () => {
      const lockerManager = new LockerManager(1, 0)
      const ticket = lockerManager.deposit(0)
      expect(ticket).toBeUndefined()
    })
  })
})

describe('test robot deposit', () => {
  describe('success', () => {
    test('should return a valid bar code when robot deposite given an available locker', () => {
      const lockerManager = new LockerManager(2, 3)
      const robot = new LockerRobot(lockerManager)
      const ticket = robot.deposit()
      expect(ticket.barCode.length).toBe(BAR_CODE_SIZE)
      expect(ticket.lockerIndex).toBe(0)
      expect(ticket.boxIndex).not.toBeNull()
    })
  })
  describe('fail', () => {
    test('should return null when deposite given an full locker', () => {
      const lockerManager = new LockerManager(1, 0)
      const robot = new LockerRobot(lockerManager)
      const ticket = robot.deposit()
      expect(ticket).toBe(false)
    })
  })
})

describe('test human withdraw', () => {
  describe('success', () => {
    test('should return true when withdraw given a valid bar code', () => {
      const lockerManager = new LockerManager(1, 1)
      const ticket = lockerManager.deposit(0)
      const result = lockerManager.withdraw(ticket)
      expect(result).toBe(true)
    })
  })
  describe('fail', () => {
    test('should return false when withdraw given an invalid bar code', () => {
      const fakeTicket = {
        lockerIndex: 0,
        boxIndex: 0,
        barCode: '1234abdc',
      }
      const lockerManager = new LockerManager(1, 1)
      const result = lockerManager.withdraw(fakeTicket)
      expect(result).toBe(false)
    })
  })
})

describe('test robot withdraw', () => {
  describe('success', () => {
    describe('should return true when withdraw given a valid bar code', () => {
      test('', () => {
        const lockerManager = new LockerManager(1, 1)
        const barCode = lockerManager.deposit(0)
        const robot = new LockerRobot(lockerManager)
        const result = robot.withdraw(barCode)
        expect(result).toBe(true)
      })
    })
  })
  describe('success', () => {
    describe('should return false when withdraw given an invalid bar code', () => {
      test('', () => {
        const fakeTicket = {
          lockerIndex: 0,
          boxIndex: 0,
          barCode: '1234abdc',
        }
        const lockerManager = new LockerManager(1, 1)
        const robot = new LockerRobot(lockerManager)
        const result = robot.withdraw(fakeTicket)
        expect(result).toBe(false)
      })
    })
  })
})
