const searchModal = document.querySelector('.search-modal')
const overlay = document.querySelector('.overlay')
const searchButton = document.querySelector('.gnb-icon-button.is-search')
const searchModalCloseButton = searchModal.querySelector(
  '.search-modal-form .btn-ghost'
)

function openSearchModal() {
  searchModal.classList.add('is-active')
  overlay.classList.add('is-active')
}

function closeSearchModal() {
  searchModal.classList.remove('is-active')
  overlay.classList.remove('is-active')
}

searchButton.addEventListener('click', openSearchModal)

searchModalCloseButton.addEventListener('click', closeSearchModal)
