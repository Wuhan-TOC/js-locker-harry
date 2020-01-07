import { LockerManager } from './index.js'

const BAR_CODE_SIZE = 8

describe('test human deposit', () => {
  describe('success', () => {
    test('should return valid bar code when deposite given an available locker', () => {
      const lockerManager = new LockerManager(2, 2)
      const ticket = lockerManager.humanDeposit(1)
      expect(ticket.barCode.length).toBe(BAR_CODE_SIZE)
      expect(ticket.lockerIndex).toBe(1)
      expect(ticket.boxIndex).not.toBeNull()
    })
  })
  describe('fail', () => {
    test('should return null when deposite given an full locker', () => {
      const lockerManager = new LockerManager(1, 0)
      const ticket = lockerManager.humanDeposit(0)
      expect(ticket).toBeUndefined()
    })
  })
})

describe('test withdraw', () => {
  describe('success', () => {
    test('should return true when withdraw given a valid bar code', () => {
      const lockerManager = new LockerManager(1, 1)
      const ticket = lockerManager.humanDeposit(0)
      const result = lockerManager.withdraw(ticket)
      expect(result).toBe(true)
    })
  })
  describe('fail', () => {
    test('should return false when withdraw given an invalid bar code', () => {
      const lockerManager = new LockerManager(1, 1)
      const fakeTicket = {
        lockerIndex: 0,
        boxIndex: 0,
        barCode: '1234abdc',
      }
      const result = lockerManager.withdraw(fakeTicket)
      expect(result).toBe(false)
    })
  })
})

describe('test robot deposit', () => {
  describe('success', () => {
    test('should return a valid bar code when robot deposite given an available locker', () => {
      const lockerManager = new LockerManager(2, 3)
      const ticket = lockerManager.robotDeposit()
      expect(ticket.barCode.length).toBe(BAR_CODE_SIZE)
      expect(ticket.lockerIndex).toBe(0)
      expect(ticket.boxIndex).not.toBeNull()
    })
  })
  describe('fail', () => {
    test('should return null when deposite given an full locker', () => {
      const lockerManager = new LockerManager(1, 0)
      const ticket = lockerManager.robotDeposit()
      expect(ticket).toBeUndefined()
    })
  })
})

// describe('test robot withdraw', () => {
//   describe('success', () => {
//     describe('should return true when withdraw given a valid bar code', () => {
//       test('', () => {
//         const lockerManager = new LockerManager(LOCK_SIZE)
//         const barCode = lockerManager.deposit()
//         const result = lockerManager.withdraw(barCode)
//         expect(result).toBe(true)
//       })
//     })
//   })
//   describe('success', () => {
//     describe('should return false when withdraw given an invalid bar code', () => {
//       test('', () => {
//         const lockerManager = new LockerManager()
//         const result = lockerManager.withdraw({})
//         expect(result).toBe(false)
//       })
//     })
//   })
// })
