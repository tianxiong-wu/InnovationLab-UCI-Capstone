import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import '../footer/footer.css';


export default function footerBar() {
	return (
		<div className="footerContainer">
			<div className="liveHelpBar">
				<Typography variant="h6">
				<a className="footerLink" href="#">Live Help</a>
				</Typography>
			</div>
			<div className="contactBar">
				<Typography variant="h6">
				<a className="footerLink" href="#">Pharmacy Contact Info</a>
				</Typography>
			</div>
		</div>
	);
}