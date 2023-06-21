import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/explore.css"

const Explore = () => {
    const {store, actions} = useContext(Context)
    console.log(store.posts);
    return (
        <div className="entirePage">
            {store.posts.map((item, index)=> {
                return (
                    <div className="eachCard">
                        <h1>Some title</h1>
                        <img src={item.image}></img>
                        </div>
                )
            })}
        </div>
    )
}

export default Explore