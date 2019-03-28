// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {

  //Load localStorage
  document.addEventListener('DOMContentLoaded',loadtasks);

  // Add task event
  form.addEventListener('submit', addTask);

  //Remove a task
  taskList.addEventListener('click', removeTask);

  //Clear tasks
  clearBtn.addEventListener('click', clearTasks);

  //Filter tasks
  filter.addEventListener('keyup', filterTasks);
}


function loadtasks(){
  let tasks;

  if(localStorage.getItem("tasks")==null)
  {
    tasks = []
  }
  else
    tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach(function(task){
      // Create li element
    const li = document.createElement('li');
    // Add class
     li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

  })

}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
    e.preventDefault();
    return;
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
   li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  //Store to local storage
  storeInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

function storeInLocalStorage(task)
{
  let tasks;

  if(localStorage.getItem("tasks")===null)
  {
    tasks = [];
  }
  else
    tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.push(task);

  localStorage.setItem('tasks',JSON.stringify(tasks));
}



function removeTask(e) {
  if(e.target.parentElement.classList.contains("delete-item"))
  {
    if(confirm("remove task ?"))
    {
      e.target.parentElement.parentElement.remove();
      let txt = e.target.parentElement.parentElement.textContent;
      removeFromStorage(txt);
      //console.log(txt)
    }
  }
}

function removeFromStorage(txt)
{
   let tasks;

      if(localStorage.getItem("tasks")===null)
      {
        tasks = [];
      }
      else
        tasks = JSON.parse(localStorage.getItem('tasks'));

      tasks.forEach(function(task,index){
        if(task===txt)
        {
          tasks.splice(index,1);
        }
      });

      localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTasks(e) {
  while(taskList.firstChild != null)
  {
    taskList.firstChild.remove();
  }

  localStorage.removeItem("tasks");
}


function filterTasks(e)
{
  const txt = e.target.value.toLowerCase();
  //console.log(txt);
  var tasks = document.querySelectorAll(".collection-item")

  tasks.forEach(function(task){
    var tcontent = task.firstChild.textContent.toLowerCase();
    if(tcontent.indexOf(txt)!=-1)
    {
      task.style.display = "block";
    }
    else
    {
      task.style.display = "none";
    }
  });
}



