const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tasks.json');

//Verificar si el archivo JSON existe, sino, crearlo.
if (!fs.existsSync(filePath)) {
    try {
        fs.writeFileSync(filePath, JSON.stringify([]));
    } catch (error) {
        console.error('Error al crear el archivo: ', error);
    }
}

const addTask = (description) => {
    try {
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
    } catch (error) {
        console.error('Error al crear el archivo: ', error);
    }
};

const updateTask = (id, description) => {
    try {
        const tasks = JSON.parse(fs.readFileSync(filePath));
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.description = description;
            task.updateAt = new Date().toISOString();
            fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

            console.log(`Tarea actualizada correctamente (ID: ${id})`);
        } else {
            console.log(`Tarea no actualizada (ID: ${id})`);
        }
    } catch (error) {
        console.error('Error al actualizar la tarea: ', error);
    }

};

const deleteTask = (id) => {
    try {
        let tasks = JSON.parse(fs.readFileSync(filePath));
        tasks = tasks.filter(t => t.id !== id);
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
        console.log(`Tarea eliminada correctamente (ID: ${id})`);
    } catch (error) {
        console.error('Error al eliminar la tarea: ', error);
    }

};

const markTask = (id, status) => {
    try {
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
    } catch (error) {
        console.error('Error al marcar la tarea: ', error);
    }

};

const listTasks = (status = null) => {
    try {
        const tasks = JSON.parse(fs.readFileSync(filePath));
        const filteredTasks = status ? tasks.filter(t => t.status === status) : tasks;
        console.log(filteredTasks);
    } catch (error) {
        console.error('Error al listar las tareas: ', error);
    }

};

const [, , command, ...args] = process.argv;

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
        console.log('Comando desconocido.');
}