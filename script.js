const listsContainer = document.querySelector('[data-lists')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title')
const listCountElement = document.querySelector('[data-list-count')
const taskContainer = document.querySelector('[data-tasks]')

// store information to user's browser

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId
        saveAndRender()
    }
})


deleteListButton.addEventListener('click', e => {
    // to delete, set our list to a new list with specified parameters (give me all the lists that are not the one we have selected)
    lists = lists.filter(list => list.id !== selectedListId ) // as long as list.id does not equal seletedlistId
    selectedListId = null // set it to null because we no longer have a selectedlist 
    saveAndRender()
})

newListForm.addEventListener('submit', e => {
    e.preventDefault() // stop page from refreshing on enter
    const listName = newListInput.value 
    if (listName == null || listName === '') return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndRender()
})

// this function will return an object
function createList(name) {
return  {id: Date.now().toString(), // this makes the ID unique
     name: name,
     tasks: []
    }
}

function saveAndRender(){
    save()
    render()
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

// create a function that renders list 

function render() {
    clearElement(listsContainer)
    renderLists()
    
    if (selectedListId == null) {
        listDisplayContainer.style.display = 'none' // if we dont have any selected lists, display nothing
    } else {

    }
}

function renderLists() {

    lists.forEach(list => {
        const listElement = document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add('list-name')
        listElement.innerText = list.name
        if (list.id === selectedListId) {
        listElement.classList.add('active-list')
        }
        listsContainer.appendChild(listElement)
    })
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render()