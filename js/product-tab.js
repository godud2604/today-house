const productTab = document.querySelector('.product-tab')
const productTabButtonList = productTab.querySelectorAll('button')
const productSpec = document.querySelector(
  '#product-spec .product-section-content'
)
const productReview = document.querySelector(
  '#product-review .product-section-content'
)
const productInquiry = document.querySelector(
  '#product-inquiry .product-section-content'
)
const productShipment = document.querySelector(
  '#product-shipment .product-section-content'
)
const productRecommendation = document.querySelector(
  '#product-recommendation .product-section-content'
)
const TOP_HEADER_DESKTOP = 80 + 50 + 54
const TOP_HEADER_MOBILE = 50 + 40 + 40

function toggleActiveTab(e) {
  let currentActiveTab = productTab.querySelector('.is-active')
  const tabItem = this.parentNode

  if (currentActiveTab) {
    if (currentActiveTab !== tabItem) {
      tabItem.classList.add('is-active')
      currentActiveTab.classList.remove('is-active')
      currentActiveTab = tabItem
    }
  } else {
    tabItem.classList.add('is-active')
  }
}

function scrollToTabPanel(e) {
  const tabPanelId = this.parentNode.getAttribute('aria-labelledby')
  const tabPanel = document.querySelector(`#${tabPanelId}`) // #product-review

  const scrollAmount =
    tabPanel.getBoundingClientRect().top -
    (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HEADER_MOBILE)

  window.scrollBy({
    top: scrollAmount,
    behavior: 'smooth',
  })
}

productTabButtonList.forEach((button) => {
  button.addEventListener('click', toggleActiveTab)
  button.addEventListener('click', scrollToTabPanel)
})
