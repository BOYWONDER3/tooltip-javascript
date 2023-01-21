import addGlobalEventListener from "./utils/addGlobalEventListener"

const DEFAULT_SPACING = 5
const POSITION_ORDER = ['top', 'bottom', 'left', 'right']


const tooltipContainer = document.createElement('div')
tooltipContainer.classList.add('tooltip-container')
document.body.append(tooltipContainer)

// hover over a tooltip
addGlobalEventListener('mouseover', '[data-tooltip]', e => {
    const tooltip = createTooltipElement(e.target.dataset.tooltip)
    tooltipContainer.append(tooltip)
    positionTooltip(tooltip, e.target)

    // when mouse moves off the element remove the tooltip
    e.target.addEventListener('mouseleave', () =>{
        tooltip.remove()
    }, { once: true }) 
})

// show tooltip over the top of the element
function createTooltipElement(text) {
    const tooltip = document.createElement('div')
    tooltip.classList.add('tooltip')
    tooltip.innerText = text
    return tooltip
}

// over the top of the element
function positionTooltip(tooltip, element)  {
    const elementRect = element.getBoundingClientRect()
    const spacing = parseInt(element.dataset.spacing) || DEFAULT_SPACING

    positionToolTipPoint(tooltip, elementRect, spacing)
}

function positionToolTipPoint(tooltip, elementRect, spacing) {

    const tooltipRect = tooltip.getBoundingClientRect()
    
    tooltip.style.top = `${elementRect.top - tooltipRect.height - spacing}px`
    tooltip.style.left = `${elementRect.left + elementRect.width / 2 - 
    tooltipRect.width / 2}px`

    const bounds = isOutOfBounds(tooltip, spacing)

    if(bounds.top) {
        resetTooltipPosition(tooltip)
    }
    if (bounds.right) {
        tooltip.style.right = `${spacing}px`
        tooltip.style.left = 'initial'
    }
    if (bounds.left) {
        tooltip.style.left = `${spacing}px`
    }

}

function isOutOfBounds (element, spacing) {
    const rect = element.getBoundingClientRect()
    const containerRect = tooltipContainer.getBoundingClientRect()

    return {
        left: rect.left <= containerRect.left + spacing,
        right: rect.right >= containerRect.right - spacing,
        top: rect.top <= containerRect.top + spacing,
        bottom: rect.bottom >= containerRect.bottom - spacing,
    }
}


function resetTooltipPosition(tooltip) {
    tooltip.style.left = 'initial'
    tooltip.style.right = 'initial'
    tooltip.style.top = 'initial'
    tooltip.style.bottom = 'initial'
}