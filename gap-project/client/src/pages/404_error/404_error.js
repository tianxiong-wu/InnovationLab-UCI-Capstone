import React from 'react';
import '../404_error/404_error.css'


export default function error_page() {
	return (
		<div className="errorContainer">
			<div className="errorMessage">
				Oops, the page you are trying to find does not exist!
			</div>
		</div>
	);
}
