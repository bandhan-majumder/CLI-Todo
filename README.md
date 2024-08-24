# CLI-Todo
```JavaScript
git clone "https://github.com/bandhan-majumder/CLI-Todo/"
cd CLI-Todo
npm install
```
## Open Terminal : ctrl + ` (in VS Code)
```
alias todo="node index.js"
# set up alias for index.js
```
### Note:-
### This will setup the alias temporarily, to make it permanent, go to `vi ~/.bashrc` and add "alias todo="node index.js" at the bottom of the file.

## Features
![image](https://github.com/user-attachments/assets/e2e55e25-ce4c-4914-9012-02f3cd2082c6)


## Commands
```
todo -h # for manual of the commands.
```
```
todo add <new_todo> <status>
# for exp: todo add "Go to sleep" "pending". It creates a todo with current status.
```
```
todo delete <todo's description>
# for exp: todo delete "go to sleep". Deletes a todo. Note that any type of casing is supported.
```
```
todo status <todo_des> <status>
# for exp: todo status "go to sleep" "done".. Updates the todo with new status
```
```
todo all
# shows all the todo
```
