import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";


const Profile = () => {
const {store, actions} = useContext(Context)
    return (
<div className="page">
{store.favorites && store.favorites.map((favorite, index) => {
    return (
        <img key={index} src={favorite.image} alt={'Favorite ${index}'}></img>
    )
})
}
</div>
)}

export default Profile