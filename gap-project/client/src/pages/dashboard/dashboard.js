import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import '../dashboard/dashboard.css';


export default function dashboardContent() {
	return (
		<div className="dashContainer">
			<div className="dashSummary">
				Hi [patientName], your next infusion is [date] at [time]
			</div>
			<div className="dashContent">
				<div className="tutNotifBox">
					<div className="tutVid">
						Tutorial Video Thumbnail
					</div>
					<div className="notifBox">
						Notification Bar
					</div>
				</div>
				<div className="dailySched">
					Daily Schedule
				</div>
			</div>
		</div>
	);
}