import React from "react";
import "../Password/Password.css";
import { userStore } from "../../stores/UserStore";
import { useState } from "react";

function Password() {
    const [inputs, setInputs] = useState("");
    const username = userStore((state) => state.username);
    const token = userStore((state) => state.token);
    const password = userStore((state) => state.password);

    const updatePassword = inputs.currentPassword;
    const updateNewPassword = inputs.newPassword;
    const updateNewPasswordConfirm = inputs.newPasswordConfirm;


    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (updateNewPassword !== updateNewPasswordConfirm) {
            alert("Passwords do not match");
            return;
        } else {

        try {
            const response = await fetch(
                `http://localhost:8080/project_backend/rest/users/update/${username}/password`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                        oldPassword: updatePassword,
                        newPassword: updateNewPassword,
                    },
                    body: JSON.stringify(password),
                }
            );

            if (response.ok) {
                const password = await response.json();
                updatePassword = password;
            } else {
                const responseBody = await response.text();
                console.error("Error updating password:", response.statusText, responseBody);
            }
        } catch (error) {
            console.error("Error updating password:", error);
        }
    }
    };

    const handleCancel = (event) => {
        event.preventDefault();        
    }
    
    return (
            <div className="passwordPanel">
                <form className="password-register" id="password-form" onSubmit={handleSubmit}>
                    <div className="password-fieldsContainer">
                            <label className="labels-password" id="change-password-label">Change Password</label>
                            <label className="labels-password" id="currentPass-password-label">Current password</label>
                            <input type="password" className="password-fields" id="currentPassword-password" name="currentPassword" onChange={(e) => updatePassword(e.target.value)}/>
                            <label className="labels-password" id="newPass-password-label">New password</label>
                            <input type="password" className="password-fields" id="newPassword-password" name="newPassword" onChange={(e) => updateNewPassword(e.target.value)}/>
                            <label className="labels-password" id="newPassConfirm-password-label">Confirm new password</label>
                            <input type="password" className="password-fields" id="newPasswordConfirm-password" name="newPasswordConfirm" onChange={(e) => updateNewPasswordConfirm(e.target.value)}/>
                    </div>
                    <div className="password-Buttons">
                        <button type="submit" id="password-save-button">Save</button>
                        <button type="reset" id="password-cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
    );
}

export default Password;