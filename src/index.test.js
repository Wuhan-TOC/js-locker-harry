const toInch = require('./index')

test('should be 36 when convert 1 yard to inch', () => {
  const inches = toInch(1, 'yard')
  expect(inches).toBe(36)
})
