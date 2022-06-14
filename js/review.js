const reviewCardButtonList = document.querySelectorAll(
  '.review-card-footer button'
)

const HELPFUL = '도움됨'
const NOT_HELPFUL = '도움이 돼요'

function toggleReviewLikeButton() {
  const isLiked = this.classList.contains('btn-primary')
  const textElement = this.nextElementSibling
  const reviewCardFooter = this.parentNode

  if (isLiked) {
    this.innerHTML = NOT_HELPFUL
  } else {
    const checkIcon = document.createElement('i')
    checkIcon.classList.add('ic-check')
    checkIcon.setAttribute('aria-hidden', true)
    this.innerHTML = HELPFUL
    this.prepend(checkIcon)
  }

  if (textElement) {
    const countSpan = textElement.querySelector('span')
    const count = Number(countSpan.innerHTML.replaceAll(',', ''))

    let newCount = count
    if (isLiked) {
      newCount--

      if (newCount === 0) {
        reviewCardFooter.removeChild(textElement)
      } else {
        countSpan.innerHTML = newCount.toLocaleString()
      }
    } else {
      newCount++
      countSpan.innerHTML = newCount.toLocaleString()
    }
  } else {
    if (!isLiked) {
      const newTextElement = document.createElement('p')
      newTextElement.innerHTML = `<strong><span>1</span>명</strong>에게 도움이 되었습니다.`
      reviewCardFooter.appendChild(newTextElement)
    }
  }

  this.classList.toggle('btn-primary')
  this.classList.toggle('btn-outlined')
}

reviewCardButtonList.forEach((button) => {
  button.addEventListener('click', toggleReviewLikeButton)
})
