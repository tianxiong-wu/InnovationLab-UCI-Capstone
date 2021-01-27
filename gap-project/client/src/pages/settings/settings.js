import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import '../settings/settings.css'


export default function settings() {
	return (
    <div className = 'settingsContainer'>
      <div className = 'settingsTitle'>
        Settings
      </div>

      <div className = 'securityContainer'>
        <div className = 'securityTitleBar'>
          <div className = 'securityTitle'>
            Security
          </div>
          <div className = 'notificationTitle'>
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

    </div>
	);
}
