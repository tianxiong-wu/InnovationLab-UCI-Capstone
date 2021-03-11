import React from 'react';
import Typography from '@material-ui/core/Typography';
import '../footer/footer.css';


export default function footerBar() {
	return (
		<div className="footerContainer">
			<div className="liveHelpBar">
				<Typography variant="h6">
				<a className="footerLink" href="#">Live Help</a>
				</Typography>
			</div>
		</div>
	);
}