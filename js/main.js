'use strict';

var buttonAdd = document.querySelector('.button--add');
var buttonPlus = document.querySelector('.button--plus');
var arrayLi = document.querySelector('.task-li');
var arrayTasks = [];
printLocalStorage(); // Al cargar la página se imprimen las tareas que estén almacenadas previamente en el localStorage.

/* Al pulsar sobre el botón(+) se despliega un panel para crear una nueva tarea */

function addNewTask() {
	var enterTask = document.querySelector('.new-task');
	enterTask.classList.toggle('hidden');
}
buttonPlus.addEventListener('click', addNewTask);

/* Al pulsar sobre el botón(añadir) se añaden las distintas tareas al To-Do list */

function createNewTask() {
	var inputTask = document.querySelector('.new-task__input').value;
	var status = false;
	//const status = document.querySelector('input[name="status"]:checked').value;
	// var status = document.querySelector('input[name="status"]:checked').value;
	var task = {
		"name": inputTask,
		"completed": status
	};
	document.querySelector('.new-task__input').value = '';
	localStorageToDoList(task);
}
buttonAdd.addEventListener('click', createNewTask, addNewTask);

/* Se almacenan los datos en el localStorage

		La clave está en que localStorage solo nos permite guardar un 'string' (setItem), por lo que primero debemos convertir nuestro objeto a string con JSON.stringify().

		A la hora de obtener los datos que se han guardado (getItem) en localStorage debemos hacer justo lo contrario con JSON.parse().

*/

function localStorageToDoList(task) {
	if (localStorage.getItem('arrayTasks') == null) {
		arrayTasks = [];
		arrayTasks.push(task);
		localStorage.setItem('arrayTasks', JSON.stringify(arrayTasks));
	} else {
		arrayTasks = JSON.parse(localStorage.getItem('arrayTasks'));
		arrayTasks.push(task);
		localStorage.setItem('arrayTasks', JSON.stringify(arrayTasks));
	}
	console.log('arrayTasks', arrayTasks);
	console.log('lastTask ', arrayTasks[arrayTasks.length - 1].name);
	printLocalStorage();
}

/* Se imprimen los datos almacenados en localStorage (también al cargar la página por primera vez, llamando a la función en línea 6)*/

function printLocalStorage() {
	var taskLocStorage = JSON.parse(localStorage.getItem('arrayTasks'));
	if (taskLocStorage != null) {
		var ul = document.querySelector('.todo-list');
		var listHTML = '';
		taskLocStorage.reverse();
			for (var i = 0; i < taskLocStorage.length; i++) {
				listHTML += '<li class="task-li"><input type="checkbox" class="checkbox" name="status" for="label-checkbox"/><label class="label-checkbox" id="label-checkbox">' + taskLocStorage[i].name + '</label></li>';
			}
		ul.innerHTML = listHTML;

	}

}

/* Completar tareas terminadas */

var checkboxes = document.querySelectorAll('.checkbox');
for (var i = 0; i < checkboxes.length; i++) {
	checkboxes[i].addEventListener('click', completeTasks);
}

function completeTasks(event) {
	var currentTask = event.currentTarget.parentElement;
	currentTask.classList.toggle('strike');
}

/* Fecha */
