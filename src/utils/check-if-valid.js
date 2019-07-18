export const isNumber = num => Number.isInteger(parseInt(num))

export const allLetters = value => value.match(/^[A-Za-z]+$/) ? true : false
