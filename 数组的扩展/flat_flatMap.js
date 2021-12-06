
const flat = (arr, cj = 1) => {
  if (!Array.isArray(arr)) return
  let result = []
  arr.forEach(item => {
    if (!Array.isArray(item) || cj < 1) {
      result.push(item)
    } 
    else {
      if (cj > 0) {
        result = result.concat(flat(item, cj - 1))
      }
    }
  })
  return result
}

const flatMap = (arr, fn) => {
  if (!Array.isArray(arr)) return
  let result = []
  return result = arr.map(fn).flat()
}

console.log(flat([1, 2, 3, [4, [5, [6]]]]))
console.log(flat([1, 2, 3, [4, [5, [6]]]], 2))
console.log(flat([1, 2, 3, [4, [5, [6]]]], Infinity))
console.log(flatMap([1, 2, 3], (item) => [[item, item * 2]]))