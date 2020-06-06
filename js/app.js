"use strict";

/*jshint quotmark:false */

/*jshint white:false */

/*jshint trailing:false */

/*jshint newcap:false */

/*global React, Router*/
var app = app || {};

(function () {
	'use strict';

	app.ALL_TODOS = 'all';
	app.ACTIVE_TODOS = 'active';
	app.COMPLETED_TODOS = 'completed';
	var TodoFooter = app.TodoFooter;
	var TodoItem = app.TodoItem;
	var ENTER_KEY = 13;
	var ChecklistApp = React.createClass({
		displayName: "ChecklistApp",
		getInitialState: function () {
			return {
				nowShowing: app.ALL_TODOS,
				editing: null,
				newTodo: ''
			};
		},
		componentDidMount: function () {
			var setState = this.setState;
			var router = Router({
				'/': setState.bind(this, {
					nowShowing: app.ALL_TODOS
				}),
				'/active': setState.bind(this, {
					nowShowing: app.ACTIVE_TODOS
				}),
				'/completed': setState.bind(this, {
					nowShowing: app.COMPLETED_TODOS
				})
			});
			router.init('/');
		},
		handleChange: function (event) {
			this.setState({
				newTodo: event.target.value
			});
		},
		handleNewTodoKeyDown: function (event) {
			if (event.keyCode !== ENTER_KEY) {
				return;
			}

			event.preventDefault();
			var val = this.state.newTodo.trim();

			if (val) {
				this.props.model.addTodo(val);
				this.setState({
					newTodo: ''
				});
			}
		},
		toggleAll: function (event) {
			var checked = event.target.checked;
			this.props.model.toggleAll(checked);
		},
		toggle: function (todoToToggle) {
			this.props.model.toggle(todoToToggle);
		},
		destroy: function (todo) {
			this.props.model.destroy(todo);
		},
		edit: function (todo) {
			this.setState({
				editing: todo.id
			});
		},
		save: function (todoToSave, text) {
			this.props.model.save(todoToSave, text);
			this.setState({
				editing: null
			});
		},
		cancel: function () {
			this.setState({
				editing: null
			});
		},
		clearCompleted: function () {
			this.props.model.clearCompleted();
		},
		render: function () {
			var footer;
			var main;
			var todos = [...Array(5000)].map( (_, i) => ({ id: i, title:'new task' + ' ' + i, completed: i % 3 }));
			var shownTodos = todos.filter(function (todo) {
				switch (this.state.nowShowing) {
					case app.ACTIVE_TODOS:
						return !todo.completed;

					case app.COMPLETED_TODOS:
						return todo.completed;

					default:
						return true;
				}
			}, this);
			var todoItems = shownTodos.map(function (todo) {
				return /*#__PURE__*/React.createElement(TodoItem, {
					key: todo.id,
					todo: todo,
					onToggle: this.toggle.bind(this, todo),
					onDestroy: this.destroy.bind(this, todo),
					onEdit: this.edit.bind(this, todo),
					editing: this.state.editing === todo.id,
					onSave: this.save.bind(this, todo),
					onCancel: this.cancel
				});
			}, this);
			var activeTodoCount = todos.reduce(function (accum, todo) {
				return todo.completed ? accum : accum + 1;
			}, 0);
			var completedCount = todos.length - activeTodoCount;

			if (activeTodoCount || completedCount) {
				footer = /*#__PURE__*/React.createElement(TodoFooter, {
					count: activeTodoCount,
					completedCount: completedCount,
					nowShowing: this.state.nowShowing,
					onClearCompleted: this.clearCompleted
				});
			}

			if (todos.length) {
				main = /*#__PURE__*/React.createElement("section", {
					className: "main"
				}, /*#__PURE__*/React.createElement("input", {
					id: "toggle-all",
					className: "toggle-all",
					type: "checkbox",
					onChange: this.toggleAll,
					checked: activeTodoCount === 0
				}), /*#__PURE__*/React.createElement("label", {
					htmlFor: "toggle-all"
				}), /*#__PURE__*/React.createElement("ul", {
					className: "check-list"
				}, todoItems));
			}

			return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("header", {
				className: "header"
			}, /*#__PURE__*/React.createElement("i", {
				className: "fa fa-check toggle-all-check",
				"aria-hidden": "true"
			}), /*#__PURE__*/React.createElement("h1", null, "My checklist"), /*#__PURE__*/React.createElement("input", {
				className: "new-check",
				placeholder: "Type your task",
				value: this.state.newTodo,
				onKeyDown: this.handleNewTodoKeyDown,
				onChange: this.handleChange,
				autoFocus: true
			})), main, footer);
		}
	});
	var model = new app.ChecklistModel('react-todos');

	function render() {
		React.render( /*#__PURE__*/React.createElement(ChecklistApp, {
			model: model
		}), document.getElementsByClassName('checklist')[0]);
	}

	model.subscribe(render);
	render();
})();