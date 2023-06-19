import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import Comments from "./comments";

export const Single = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();
  console.log("IAM HERERERER");

  const commentData = {
    user_id: "user_id_value",
    post_id: "post_id_value"
  };

  const handleDoubleCLick = () => {
    navigate("/");
  };

  return (
    <div className="text-center mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <Comments actions={actions} commentData={commentData} />
          </div>
          <div className="col-lg-6" onDoubleClick={handleDoubleCLick}>
            <div>
              <img src={rigoImageUrl} alt="Rigo" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
      <h1>SINGLE VIEW</h1>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};
