/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */
var app = app || {};

(function () {
	'use strict';

	app.TodoFooter = React.createClass({
		render: function () {
			var activeTodoWord = app.Utils.pluralize(this.props.count, 'item');
			var clearButton = null;

			if (this.props.completedCount > 0) {
				clearButton = (
					<button
						className="clear-completed"
						onClick={this.props.onClearCompleted}>
						Clear completed
					</button>
				);
			}

			var nowShowing = this.props.nowShowing;
			return (
				<footer className="footer">
					<ul className="filters">
						<li>
							<a
								href="#/active"
								className={classNames({selected: nowShowing === app.ACTIVE_TODOS})}>
									To do
							</a>
						</li>
						{' '}
						<li>
							<a
								href="#/completed"
								className={classNames({selected: nowShowing === app.COMPLETED_TODOS})}>
									Done
							</a>
						</li>
						{' '}
						<li>
							<a
								href="#/"
								className={classNames({selected: nowShowing === app.ALL_TODOS})}>
								All
							</a>
						</li>
					</ul>
					<span className="todo-count">
						<strong>{this.props.count}</strong> to do
					</span>
					{clearButton}
				</footer>
			);
		}
	});
})();
