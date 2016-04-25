import React, {Component, PropTypes} from 'react';

class AppLayout extends Component {

	render() {
		return (
			<div className="app">
				<main>
					{this.props.children}
				</main>
			</div>
		)
	}
}

AppLayout.propTypes = {
	children: PropTypes.element
}

export default AppLayout;
