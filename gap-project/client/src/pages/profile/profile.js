import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import '../profile/profile.css'


export default function profile() {
	return (
		<div className="profileContainer">
      <div className = "leftContainer">
        <div className="infoContainer">
    			<div className="firstName">
          Jasmine
    			</div>
          <div className="lastName">
          Miller
          </div>
          <div className="pharmacy">
          Pharmacy: Left Aid
          </div>
          <div className="phone">
          Phone Number: (000)-123-4567
          </div>
          <div className="email">
          Email: testemail@123.com
          </div>
        </div>

				<div className = "scheduleOutline">
	        <div className = "scheduleContainer">
	          <div className = "scheduleTitle">
	          Weekly Schedule
	          </div>
	          <div className = "weeklySchedule">

	          </div>
	        </div>
				</div>
      </div>

      <div className = "rightContainer">
        <div className = "tutorialContainer">
          <div className = "turorialTitle">
          Assigned Tutorials
          </div>
          <div className = "assignedTutorial">

          </div>
        </div>
      </div>
		</div>
	);
}
