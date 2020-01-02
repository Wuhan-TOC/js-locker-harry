import { LockerManager } from './index.js'

const LOCK_SIZE = 24
const BAR_CODE_SIZE = 8

describe('test deposit', () => {
  test('should return bar code when deposite given an available locker', () => {
    const lockerManager = new LockerManager(LOCK_SIZE)
    const barCode = lockerManager.deposit()
    expect(barCode.currentCode.length).toBe(BAR_CODE_SIZE)
  })
  test('should return null when deposite given an full locker', () => {
    const lockerManager = new LockerManager()
    const barCode = lockerManager.deposit()
    expect(barCode).toBeUndefined()
  })
})

describe('test withdraw', () => {
  test('should return true when withdraw given a valid bar code', () => {
    const lockerManager = new LockerManager(LOCK_SIZE)
    const barCode = lockerManager.deposit()
    const result = lockerManager.withdraw(barCode)
    expect(result).toBe(true)
  })
  test('should return false when withdraw given an invalid bar code', () => {
    const lockerManager = new LockerManager()
    const result = lockerManager.withdraw({})
    expect(result).toBe(false)
  })
})
