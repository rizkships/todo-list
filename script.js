const listsContainer = document.querySelector('[data-lists')

// create a variable to hold all our lists 
// we want an active-list class on whichever list is selected
// we need to use id's and objects to do that
let lists = [{
   id: 1,
   name: 'name'
    }, {
   id: 2,
   name: 'todo'
         }]

// create a function that renders list 

function render() {
    clearElement(listsContainer)
    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add('list-name')
        listElement.innerText = list.name
        listsContainer.appendChild(listElement)
    })
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render()