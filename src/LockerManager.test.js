import { LockerManager } from './index.js'

const BAR_CODE_SIZE = 8

describe('test human deposit', () => {
  describe('success', () => {
    test('should return valid bar code when deposite given an available locker', () => {
      const lockerSettings = []
      lockerSettings.push({ totalLockers: 2, lockerSize: 2 })
      const lockerManager = new LockerManager(lockerSettings)
      const ticket = lockerManager.deposit(1)
      expect(ticket.barCode.length).toBe(BAR_CODE_SIZE)
      expect(ticket.lockerIndex).toBe(1)
      expect(ticket.boxIndex).not.toBeNull()
    })
  })
  describe('fail', () => {
    test('should return null when deposite given an full locker', () => {
      const lockerSettings = []
      lockerSettings.push({ totalLockers: 2, lockerSize: 0 })
      const lockerManager = new LockerManager(lockerSettings)
      const ticket = lockerManager.deposit(0)
      expect(ticket).toBeUndefined()
    })
  })
})

describe('test human withdraw', () => {
  describe('success', () => {
    test('should return true when withdraw given a valid bar code', () => {
      const lockerSettings = []
      lockerSettings.push({ totalLockers: 1, lockerSize: 1 })
      const lockerManager = new LockerManager(lockerSettings)
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
      const lockerSettings = []
      lockerSettings.push({ totalLockers: 1, lockerSize: 1 })
      const lockerManager = new LockerManager(lockerSettings)
      const result = lockerManager.withdraw(fakeTicket)
      expect(result).toBe(false)
    })
  })
})
