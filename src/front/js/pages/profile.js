import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css"

const Profile = () => {
const {store, actions} = useContext(Context)
    return (
<div className="page">
    <img src="https://i.redd.it/ohxlcovejd8b1.jpg"></img>
<button className="btn btn-warning">Upload</button>
{store.favorites && store.favorites.map((favorite, index) => {
    return (
        <img key={index} src={favorite.image} alt={'Favorite ${index}'}></img>
    )
})
}
</div>
)}

export default Profile