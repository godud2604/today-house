const gnbSearch = document.querySelector('.gnb-search')
const gnbSearchInput = gnbSearch.querySelector('input')
const gnbSearchHistory = document.querySelector('.search-history')
const gnbSearchHistoryList = gnbSearchHistory.querySelector('ol')

const deleteAllButton = gnbSearchHistory.querySelector(
  '.search-history-header button'
)

function closeGnbSearchHistoryOnClickingOutside(e) {
  if (!gnbSearch.contains(e.target)) {
    gnbSearchHistory.classList.remove('is-active')
    window.removeEventListener('click', closeGnbSearchHistoryOnClickingOutside)
  }
}

function openSearchHistory() {
  if (gnbSearchHistoryList.children.length === 0) return
  if (!gnbSearchHistory.classList.contains('is-active')) {
    window.addEventListener('click', closeGnbSearchHistoryOnClickingOutside)
  }
  gnbSearchHistory.classList.add('is-active')
}

gnbSearchInput.addEventListener('focus', openSearchHistory)

function deleteAllSearchHistoryItems() {
  gnbSearchHistoryList.innerHTML = ''
  gnbSearchHistory.classList.remove('is-active')
}

deleteAllButton.addEventListener('click', deleteAllSearchHistoryItems)