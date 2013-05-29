// ==========================================
// Todo MVC Testing
// ==========================================
// Author : Pasindu De Silva
// ==========================================

var casper = require('casper').create();
var url = 'http://todomvc.com/architecture-examples/backbone/#/';
//var url = 'http://todomvc.com/architecture-examples/angularjs/#/';
//var url = 'http://todomvc.com/architecture-examples/knockoutjs/#/';

var utils = require('utils');

casper.start(url);

var settings = {
    todo_list_ul    : 'ul#todo-list',               // Selector for containing todos 
    todo_list_li    : 'ul#todo-list li',
    todo_input      : 'ul#todo-list li .view label', // Selector for the added todos
	todo_com     : 'ul#todo-list li .view input', // Selector to complete todo
    todo_new        : 'input#new-todo',              // Selector to add new input
    todo_count      : '#todo-count',                // Selector for the todo counts
    link_completed  : 'ul#filters li:nth-child(3) a', // Selector for the link for completed todos
    link_all        : 'ul#filters li:nth-child(1) a', // Selector for the link for All todos
    delete_todo     :  '.destroy'                     // Selector to delete selected todo

};


casper.then(function () {

	while (this.exists(settings.delete_todo)) {
		this.click(settings.delete_todo);
	}

    this.capture('todo2.png');

	// Testing wheather new todo exsits
    this.test.assertExists(settings.todo_new, 'New todo exsits');

    // Input a new todo
    this.sendKeys(settings.todo_new, 'Testing');

    this.capture('todo3.png');

    // Add a new todo
    this.page.sendEvent('keypress', this.page.event.key.Enter);
    this.capture('todo4.png');
});


// Checking the format of todo list
casper.then(function () {
    this.test.assertExists(settings.todo_list_ul, 'Todo list ul exsits');
    this.test.assertExists(settings.todo_list_li, 'Todo list li is exsits');
});

// Tests wheather the added value
casper.then(function () {
    this.test.assertEquals(this.getElementInfo(settings.todo_input).text, 'Testing', 'Todo added to the todo list');
});

// Check todo count div exsits
casper.then(function () {
    this.test.assertExists(settings.todo_count, 'Todo count exsits');
});

// Testing todo count when only 1 todo
casper.then(function () {
    this.test.assertEquals(this.getElementInfo(settings.todo_count).text, '1 item left', 'Todo count correct');
});

// Testing active when have 1 active todo
casper.thenOpen(url + 'active', function () {

    this.test.assertEquals(this.getElementInfo(settings.todo_list_li).visible, true, '1 todo when 1 active todo in active tab');
    casper.back();
});

// Testing compleled when have 1 active todo
casper.then(function () {
    this.click(settings.link_completed);
    this.capture('todo5.png');
});

casper.then(function () {
	if (this.exists(settings.todo_input)) {
		this.test.assertEquals(this.getElementInfo(settings.todo_input).visible, false, '0 todo when 1 active todo in the completed tab');
	} else {
		this.test.assertDoesntExist(settings.todo_input, '0 todo when 1 active todo in the completed tab');  // This is for mvc that do not hide li
	}
	this.click(settings.link_all);
});


casper.then(function () {
    this.click(settings.todo_com);
    this.capture('todo6.png');
});

// Testing compleled when have 1 completed todo
casper.thenOpen(url + 'compleled', function () {
	this.capture('todo7.png');
    this.test.assertEquals(this.getElementInfo(settings.todo_input).visible, true, '1 todo when 1 completed todo in the completed tab');
    casper.back();
});

// Testing compleled when have 1 completed todo
casper.thenOpen(url + 'active', function () {
	this.capture('todo8.png');
	if (this.exists(settings.todo_input)) {
		this.test.assertEquals(this.getElementInfo(settings.todo_input).visible, false, '0 todo when 1 completed todo in the active tab');
	} else {
		this.test.assertDoesntExist(settings.todo_input, '0 todo when 1 active todo in the completed tab');  // This is for mvc that do not hide li
	}
    casper.back();
});

// Testing todo count when only 0 todo
casper.then(function () {
	this.capture('todo9.png');
    this.test.assertEquals(this.getElementInfo(settings.todo_count).text, '0 items left', 'Todo count correct');
});

// Testing the distroy todo event
casper.then(function () {
    this.click(settings.delete_todo);
    this.test.assertDoesntExist(settings.todo_input, 'Todo list li is removed');
	this.capture('todo10.png');
});

casper.run(function () {this.test.renderResults(true); });