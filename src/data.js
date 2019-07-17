const data = {
  day: '05',
  amount: 100,
  month: '07',
  type: "variable",
  category: "food"
};

const variable = 
  {
    "07": {
      "04": {
        food: [99, 33],
        hair: [350]
      },
      "05": {
        food: [199, 333],
        hair: [350]
      },
      "08": {
        food: [99, 33]
      }
    }
  }


const { month, day, category, amount } = data;

function get(d, index) {
  return d[index]
}

const m = get(variable, month)
const d = get(m, day)
const c = [ ...get(d, category), amount ]
const v = {
  ...m,
  [day]: {
    ...d,
    [category]: c
  }
}

console.clear()
console.log(m)
console.log(c)
console.log(v)