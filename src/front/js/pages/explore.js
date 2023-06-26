import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/explore.css";

const Explore = () => {
  const { store } = useContext(Context);
  console.log(store.posts);
  console.log(store.posts, "POSTEXPLORE");

  return (
    <div className="entirePage">
      {store.posts.map((item, index) => {
        return (
          <div className="eachCard" key={index}>
            <h1>Some title</h1>
            <Link to={`/single/${index}`}>
              <img src={item} alt={`Image ${index}`} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Explore;

// import React, { useContext, useEffect } from "react";
// import { Context } from "../store/appContext";
// import { Link, useNavigate } from "react-router-dom";
// import "../../styles/explore.css";

// const Explore = () => {
//   const {store, actions} = useContext(Context)
//   console.log(store.posts);
//   console.log(store.posts, "POST");
//   return (
//       <div className="entirePage">
//           {store.posts.map((item, index)=> {
//               return (
//                   <div className="eachCard">
//                      <h1>Some title</h1>
//                       <Link to={`/single/${item.id}`}>
//                       <img src={item.image}></img>
//                       <img src={item}></img>
//                       </Link>
//                       </div>
//               )
//           })}
//      </div>
//  )
// }
// export default Explore
