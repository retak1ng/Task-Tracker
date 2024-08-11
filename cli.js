const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'tasks.json');

//Verificar si el archivo JSON existe, sino, crearlo.
if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, JSON.stringify([]));
}

const addTask = (description) => {
    const tasks = JSON.parse(fs.readFileSync(filePath));

    const newTask = {
        id: tasks.length + 1,
        description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    console.log(`Tarea agregada exitosamente (ID: ${newTask.id})`);
};

const updateTask = (id, description)=>{
    const tasks = JSON.parse(fs.readFileSync(filePath));
    const task = tasks.find(t=> t.id === id);
    if(task) {
        task.description = description;
        task.updateAt = new Date().toISOString();
        fs.writeFileSync(filePath, JSON.stringify(tasks,null,2));

        console.log(`Tarea actualizada correctamente (ID: ${id})`);
    } else {
        console.log(`Tarea no actualizada (ID: ${id})`);
    }
};

const deleteTask = (id) => {
    let tasks = JSON.parse(fs.readFileSync(filePath));
    tasks = tasks.filter(t => t.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    console.log(`Tarea eliminada correctamente (ID: ${id})`);
};

const markTask = (id, status) => {
    const tasks = JSON.parse(fs.readFileSync(filePath));
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = status;
        task.updatedAt = new Date().toISOString();
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
        console.log(`Tarea marcada como ${status} (ID: ${id})`);
    } else {
        console.log(`No se encontro la tarea (ID: ${id})`);
    }
};

const listTasks = (status = null) => {
    const tasks = JSON.parse(fs.readFileSync(filePath));
    const filteredTasks = status ? tasks.filter(t => t.status === status) : tasks;
    console.log(filteredTasks);
};

const [,, command, ...args] = process.argv;

switch (command) {
    case 'add':
        addTask(args.join(' '));
        break;
    case 'update':
        updateTask(parseInt(args[0]), args.slice(1).join(' '));
        break;
    case 'delete':
        deleteTask(parseInt(args[0]));
        break;
    case 'mark-in-progress':
        markTask(parseInt(args[0]), 'in-progress');
        break;
    case 'mark-done':
        markTask(parseInt(args[0]), 'done');
        break;
    case 'list':
        listTasks(args[0]);
        break;
    default:
        console.log('Unknown command');
}
