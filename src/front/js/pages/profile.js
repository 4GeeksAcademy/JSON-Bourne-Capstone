import React, { useState } from 'react';
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
                let response = await fetch("/post_images", {
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
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <input type="file" onChange={handleFileChange} className="mb-3" />
            {image && <img src={image} alt="Preview" />}
        </div>
    );
};

export default Profile;
