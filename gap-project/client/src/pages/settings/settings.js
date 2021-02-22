import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import '../settings/settings.css'

function switchNotificationPatient () {
	console.log('hello');
	document.getElementById('securityContainer-patient').style.display = 'none';
	document.getElementById('notificationsContainer').style.display = 'flex';
}

function switchSecurityPatient () {
	console.log('hello');
	document.getElementById('securityContainer-patient').style.display = 'flex';
	document.getElementById('notificationsContainer').style.display = 'none';
}

export default function settings() {
	return (
    <div className = 'settingsContainer-patient'>
      <div className = 'settingsTitle-patient'>
        Settings
      </div>

      <div id = 'securityContainer-patient'>
        <div className = 'titleBar-patient'>
          <div className = 'securityTitle-patient'onClick = {switchSecurityPatient}>
            Security
          </div>
          <div className = 'notificationTitle-patient' onClick = {switchNotificationPatient} >
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
						<div className = 'titleBar-patient'>
		          <div className = 'securityTitle-patient'onClick = {switchSecurityPatient}>
		            Security
		          </div>
		          <div className = 'notificationTitle-patient' onClick = {switchNotificationPatient} >
		            Notification
		          </div>
		        </div>

						<div className = 'folderBorder-patient'>
							<div className = 'whiteBorder-patient'>
			          <div className = 'notificationSection'>
			              <div className = 'insideTitle-patient'>
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
										<div className = 'infoContainer-patient'>
				              <div className = 'infoBox-patient'>
				                Call me at:
				              </div>
											<div className = 'phone-patient_email_Container-patient'>
					              <div className = 'phone-patient'>
					                (408)123-4567
					              </div>
					              <div className = 'editContainer-patient'>
					                <EditIcon/>
													<div className = 'edit-patient'>
														Edit
													</div>
					              </div>
											</div>
										</div>
			          </div>
								<div className = 'notificationSection'>
			              <div className = 'insideTitle-patient'>
			                Email
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
										<div className = 'infoContainer-patient'>
				              <div className = 'infoBox-patient'>
				                Email me at:
				              </div>
											<div className = 'phone-patient_email_Container-patient'>
					              <div className = 'email-patient'>
					                innovationlab@email.com
					              </div>
												<div className = 'editContainer-patient'>
					                <EditIcon/>
													<div className = 'edit-patient'>
														Edit
													</div>
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
