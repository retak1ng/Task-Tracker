# Rastreador de Tareas
### Task tracker es un proyecto que se utiliza para realizar un seguimiento y administrar las tareas.

## ¿Que es una Aplicación CLI?
### Una Aplicación CLI (Command-Line Interface o Interfaz de Línea de Comandos) es un entorno en el que los usuarios interactúan con un software o sistema operativo a través de comandos escritos en texto.

## Como usar
### Esta aplicación CLI(Interfaz de Linea de Comandos) para el rastreo de tareas permite realizar varias acciones como agregar, actualizar, eliminar y listar tareas.
### 1. Agregar una nueva tarea:
#### Para agregar una nueva tarea, usa el comando `add` seguido de la descripcion de la tarea.
```bash
node nombreDelArchivo.js add "Comprar leche"
```
### 2. Actualizar una tarea existente:
#### Para actualiar una tarea existente, usa el comando `update` seguido del ID de la tarea y la nueva descripción.
```bash
node nombreDelArchivo.js update 1 "Comprar leche y pan"
```
### 3. Eliminar una tarea:
#### Para eliminar una tarea, usa el comando `delete` seguido del ID de la tarea que deseas eliminar.
```bash
node nombreDelArchivo.js delete 1
```
### 4. Marcar una tarea como "en progreso":
#### Para marcar una tarea como "en progreso", usa el comando `mark-in-progress` seguido del ID de la tarea.
```bash
node nombreDelArchivo.js mark-in-progress 1
```
### 5. Marcar una tarea como "completada":
#### Para marcar una tarea como "completada", usa el comando `mark-done` seguido del ID de la tarea.
```bash
node nombreDelArchivo.js mark-done 1
```
### 6. Listar tareas:
#### Puedes listar todas las tareas o filtrar por estado (todo, in-progress, done).
#### Ejemplo (listar todas las tareas):
```bash
node nombreDelArchivo.js list
```
#### Ejemplo (listar solo tareas "en progreso"):
```bash
node nombreDelArchivo.js list in-progress
```
### Nota:
#### `nombreDelArchivo.js` es el nombre del archivo donde se guarda el código.

## Lo que aprendi
### `"fs" y "path"`
```javascript
//"fs" --> "file system" proporciona una API para interactuar con el sistema de archivos.
//Permite realizar operaciones como leer, escribir, modificar, borrar y manipular archivos y directorios en el sistema operativo.
const fs = require('fs');

//"path" proporciona utilidades para trabajar con rutas de archivos y directorios.
const path = require('path');
```

### `path.join()`
```java
// "__dirname" es una variable global en Node.js que contiene la ruta absoluta del directorio en el que se encuentra el archivo JavaScript que se esta ejecutando.
// "path.join" une "__dirname" con "tasks.json", que es el nombre del archivo que quieres acceder o manipular.
const filePath = path.join(__dirname,'tasks.json');
```

### `JSON.parse()`
```java
// "fs.readFileSync()" devuelve el contenido del archivo.
// "JSON.parse()" Convierte el formato JSON en un objeto o array que se puede manipular en JavaScript.
const tasks = JSON.parse(fs.readFileSync(filePath));
```

### `JSON.stringify()`
```java
// Convierte el objeto o array "tasks" en una cadena de texto en formato JSON.
// El segundo argumento (null) es para reemplazar la función de transformación, que en este caso NO SE USA, por lo que se pasa NULL.
// El tercer argumento (2) hace que el JSON sea más legible al agregar saltos de línea y espacios para estructurar los datos.
fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
```

### `process.argv`
```javascript
// ",," ignora los dos primeros elementos del array (process.argv[0] y process.argv[1]), que son la ruta al ejecutable de Node.js y la ruta al archivo del script.
// "command" captura el tercer elemento del array (process.argv[2]).
// "...args" captura todos los elementos restantes en el array a partir de process.argv[3].
// Ejemplo: node script.js add task1 task2
const [,, command, ...args] = process.argv;
```
### `args.join(' ')`
```java
// "args.join(' ')" toma el array args (que contiene los argumentos adicionales pasados al script después de add) y los convierte en una sola cadena, donde cada argumento está separado por un espacio.
// Ejemplo: si args es ['task1', 'task2'], args.join(' ') resultará en 'task1 task2'.
addTask(args.join(' '));
```

### `args.slice(1)`
```javascript
// slice(1) crea una submatriz de args que contiene todos los elementos a partir del índice 1 (es decir, excluye el primer elemento).
updateTask(parseInt(args[0]), args.slice(1).join(' '));
```
#### Ni el cero, ni el uno, soy unico.