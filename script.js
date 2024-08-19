const towers = document.querySelectorAll('.tower')
let towerContent = [[], [], []]
let size = 3
let discs
const colors = ['red','green','blue']

const startWidth = 90
let currTower
let ogTower

const buildTowers = (towers) => {
  towers.forEach(tower => {
    const stick = document.createElement('div')
    stick.className = 'stick'
    const plate = document.createElement('div')
    plate.className = 'plate'
    tower.innerHTML = ''
    tower.appendChild(stick)
    tower.appendChild(plate)
  })
}

start()

function start() {
  towerContent = [[], [], []]

  buildTowers(towers)

  for (let i = 0; i < size; i++) {
    let tower = document.createElement('div')
    tower.classList.add('disc')
    tower.draggable = true
    tower.style.backgroundColor = colors[i]
    tower.style.width = (startWidth - 15 * i) + 'px'
    towerContent[0].push(tower)
  }

  towerContent[0].forEach(t => {
    towers[0].innerHTML = t.outerHTML + towers[0].innerHTML
  })

  for (let i = 0; i < towers.length; i++) {
    towers[i].classList.add('t' + i)
    towers[i].addEventListener('dragenter', dragenter)
    towers[i].addEventListener('dragover', dragover)
  }
  discs = document.querySelectorAll('.disc')

  discs.forEach(disc => {
    disc.addEventListener('dragstart', dragstart)
    disc.addEventListener('dragend', dragend)
  })
}

function dragenter() {
  if (!ogTower) {
    ogTower = this
  }
}

function dragover() {
  currTower = this
}

function dragstart() {
  this.classList.add('is-dragging')
}

function dragend() {
  let ogTowerIndex = ogTower.classList[1][1]
  let currTowerIndex = currTower.classList[1][1]
  this.classList.remove('is-dragging')

  moveTower(ogTowerIndex, currTowerIndex, this)

  ogTower = undefined
  ogTowerIndex = undefined
  if (towerContent[2].length === 3){
    alert("Win")
  }
}

function moveTower(ogTowerIndex, currTowerIndex, disc) {
  if (isDroppable(ogTowerIndex, currTowerIndex, disc)) {
    towerContent[currTowerIndex].push(towerContent[ogTowerIndex].pop())
    ogTower.removeChild(disc)
    currTower.prepend(disc)
  }
}

function isDroppable(ogTowerIndex, currTowerIndex, disc) {
  let top = isOnTop(ogTowerIndex, disc)
  let topDiscIsLess = isDiscLessThan(currTowerIndex, disc)

  return top && topDiscIsLess
}

function isOnTop(ogTowerIndex, disc) {
  let size = towerContent[ogTowerIndex].length
  return disc.style.width === towerContent[ogTowerIndex][size - 1].style.width
}

function isDiscLessThan(currTowerIndex, disc) {
  let size = towerContent[currTowerIndex].length

  if (!towerContent[currTowerIndex][size - 1]) {
    return true
  } else {
    let sizeTop = disc.style.width.substring(0, disc.style.width.indexOf('p'))
    let sizeBottom = towerContent[currTowerIndex][size - 1].style.width.substring(0, towerContent[currTowerIndex][size - 1].style.width.indexOf('p'))

    return Number(sizeTop) < Number(sizeBottom)
  }
}

function moveTopDisc(ogTowerIndex, destinyTowerIndex) {
  ogTower = towers[ogTowerIndex]
  currTower = towers[destinyTowerIndex]
  let disc = getTopDisc(ogTowerIndex)
  moveTower(ogTowerIndex, destinyTowerIndex, disc)
}

function getTopDisc(towerIndex) {
  let size = towerContent[towerIndex].length

  let sizeDisc = towerContent[towerIndex][size - 1].style.width
  let indexDisc = -1
  discs.forEach((el, index) => {
    if (el.style.width === sizeDisc) {
      indexDisc = index
    }
  })
  return discs[indexDisc]
}

function win(towers){
  let lastTower_length = towers[-1].length;
  if(lastTower_length === 3){
    alert("Win")
  }
}