const myMenu = document.querySelector('.my-menu')
const myMenuButton = document.querySelector('.my-menu-button')
const myMenuContent = document.querySelector('.my-menu-content')

function closeMyMenuOnClickingOutside(e) {
  console.log('window')
  if (!myMenu.contains(e.target)) {
    myMenu.classList.remove('is-active')
    window.removeEventListener('click', closeMyMenuOnClickingOutside)
  }
}

function toggleMyMenu() {
  if (!myMenu.classList.contains('is-active')) {
    // 앞으로 내가 활성화를 시키겠다!
    window.addEventListener('click', closeMyMenuOnClickingOutside)
  }
  myMenu.classList.toggle('is-active')
}

myMenuButton.addEventListener('click', toggleMyMenu)
