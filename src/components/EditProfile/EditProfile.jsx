import React, { useState } from "react";
import "./EditProfile.css";

function EditProfile() {
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        photoURL: ""
    });


  return (
    <div>
      <div className="editProfilePanel">
      <label id="username-title-editProfile">Username</label>
            <label id="typeOfUser-title-editProfile"></label>
            <form class="editProfile-register" id="edit-profile-form">
                <div class="editProfile-fieldsContainer">
                    <div class="left-fields-editProfile">
                        <label class="labels-edit-profile" id="currentPass-editProfile-label">Current password (non-editable)</label>
                        <input type="password" class="editProfile-fields" id="currentPass-editProfile" name="currentPassword" required readonly />
                        <label class="labels-edit-profile" id="newPass-editProfile-label">New password</label>
                        <input type="password" class="editProfile-fields" id="newPassword-editProfile" name="newPassword" />
                        <label class="labels-edit-profile" id="newPassConfirm-editProfile-label">Confirm new password</label>
                        <input type="password" class="editProfile-fields" id="newPasswordConfirm-editProfile" name="nemPasswordConfirm" />
                        <label class="labels-edit-profile" id="email-editProfile-label">Email</label>
                        <input type="email" class="editProfile-fields" id="email-editProfile" name="email" placeholder="" />
                    </div>
                    <div class="right-fields-editProfile">
                        <label class="labels-edit-profile" id="firstName-editProfile-label">First Name</label>
                        <input type="text" class="editProfile-fields" id="firstName-editProfile" name="firstName" placeholder="" />
                        <label class="labels-edit-profile" id="lastName-editProfile-label">Last Name</label>
                        <input type="text" class="editProfile-fields" id="lastName-editProfile" name="lastName" placeholder="" />
                        <label class="labels-edit-profile" id="phone-editProfile-label">Phone</label>
                        <input type="text" class="editProfile-fields" id="phone-editProfile" name="phone" placeholder="" />
                        <label class="labels-edit-profile" id="photoURL-editProfile-label">Photo URL</label>
                        <input type="url" class="editProfile-fields" id="photoURL-editProfile" name="photoURL" placeholder="" />
                    </div>
                </div>
                <div class="editProfile-Buttons">
                        <button type="submit" id="profile-save-button">Save</button>
                        <button type="reset" id="profile-cancel-button">Cancel</button>
                </div>
            </form>
            </div>
    </div>
  );
}

export default EditProfile;