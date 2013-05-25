// ==========================================
// Todo MVC Testing
// ==========================================
// Author : Pasindu De Silva
// Licensed under The MIT License
// ==========================================

var casper = require('casper').create();
var url='http://todomvc.com/architecture-examples/angularjs/#/';
casper.start(url);

var x = require('casper').selectXPath;


var settings={

    todo_list_ul:"ul#todo-list",
    todo_list_li:"ul#todo-list li",
    todo_input  :"ul#todo-list li .view label"

}

casper.waitForSelector("input#new-todo",
    function success() {

        //  Testing wheather new todo exsits
        this.test.assertExists("input#new-todo", 'New todo exsits');   

        // Input a new todo
        this.sendKeys("input#new-todo", "Testing");

        // Add a new todo
        this.page.sendEvent( 'keypress',this.page.event.key.Enter );

        casper.log('plop',this.getElementInfo('ul#todo-list'));
        this.capture('todo1.png');
    },
    function fail() {
        this.test.assertExists("input#new-todo");
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
casper.thenOpen(url+'active', function() {
    this.test.assertExists("ul#todo-list li", 'Todo list li is exsits'); 
    this.capture('todo3.png');
    casper.back();

    this.echo(this.getCurrentUrl());
});


// Testing compleled when have 1 active todo
casper.thenOpen(url+'compleled', function() {
 this.echo(this.getCurrentUrl());
    this.test.assertDoesntExist("ul#todo-list li", 'Todo compleled tested'); 
    casper.back();
});


// Completes a todo
casper.then(function() { 

    this.click('ul#todo-list li .view input');
    this.capture('todo3.png');
});


// Testing compleled when have  1 completed todo
casper.thenOpen(url+'compleled', function() {
    this.test.assertExist("ul#todo-list li", 'Todo compleled tested'); 
    casper.back();
});


// Testing compleled when have  1 completed todo
casper.thenOpen(url+'active', function() {
    this.test.assertDoesntExist("ul#todo-list li", 'Todo list li is exsits'); 
    casper.back();
});

// Testing todo count when only 0 todo
casper.then(function() { 
    this.test.assertEquals(this.getElementInfo('#todo-count').text,'0 item left', 'Todo count correct');
});

// Testing the distroy todo event
casper.then(function() { 
    this.click('.destroy');
    this.test.assertDoesntExist("ul#todo-list li", 'Todo list li is removed'); 
    this.capture('todo2.png');
});



casper.run(function() {this.test.renderResults(true);});