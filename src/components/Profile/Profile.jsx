import React, { useState } from "react";
import "../Profile/Profile.css";
import { userStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [inputs, setInputs] = useState("");
    const navigate = useNavigate();

    const token = userStore((state) => state.token);

    const username = userStore((state) => state.username);
    const email = userStore((state) => state.email);
    const firstName = userStore((state) => state.firstName);
    const lastName = userStore((state) => state.lastName);
    const phone = userStore((state) => state.phone);
    const photoURL = userStore((state) => state.photoURL);
    const updateEmail = userStore((state) => state.updateEmail);
    const updateFirstName = userStore((state) => state.updateFirstName);
    const updateLastName = userStore((state) => state.updateLastName);
    const updatePhone = userStore((state) => state.updatePhone);
    const updatePhotoURL = userStore((state) => state.updatePhotoURL);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            username: username,
            email: inputs.email,
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            phone: inputs.phone,
            photoURL: inputs.photoURL,
        };

        try {
            const response = await fetch(
                `http://localhost:8080/project_backend/rest/users/update/${username}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                    body: JSON.stringify(user),
                }
            );

            if (response.ok) {
                const user = await response.json();
                updateEmail(user.email);
                updateFirstName(user.firstName);
                updateLastName(user.lastName);
                updatePhone(user.phone);
                updatePhotoURL(user.photoURL);

                navigate("/home", { replace: true });
            } else {
                const responseBody = await response.text();
                console.error("Error updating profile:", response.statusText, responseBody);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/home", { replace: true });
    };

    return (
        <div>
            <div className="editProfilePanel">
                <label id="username-title-editProfile">{username}</label>
                <form className="editProfile-register" id="edit-profile-form" onSubmit={handleSubmit}>
                    <div className="editProfile-fieldsContainer">
                        <div className="left-fields-editProfile">
                            <label className="labels-edit-profile" id="email-editProfile-label">Email</label>
                            <input type="email" className="editProfile-fields" id="email-editProfile" onChange={(e) => updateEmail(e.target.value)} required value={email}></input>
                            <label className="labels-edit-profile" id="firstName-editProfile-label">First Name</label>
                            <input type="text" className="editProfile-fields" id="firstName-editProfile" name="firstName" onChange={(e) => updateFirstName(e.target.value)} required value={firstName}></input>
                            <label className="labels-edit-profile" id="lastName-editProfile-label">Last Name</label>
                            <input type="text" className="editProfile-fields" id="lastName-editProfile" name="lastName" onChange={(e) => updateLastName(e.target.value)} required value={lastName}></input>
                            <label className="labels-edit-profile" id="phone-editProfile-label">Phone</label>
                            <input type="text" className="editProfile-fields" id="phone-editProfile" name="phone" onChange={(e) => updatePhone(e.target.value)} required value={phone}></input>
                            <label className="labels-edit-profile" id="photoURL-editProfile-label">Photo URL</label>
                            <input type="url" className="editProfile-fields" id="photoURL-editProfile" name="photoURL" onChange={(e) => updatePhotoURL(e.target.value)} required value={photoURL}></input>
                        </div>
                    </div>
                    <div className="editProfile-Buttons">
                        <button type="submit" id="profile-save-button">Save</button>
                        <button type="reset" id="profile-cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;