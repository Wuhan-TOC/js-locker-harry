const YARD_TO_INCH_RATIO = 36

function toInch(qty, unit) {
  if (unit === 'yard') {
    return qty * YARD_TO_INCH_RATIO
  }
  return -1
}

module.exports = toInch
