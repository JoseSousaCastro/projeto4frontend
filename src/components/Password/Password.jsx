import React from "react";
import "../Password/Password.css";
import { userStore } from "../../stores/UserStore";

function Password() {
    const username = userStore(state => state.username);

    
    return (
            <div className="passwordPanel">
                <form class="password-register" id="password-form">
                    <div class="password-fieldsContainer">
                            <label class="labels-password" id="currentPass-password-label">Current password</label>
                            <input type="password" class="password-fields" id="currentPass-password" name="currentPassword" required />
                            <label class="labels-password" id="newPass-password-label">New password</label>
                            <input type="password" class="password-fields" id="newPassword-password" name="newPassword" />
                            <label class="labels-password" id="newPassConfirm-password-label">Confirm new password</label>
                            <input type="password" class="password-fields" id="newPasswordConfirm-password" name="nemPasswordConfirm" />
                    </div>
                    <div class="password-Buttons">
                        <button type="submit" id="password-save-button">Save</button>
                        <button type="reset" id="password-cancel-button">Cancel</button>
                    </div>
                </form>
            </div>
    );
}