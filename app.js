// let todos = [];
let filterValues = "all";

const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todoList");
const todoSelect = document.querySelector(".todo-select");



todoForm.addEventListener("submit",addNewTodo);
todoSelect.addEventListener("change",(e) => {
    filterValues = e.target.value;
    selectedTodos();
})


document.addEventListener("DOMContentLoaded",() => {
    const todos = getAllTodos();
    createTodo(todos);
})



function addNewTodo(e){

e.preventDefault();

if(!todoInput.value) return;

const newTodo = {
    id : Date.now(),
    createAt : new Date().toISOString(),
    tittle : todoInput.value,
    isCompleted : false
}

saveTodo(newTodo)
selectedTodos();

}


function createTodo(todos){

    let result = "";

    todos.forEach(todo => {
        
        result+=`<li class="todo">
        <table class="todo__table">

            <tr class="todo__tr">
                <td>
                    <p class="todo__tittle ${todo.isCompleted ? 'completed' : ''}"> ${todo.tittle} </p>
                </td>
                <td>
                    <span class="todo__createAt"> ${new Date(todo.createAt).toLocaleDateString("en-CA")} </span>
                </td>
                <td>
                    <button class="todo__remove" data-todo-id=${todo.id}>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                          
                    </button>
                    <button class="todo__check" data-todo-id=${todo.id}>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                          </svg>
                          
                    </button>
                </td>
            </tr>
            
        </table>
    </li>`
    });

    todoList.innerHTML = result;
    todoInput.value = "";
    const removeBtns = document.querySelectorAll(".todo__remove");
    const checkBtns = document.querySelectorAll(".todo__check");

    removeBtns.forEach(btn => btn.addEventListener("click",removeTodo));
    checkBtns.forEach(btn => btn.addEventListener("click",checkTodo));
}


function removeTodo(e){
    let todos = getAllTodos();
    const todoID = Number(e.target.dataset.todoId);
    todos = todos.filter(todo => todo.id!==todoID);
    saveAllTodos(todos);
    selectedTodos();
}

function checkTodo(e){
    let todos = getAllTodos();
    const todoID = Number(e.target.dataset.todoId);
    const todo = todos.find(todo => todo.id===todoID);
    todo.isCompleted=!todo.isCompleted;
    saveAllTodos(todos);
    selectedTodos();
}


function selectedTodos(){
    const todos = getAllTodos();
    switch(filterValues){
        case "all" : {
            createTodo(todos);
            break;
        }
        case "completed" : {
            const filteredTodos = todos.filter(todo => todo.isCompleted);
            createTodo(filteredTodos);
            break;
        }
        case "uncompleted" : {
            const filteredTodos = todos.filter(todo => !todo.isCompleted);
            createTodo(filteredTodos);
            break;
        }
        default : 
          createTodo(todos);
    }
}


function getAllTodos(){
    const savedTodo = JSON.parse(localStorage.getItem("todos")) || [];
    return savedTodo;
}


function saveTodo(todo){
    const savedTodo = getAllTodos();
    savedTodo.push(todo);
    localStorage.setItem("todos",JSON.stringify(savedTodo));
    return savedTodo;
}

function saveAllTodos(todos){
    localStorage.setItem("todos",JSON.stringify(todos));
}