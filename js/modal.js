import { choiceDone } from './script.js'

function setChoices(allUpgrades) {
    const choices = document.querySelectorAll('.choice')

    choices.forEach(choice => {
        choice.innerHTML = allUpgrades[0].name
    })

    displayModal()
}

function displayModal() {
    const modalBackground = document.querySelector('.modal-background')

    modalBackground.style.display = 'block'

    const choices = document.querySelectorAll('.choice')

    choices.forEach(choice => {
        choice.addEventListener('click', clickChoice)
    })
}

function clickChoice(event) {
    closeModal()

    if (event.target.classList.contains('choice-1')) {
        choiceDone(1)
    } else if (event.target.classList.contains('choice-2')) {
        choiceDone(2)
    } else if (event.target.classList.contains('choice-3')) {
        choiceDone(3)
    }    
}

function closeModal() {
    const modalBackground = document.querySelector('.modal-background')

    modalBackground.style.display = 'none'

    const choices = document.querySelectorAll('.choice')

    choices.forEach((choice , index) => {
        choice.removeEventListener('click', clickChoice, true)
    })
}

export  { setChoices }