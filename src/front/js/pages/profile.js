import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/profile.css"

const Profile = () => {
    const [image, setImage] = useState(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            let formData = new FormData();
            formData.append("file", file);
            formData.append("post_id", "your_post_id_here"); // replace with actual post id

            try {
                let response = await fetch("http://your_backend_url/post_images", {
                    method: "POST",
                    body: formData
                });

                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }

                let jsonResponse = await response.json();

                console.log(jsonResponse); // See the server response

            } catch (error) {
                console.log(error); // Log any error to the console
            }
        } else {
            // Handle error case here. The file is not an image or no file was selected.
        }
    };

    return (
        <div className="profile-container">
          <div className="profile-header">
            <h1>Profile</h1>
            <Link to="/edit-profile" className="edit-profile-link">Edit Profile</Link>
          </div>
          <div className="profile-body">
            <p><i>Update your AI-generated images from elsewhere here</i></p>
            <div className="profile-image-container">
              <label htmlFor="profile-image-input" className="profile-image-input-label">
                Select Image
              </label>
              <input
                type="file"
                id="profile-image-input"
                onChange={handleFileChange}
                className="profile-image-input"
              />
              {image && <img src={image} alt="Preview" className="profile-image" />}
            </div>
            <h3>Username</h3>
            <p>Email: user@example.com</p>
            <p>Location: City, Country</p>
            <p>Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      );
};

export default Profile;