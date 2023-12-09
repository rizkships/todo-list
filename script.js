const listsContainer = document.querySelector('[data-lists')

// create a variable to hold all our lists 
let lists = []

// create a function that renders list 

function render() {
    clearElement(listsContainer)
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.classList.add('list-name')
        listElement.innerText = list
        listsContainer.appendChild(listElement)
    })
}

function clearElement(element) {

}

render()