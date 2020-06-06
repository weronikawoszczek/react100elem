"use strict";

/*jshint quotmark:false */

/*jshint white:false */

/*jshint trailing:false */

/*jshint newcap:false */

/*global React */
var app = app || {};

(function () {
	'use strict';

	app.TodoFooter = React.createClass({
		displayName: "TodoFooter",
		render: function () {
			var activeTodoWord = app.Utils.pluralize(this.props.count, 'item');
			var clearButton = null;

			if (this.props.completedCount > 0) {
				clearButton = /*#__PURE__*/React.createElement("button", {
					className: "clear-completed",
					onClick: this.props.onClearCompleted
				}, "Clear completed");
			}

			var nowShowing = this.props.nowShowing;
			return /*#__PURE__*/React.createElement("footer", {
				className: "footer"
			}, /*#__PURE__*/React.createElement("ul", {
				className: "filters"
			}, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
				href: "#/active",
				className: classNames({
					selected: nowShowing === app.ACTIVE_TODOS
				})
			}, "To do")), ' ', /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
				href: "#/completed",
				className: classNames({
					selected: nowShowing === app.COMPLETED_TODOS
				})
			}, "Done")), ' ', /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
				href: "#/",
				className: classNames({
					selected: nowShowing === app.ALL_TODOS
				})
			}, "All"))), /*#__PURE__*/React.createElement("span", {
				className: "todo-count"
			}, /*#__PURE__*/React.createElement("strong", null, this.props.count), " to do"), clearButton);
		}
	});
})();