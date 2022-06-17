const productTab = document.querySelector('.product-tab')
const productTabButtonList = productTab.querySelectorAll('button')

const TOP_HEADER_DESKTOP = 80 + 50 + 54
const TOP_HEADER_MOBILE = 50 + 40 + 40

let currentActiveTab = productTab.querySelector('.is-active')
// 이슈 2. 문의 -> 상품정보로 이동할 때, 리뷰를 거쳐서 가는 경우 => disableUpdating로 설정
let disableUpdating = false

function toggleActiveTab() {
  const tabItem = this.parentNode

  if (currentActiveTab !== tabItem) {
    disableUpdating = true
    tabItem.classList.add('is-active')
    currentActiveTab.classList.remove('is-active')
    currentActiveTab = tabItem

    setTimeout(() => {
      disableUpdating = false
    }, 1000)
  }
}

function scrollToTabPanel() {
  const tabPanelId = this.parentNode.getAttribute('aria-labelledby')
  const tabPanel = document.querySelector(`#${tabPanelId}`)

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

const productTabPanelIdList = [
  'product-spec',
  'product-review',
  'product-inquiry',
  'product-shipment',
  'product-recommendation',
]
const productTabPanelList = productTabPanelIdList.map((panelId) => {
  const tabPanel = document.querySelector(`#${panelId}`)
  return tabPanel
})
const productTabPanelPositionMap = {}

function detectTabPanelPosition() {
  productTabPanelList.forEach((panel) => {
    const id = panel.getAttribute('id')
    const position = window.scrollY + panel.getBoundingClientRect().top
    productTabPanelPositionMap[id] = position
  })

  updateActiveTabOnScroll()
}

function updateActiveTabOnScroll() {
  // 이슈2: toggleActiveTab으로 이동 시에는 updateActiveTabOnScroll 함수가 작동되지 않게 설정하여 오류 해결
  if (disableUpdating) {
    return
  }

  const scrolledAmount =
    window.scrollY +
    (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP + 80 : TOP_HEADER_MOBILE + 8)

  let newActiveTab
  if (scrolledAmount >= productTabPanelPositionMap['product-recommendation']) {
    newActiveTab = productTabButtonList[4]
  } else if (scrolledAmount >= productTabPanelPositionMap['product-shipment']) {
    newActiveTab = productTabButtonList[3]
  } else if (scrolledAmount >= productTabPanelPositionMap['product-inquiry']) {
    newActiveTab = productTabButtonList[2]
  } else if (scrolledAmount >= productTabPanelPositionMap['product-review']) {
    newActiveTab = productTabButtonList[1]
  } else {
    newActiveTab = productTabButtonList[0]
  }

  // 이슈 3. 스크롤 할 공간이 없어서 추천 탭으로 가지 못하는 경우
  // => 끝까지 스크롤을 한 경우 newActiveTab = productTabButtonList[4]
  // => window.scrollY + window.innerHeight === body의 전체 height
  // 이슈 4. 태블릿에서 orderCta의 marginbottom 56px이 존재하여 body의 offsetHeight값에 56px이 포함되지 않는 버그 발생
  // => margin은 height값에 포함되지 않음.
  // => 태블릿과 데스크탑 분기 처리
  const bodyHeight =
    document.body.offsetHeight + (window.innerWidth < 1200 ? 56 : 0)
  if (window.scrollY + window.innerHeight === bodyHeight) {
    newActiveTab = productTabButtonList[4]
  }

  if (newActiveTab) {
    newActiveTab = newActiveTab.parentNode

    if (newActiveTab !== currentActiveTab) {
      newActiveTab.classList.add('is-active')
      if (currentActiveTab !== null) {
        currentActiveTab.classList.remove('is-active')
      }
      currentActiveTab = newActiveTab
    }
  }
}

window.addEventListener('load', detectTabPanelPosition)
// 이슈 1. 추천 탭에 있을 때, 새로고침하면 상품정보 탭으로 가있음 => resize 이벤트 설정
// resize와 scroll 은 cost가 비싼 이벤트이다. 많이 실행되는 이벤트
// => lodash cdn -> throttle 적용하여 성능 개선
window.addEventListener('resize', _.throttle(detectTabPanelPosition, 1000))
window.addEventListener('scroll', _.throttle(updateActiveTabOnScroll, 300))
