'use strict';

var buttonAdd = document.querySelector('.button--add');
var buttonPlus = document.querySelector('.button--plus');
var arrayTasks = [];
printLocalStorage();

function addTask() {
	var enterTask = document.querySelector('.new-task');
	enterTask.classList.toggle('hidden');
}
buttonPlus.addEventListener('click', addTask);

function createNewTask() {
	var inputTask = document.querySelector('.new-task__input').value;
	var status = false;
	//const status = document.querySelector('input[name="status"]:checked').value;
	//const status = document.querySelector('input[name="status"]').value;
	var task = {
		"name": inputTask,
		"completed": status
	};
	document.querySelector('.new-task__input').value = '';
	localStorageToDoList(task);
}

buttonAdd.addEventListener('click', createNewTask, addNewTask);

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










/*
La clave está en que localStorage solo nos permite guardar un 'string' (setItem), por lo que primero debemos convertir nuestro objeto a string con JSON.stringify().

A la hora de obtener los datos que se han guardado (getItem) en localStorage debemos hacer justo lo contrario con JSON.parse().
*/
