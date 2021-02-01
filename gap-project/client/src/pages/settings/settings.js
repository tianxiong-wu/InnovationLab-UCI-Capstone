import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import '../settings/settings.css'

function switchNotification () {
	console.log('hello');
	document.getElementById('securityContainer').style.display = 'none';
	document.getElementById('notificationsContainer').style.display = 'flex';
}

function switchSecurity () {
	console.log('hello');
	document.getElementById('securityContainer').style.display = 'flex';
	document.getElementById('notificationsContainer').style.display = 'none';
}

export default function settings() {
	return (
    <div className = 'settingsContainer'>
      <div className = 'settingsTitle'>
        Settings
      </div>

      <div id = 'securityContainer'>
        <div className = 'titleBar'>
          <div className = 'securityTitle'onClick = {switchSecurity}>
            Security
          </div>
          <div className = 'notificationTitle' onClick = {switchNotification} >
            Notification
          </div>
        </div>

        <div className = 'passwordContainer'>
          <div className = 'password' id = 'currentPW'>
            Current Password: *****
          </div>
          <div className = 'password' id = 'newPW'>
            New Password: *****
          </div>
          <div className = 'password' id = 'retypePW'>
            Retype New Password: *****
          </div>

					<div className = 'break'></div>

          <div className = 'saveButton'>
            Save
          </div>
        </div>
      </div>

			<div id = 'notificationsContainer'>
						<div className = 'titleBar'>
		          <div className = 'securityTitle'onClick = {switchSecurity}>
		            Security
		          </div>
		          <div className = 'notificationTitle' onClick = {switchNotification} >
		            Notification
		          </div>
		        </div>

						<div className = 'folderBorder'>
							<div className = 'whiteBorder'>
			          <div className = 'notificationSection'>
			              <div className = 'insideTitle'>
			                Phone Number
			              </div>
			              <div className = 'notifyMe'>
			                Notify Me?
			              </div>
										<div className = 'yesContainer'>
											<div className = 'yes'>
											Yes
											</div>
											<div className = 'yesBox'> </div>
										</div>
										<div className = 'noContainer'>
											<div className = 'no'>
											No
											</div>
			              	<div className = 'noBox'> </div>
										</div>
										<div className = 'infoContainer'>
				              <div className = 'infoBox'>
				                Call me at:
				              </div>
											<div className = 'phone_email_Container'>
					              <div className = 'phone'>
					                (408)123-4567
					              </div>
					              <div className = 'edit'>
					                edit
					              </div>
											</div>
										</div>
			          </div>
								<div className = 'notificationSection'>
			              <div className = 'insideTitle'>
			                Phone Number
			              </div>
			              <div className = 'notifyMe'>
			                Notify Me?
			              </div>
										<div className = 'yesContainer'>
											<div className = 'yes'>
											Yes
											</div>
											<div className = 'yesBox'> </div>
										</div>
										<div className = 'noContainer'>
											<div className = 'no'>
											No
											</div>
			              	<div className = 'noBox'> </div>
										</div>
										<div className = 'infoContainer'>
				              <div className = 'infoBox'>
				                Email me at:
				              </div>
											<div className = 'phone_email_Container'>
					              <div className = 'email'>
					                innovationlab@email.com
					              </div>
					              <div className = 'edit'>
					                edit
					              </div>
											</div>
										</div>
			          </div>

								<div className = 'break'></div>

								<div className = 'saveButton'>
			            Save
			          </div>
							</div>
						</div>
      </div>
    </div>
	);
}
