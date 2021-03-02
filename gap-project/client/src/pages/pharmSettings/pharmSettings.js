import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import '../pharmSettings/pharmSettings.css'

function switchAbout () {
	console.log('hello');
	document.getElementById('securityContainer').style.display = 'none';
	document.getElementById('aboutUsContainer').style.display = 'flex';
}

function switchSecurity () {
	console.log('hello');
	document.getElementById('securityContainer').style.display = 'flex';
	document.getElementById('aboutUsContainer').style.display = 'none';
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
          <div className = 'aboutUsTitle' onClick = {switchAbout} >
            About Us
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

			<div id = 'aboutUsContainer'>
						<div className = 'titleBar'>
		          <div className = 'securityTitle'onClick = {switchSecurity}>
		            Security
		          </div>
		          <div className = 'aboutUsTitle' onClick = {switchAbout} >
		            About Us
		          </div>
		        </div>

						<div className = 'folderBorder'>
							<div className = 'whiteBorder'>
			          <div className = 'aboutUsSection'>
			              <div className = 'insideTitle'>
			                Displayed Pharmacy Photo
			              </div>

										<div className = 'infoContainer'>
				              <div className = 'photoBox'>
				                <div className = 'photo'> Photo </div>
				              </div>
											<div className = 'editContainer'>
												<EditIcon/>
												<div className = 'edit'>
													Edit
												</div>
											</div>
										</div>
			          </div>

								<div className = 'aboutUsSection'>
			              <div className = 'insideTitle'>
			                Displayed Pharmacy Address
			              </div>
										<div className = 'infoOutline'>
				              <div className = 'informationBox'>
				                Pharmacy Address:
				              </div>
											<div className = 'address_Container'>
					              <div className = 'addressStreet'>
													123 Pivot Avenue
					              </div>
												<div className = 'addressState'>
													California, 92612
												</div>
												<div className = 'addressCountry'>
													United States
												</div>
											</div>
											<div className = 'editContainer'>
												<EditIcon/>
												<div className = 'edit'>
													Edit
												</div>
											</div>
										</div>
			          </div>

								<div className = 'aboutUsSection'>
			              <div className = 'insideTitle'>
			                Displayed Pharmacy Name
			              </div>
										<div className = 'infoOutline'>
				              <div className = 'informationBox'>
				                Pharmacy Name:
				              </div>
											<div className = 'nameContainer'>
												Lorem ipsum dolor
											</div>
											<div className = 'editContainer'>
												<EditIcon/>
												<div className = 'edit'>
													Edit
												</div>
											</div>
										</div>
			          </div>

								<div className = 'aboutUsSection2'>
										<div className = 'insideTitle'>
											Displayed Pharmacy Contact Information
										</div>
										<div className = 'infoOutline2'>
											<div className = 'informationBox2'>
												Pharmacy Phone Number:
											</div>
											<div className = 'nameContainer'>
												Lorem ipsum dolor
											</div>
											<div className = 'editContainer'>
												<EditIcon/>
												<div className = 'edit'>
													Edit
												</div>
											</div>
										</div>
										<div className = 'infoOutline2'>
											<div className = 'informationBox2'>
												Pharmacy Email:
											</div>
											<div className = 'nameContainer'>
												Lorem ipsum dolor
											</div>
											<div className = 'editContainer'>
												<EditIcon/>
												<div className = 'edit'>
													Edit
												</div>
											</div>
										</div>
								</div>
							</div>
						</div>
      </div>
    </div>
	);
}
