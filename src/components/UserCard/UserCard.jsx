import React from 'react';
import "../UserCard/UserCard.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../stores/UserStore';

export default function UserCard({ user }) {
    const navigate = useNavigate();
    const token = userStore((state) => state.token);

    // Traduzindo a prioridade de int para string
    const translateTypeOfUser = (typeOfUserInt) => {
        switch (typeOfUserInt) {
            case 100:
                return "Developer";
            case 200:
                return "Scrum Master";
            case 300:
                return "Product Owner";
            default:
                return "";
        }
    }

    const typeOfUserString = translateTypeOfUser(typeOfUser);

    const getTypeOfUserBorderClass = () => {
        switch (typeOfUserString) {
            case "Developer":
                return "border-red";
            case "Scrum Master":
                return "border-yellow";
            case "Product Owner":
                return "border-green";
            default:
                return "";
        }
    }

    const typeOfUserBorderClass = getTypeOfUserBorderClass();

    const handleEraseUser = async () => {

    };

    const handleDeleteUser = async () => {

    };

    const handleRestoreUser = async () => {

    };

    return (
        <div className={`user ${typeOfUserBorderClass}`} style={{ backgroundColor: visible ? "#EDEDED" : "white" }}>
            {visible ? (
                <div className="user-username-solo user-username-solo-visible">
                    {user.name}
                </div>
            ) : (
                <Link to={`/edit-user/${id}`} className="user-username-solo">
                    {user.name}
                </Link>
            )}
            {visible ? (
                <div className="user-del-restore">
                    <div className="user-restore">
                        <img src="multimedia/reload1-03.png" alt="Restore" className="restore-icon" onClick={handleRestoreUser} />
                    </div>
                    <div className="user-delete">
                        <img src="multimedia/dark-cross-01.png" alt="Delete" className="delete-icon" onClick={handleDeleteUser} />
                    </div>
                </div>
            ) : (
                <div className="user-visible">
                    <img src="multimedia/dark-cross-01.png" alt="Visible" className="visible-icon" onClick={handleEraseUser} />
                </div>
            )}
        </div>
    );
}