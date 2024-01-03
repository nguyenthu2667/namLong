const set30 = () => {
  const arr = []
  for (let i = 1; i < 31; i++) {
    arr.push(i)
  }
  return arr
}

const set7 = () => {
  const arr = []
  for (let i = 1; i < 8; i++) {
    arr.push(i)
  }
  return arr
}

const random30 = () => {
  const arr = []
  for (let i = 0; i < 7; i++) {
    arr.push(Math.floor((Math.random() * 100) + 1))
  }
  return arr
}

const randomFourNumber = () => {
  const max = 100;
  const r1 = randombetween(1, max - 3);
  const r2 = randombetween(1, max - 2 - r1);
  const r3 = randombetween(1, max - 1 - r1 - r2);
  const r4 = max - r1 - r2 - r3;
  return [r1, r2, r3, r4]

  function randombetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

const randomArr = () => {
  const arr = []
  for(let i = 0; i < 7; i++) {
    arr.push(randomFourNumber())
  }
  return arr
}

const chayHamRandomArr = randomArr()
console.log(chayHamRandomArr);

const getAllIndex = (indexGet) => {
  const arr = []
  for(let i = 0; i < 7; i++) {
    arr.push(chayHamRandomArr[i][indexGet])
  }
  return arr
}

//////
const randomThreeNumber = () => {
  const max = randombetween(10, 50);
  const r1 = randombetween(1, max - 3);
  const r2 = randombetween(1, max - 2 - r1);
  const r3 = max - r1 - r2
  return {sum: max, data: [r1, r2, r3]}

  function randombetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
const randomArr2 = () => {
  const arr = []
  for(let i = 0; i < 7; i++) {
    const obj = randomThreeNumber()
    arr.push([obj.sum, ...obj.data])
  }
  return arr
}
const chayHamRandomArr2 = randomArr2()
console.log(chayHamRandomArr2);

const getAllIndex2 = (indexGet) => {
  const arr = []
  for(let i = 0; i < 7; i++) {
    arr.push(chayHamRandomArr2[i][indexGet])
  }
  return arr
}

// const labelArr = set30()
const labelArr = set7()

const dataVehicle = [
  {
    label: 'Xe đang hoạt động',
    // data: random30(),
    data: getAllIndex(0),
  },
  {
    label: 'Xe có đơn hàng',
    // data: random30(),
    data: getAllIndex(1),
  },
  {
    label: 'Xe không hoạt động',
    // data: random30(),
    data: getAllIndex(2),
  },
  {
    label: 'Xe trống',
    // data: random30(),
    data: getAllIndex(3),
  },
]

const dataShipping = [
  {
    label: 'Tổng',
    // data: random30(),
    data: getAllIndex2(0),
  },
  {
    label: 'Hàng rời',
    // data: random30(),
    data: getAllIndex2(1),
  },
  {
    label: 'Cont nhập',
    // data: random30(),
    data: getAllIndex2(2),
  },
  {
    label: 'Cont xuất',
    // data: random30(),
    data: getAllIndex2(3),
  },
]


export default {
  labelArr,
  dataVehicle,
  dataShipping,
}