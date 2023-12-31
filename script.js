const listsContainer = document.querySelector('[data-lists')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title')
const listCountElement = document.querySelector('[data-list-count')
const taskContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]')

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

tasksContainer.addEventListener('click', e => {
    // if it equals to input, that means we clicked on the checkbox
    if (e.target.tagName.toLowerCase() === 'input') {
     const selectedList = lists.find(list => list.id === selectedListId)
     const selectedTask = selectedList.tasks.find(task => task.id ===
        e.target.id) // e.target.id is the checkbox id and in our renderTasks function we set the checkbox.id to the task.id
        selectedTask.complete = e.target.checked  // this works whether we check it or not because it will give true/false value 
        save()
        renderTaskCount(selectedList)
    }
})

clearCompleteTasksButton.addEventListener('click', e => {
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
    saveAndRender()
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

newTaskForm.addEventListener('submit', e => {
    e.preventDefault() // stop page from refreshing on enter
    const taskName = newTaskInput.value 
    if (taskName == null || taskName === '') return
    const task = createTask(taskName)
    newTaskInput.value = null
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks.push(task)
    saveAndRender()
})

// this function will return an object
function createList(name) {
return  {id: Date.now().toString(), // this makes the ID unique
     name: name,
     tasks: []
    }
}

function createTask(name) {
    return  {id: Date.now().toString(), // this makes the ID unique
         name: name,
         complete: false
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
    const selectedList = lists.find(list => list.id === selectedListId) // find the list that has id of our selected list 
    if (selectedListId == null) {
        listDisplayContainer.style.display = 'none' // if we dont have any selected lists, display nothing
    } else {
        listDisplayContainer.style.display = ''
        listTitleElement.innerText = selectedList.name
        renderTaskCount(selectedList)
        clearElement(tasksContainer)
        renderTasks(selectedList)

    }
}

function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.complete
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.name)
        tasksContainer.appendChild(taskElement)

    })
}

function renderTaskCount(selectedList) {
    const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length // get count of all tasks that are not complete
    const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
    listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
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