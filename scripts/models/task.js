'use strict';

var app = {};
// var __API_URL__ = 'http://localhost:3000';
var __API_URL__ = 'https://book-app-301.herokuapp.com';

(function(module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Task(taskObject) {
    Object.keys(taskObject).forEach(key => this[key] = taskObject[key]);
  }

  Task.prototype.toHtml = function() {
    return Handlebars.compile($('#task-template').text())(this);
  }

  Task.all = [];

  Task.loadAll = rows => Task.all = rows.sort((a, b) => b.title - a.title).map(task => new Task(task))

  Task.fetchAll = callback =>
    $.get(`${__API_URL__}/tasks`)
      .then(Task.loadAll)
      .then(callback)
      .catch(errorCallback);

  module.Task = Task;
})(app)
