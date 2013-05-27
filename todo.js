// ==========================================
// Todo MVC Testing
// ==========================================
// Author : Pasindu De Silva
// ==========================================

var casper = require('casper').create();
//var url = 'http://todomvc.com/architecture-examples/backbone/#/';
//var url = 'http://todomvc.com/architecture-examples/angularjs/#/';
var url = 'http://todomvc.com/architecture-examples/knockoutjs/#/';

var utils = require('utils');

casper.start(url);

var settings = {

    todo_list_ul : "ul#todo-list", // Selector for containing todos 
    todo_list_li : "ul#todo-list li",
    todo_input : "ul#todo-list li .view label"  // Selector for the added todos

};


casper.then(function () {

	while (this.exists('.destroy')) {	
		this.click('.destroy');
	}

    this.capture('todo2.png');

	// Testing wheather new todo exsits
    this.test.assertExists("input#new-todo", 'New todo exsits');

    // Input a new todo
    this.sendKeys("input#new-todo", "Testing");

    this.capture('todo3.png');

    // Add a new todo
    this.page.sendEvent('keypress', this.page.event.key.Enter);
    this.capture('todo4.png');
});


// Checking the format of todo list
casper.then(function() {
    this.test.assertExists(settings.todo_list_ul, 'Todo list ul exsits');
    this.test.assertExists(settings.todo_list_li, 'Todo list li is exsits');
});

// Tests wheather the added value
casper.then(function() {
    this.test.assertEquals(this.getElementInfo(settings.todo_input).text,'Testing', 'Todo added to the todo list');
});

// Check todo count div exsits
casper.then(function() {
    this.test.assertExists("#todo-count", 'Todo count exsits');
});

// Testing todo count when only 1 todo
casper.then(function() {
    this.test.assertEquals(this.getElementInfo('#todo-count').text,'1 item left', 'Todo count correct');
});

// Testing active when have 1 active todo
casper.thenOpen(url + 'active', function() {

    this.test.assertEquals(this.getElementInfo('ul#todo-list li').visible,true, '1 todo when 1 active todo in active tab');
    casper.back();
});

// Testing compleled when have 1 active todo
casper.then(function() {
    this.click('ul#filters li:nth-child(3) a');
    this.capture('todo5.png');
});

casper.then(function() {
	if (this.exists('ul#todo-list li')) {
		this.test.assertEquals(this.getElementInfo('ul#todo-list li').visible,false, '0 todo when 1 active todo in the completed tab');
	} else {
		this.test.assertDoesntExist('ul#todo-list li','0 todo when 1 active todo in the completed tab');  // This is for mvc that do not hide li
	}
	this.click('ul#filters li:nth-child(1) a');
});


casper.then(function() {
    this.click('ul#todo-list li .view input');
    this.capture('todo6.png');
});

// Testing compleled when have 1 completed todo
casper.thenOpen(url + 'compleled', function() {
	this.capture('todo7.png');
    this.test.assertEquals(this.getElementInfo('ul#todo-list li').visible,true, '1 todo when 1 completed todo in the completed tab');
    casper.back();
});

// Testing compleled when have 1 completed todo
casper.thenOpen( url + 'active' , function() {
	this.capture('todo8.png');
	
	if (this.exists('ul#todo-list li')){ 
		this.test.assertEquals(this.getElementInfo('ul#todo-list li').visible,false, '0 todo when 1 completed todo in the active tab');
	} else {
		this.test.assertDoesntExist('ul#todo-list li','0 todo when 1 active todo in the completed tab');  // This is for mvc that do not hide li
	}
    casper.back();
});

// Testing todo count when only 0 todo
casper.then(function () {
	this.capture('todo9.png');
    this.test.assertEquals(this.getElementInfo('#todo-count').text,'0 items left', 'Todo count correct');
});

// Testing the distroy todo event
casper.then(function() {
    this.click('.destroy');
    this.test.assertDoesntExist("ul#todo-list li", 'Todo list li is removed');
	this.capture('todo10.png');
});

casper.run(function() {this.test.renderResults(true);});