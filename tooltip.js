import addGlobalEventListener from "./utils/addGlobalEventListener";

const tooltipContainer = document.createElement('div')
tooltipContainer.classList.add('tooltip-container')
document.body.append(tooltipContainer)

// hover over a tooltip
addGlobalEventListener('mouseover', '[data-tooltip]', e =>{
    const tooltip = createTooltipElement(e.target.dataset.tooltip)
    positionTooltip(tooltip, e.target)
    tooltipContainer.append(tooltip)

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
    const rect = element.getBoundingClientRect(element)
}