const fs = require('fs');
const { Command } = require('commander');
const program = new Command();
const todoListFile = "todoList.txt" // change with your desired filename
const { v4: uuid } = require('uuid');

let todoList = [];

program
    .name('cli-todo')
    .description('CLI to add todo tasks, delete and edit')
    .version('0.1.0');

program.command('add')
    .description('Add todo')
    .argument('<new_todo>', 'new todo to add')
    .argument('<status>', 'current status of the todo')
    .action((new_todo, status) => {
        const randomId = uuid();
        const obj = {
            "id": randomId,
            "des": new_todo,
            "status": status
        }
        if(todoList.length != 0){
            loadTodoList(); // load previous todos if and only if the user has previous todos
        }
        todoList.push(obj); // adding new todo to the list
        saveTodoList(); // save to the file
    });

// show all the todos a user has added
program.command('all')
    .description('Show all todos')
    .action(() => {
        let count = 1;
        loadTodoList();
        console.log("\n---------ALL Todos--------\n")
        todoList.forEach((todo) => {
            console.log(`${count++}.`)
            console.log(`Description: ${todo.des}`)
            console.log(`Status: ${todo.status}\n`)
        })
    });

// show all the todos a user has added.
program.command('delete')
    .description('Delete the todo')
    .argument("<todo_des>", 'provide todo description you want to delete')
    .action((todo_des) => {
        loadTodoList();
        todoList = todoList.filter((todo) => todo.des.toLowerCase() != todo_des.toLowerCase());
        saveTodoList(); // save the list after being changed
        console.log(`${todo_des} is deleted from todolist`)
    });

// change the status of todo.
program.command('status')
    .description('Change the status of todo')
    .argument("<todo_des>", 'deletes the indexed todo')
    .argument("<status>", 'change the status of todo')
    .action((todo_des, status) => {
        loadTodoList();
        todoList.forEach((todo) => {
            if (todo.des.toLowerCase() === todo_des.toLowerCase()) {
                todo.status = status;
            }
        })
        saveTodoList();
        console.log(`Todo : ${todo_des}, is marked as ${status}`)
    });

// clear the prev data and add new data with prev data
function saveTodoList() {
    fs.writeFileSync(todoListFile, ''); // clearning the file first
    const jsonData = JSON.stringify(todoList);
    fs.writeFileSync(todoListFile, jsonData, 'utf8'); // writing back with all the datas avl
    console.log('Todo list saved to file.');
}

// loads the previous todos 
function loadTodoList() {
    try {
        const data = fs.readFileSync(todoListFile, 'utf8');
        todoList = JSON.parse(data);
        console.log('Todo list loaded from file.');
    } catch (error) {
        console.log("Error loading the file");
    }
}

program.parse();