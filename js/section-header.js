const sectionHeaderButton = document.querySelector(
  '.product-shipment .product-section-header.sm-only .icon-button'
)

function showFullSection() {
  const section = this.parentNode.parentNode
  section.classList.add('is-open')
}

sectionHeaderButton.addEventListener('click', showFullSection)
