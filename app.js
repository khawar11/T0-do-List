//Define UI vars     
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listners
loadEventListeners();

// Load all event listners
function loadEventListeners() {
    //Load DOM Event 
    document.addEventListener('DOMContentLoaded', getTasks)
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener("click", removeTask);
    //clear task event 
    clearBtn.addEventListener('click', clearTasks);
    //Filter task event 
    filter.addEventListener('keyup', filterTasks);
}


// Get Tasks from LS 
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function (task) {
        //crate li element 
        const li = document.createElement("li")
        //Add class
        li.className = "collection-item";
        //create text node and append to li 
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement("a")
        // Add class
        link.className = "delete-item secondary-content"
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link)
        //Append li to ul
        taskList.appendChild(li);
    });
}

function addTask(e) {
    if (taskInput.value === '') {
        alert("Add a Task")
    }
    //crate li element 
    const li = document.createElement("li")
    //Add class
    li.className = "collection-item";
    //create text node and append to li 
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement("a")
    // Add class
    link.className = "delete-item secondary-content"
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link)
    //Append li to ul
    taskList.appendChild(li);


    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';

    e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks))
}


// remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from LS 
            removeTaskFromLocalStorage(
                e.target.parentElement.parentElement);

        }
    }
}


//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
        tasks.splice(index, 1)
    }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTaskFromLocalStorage()
}

//clear task from LS
function clearTaskFromLocalStorage(){
    localStorage.clear();
}

// filter tasks 
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
        (function (Task) {
            const item = Task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block'

            } else {
                task.style.display = 'none'
            }
        });
}