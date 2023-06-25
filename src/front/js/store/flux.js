const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      favorites: [],
      posts: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/640px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg",
        "https://picsum.photos/id/237/200/300",
       "https://picsum.photos/seed/picsum/200/300",
       "https://picsum.photos/200/300?grayscale"
      ],
    },
    actions: {
      // Use getActions to call a function within a function
      syncTokenFromSessionStorage: () => {
        const token = sessionStorage.getItem("token");
        console.log("SYNCING SESSION TOKEN: " + token);
        if (token && token !== "" && token !== undefined) {
          setStore({ token: token });
        }
      },
      // LOGOUT
      signout: () => {
        sessionStorage.removeItem("token");
        console.log("SIGNING OUT");
        setStore({ token: null });
      },

      // LOGIN
      login: async (username, password) => {
        try {
          const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          };

          const resp = await fetch(
            `${process.env.BACKEND_URL}/api/login`,
            opts
          );

          console.log("Request URL:", resp);

          if (resp.status !== 200) {
            console.log("THERE WAS A RESPONSE STATUS ERROR");
            return false;
          }

          const data = await resp.json();
          console.log("TOKEN HERE", data);
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error(
            "THERE WAS A CATCH ERROR LOADING FROM BACK END HERE!!",
            error
          );
        }
      },

	  
      signup: async (username, password) => {
        try {
          const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: username,
              password: password,
              confirm_password: password,
            }),
          };

          const resp = await fetch(
            `${process.env.BACKEND_URL}/api/signup`,
            opts
          );

          if (resp.status === 201 || resp.status === 200) {
            console.log("User registered successfully");
            return true;
          } else if (resp.status === 409) {
            console.log("Username already registered");
            return false;
          } else {
            console.log("Failed to register user" + resp.status);
            return false;
          }
        } catch (error) {
          console.error("Error occurred during registration:", error);
          return false;
        }
      },

      // COMMENTS
      comments: async (text, created_at, user_id, post_id) => {
        try {
          const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: text,
              created_at: created_at,
              user_id: user_id,
              post_id: post_id,
            }),
          };

          console.log("POST request options:", opts);

          let dataObj = {
            text: text,
            user_id: user_id,
            post_id: post_id,
            created_at: created_at,
          };

          const resp = await fetch(`${process.env.BACKEND_URL}/api/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataObj),
          });

          console.log("Response status:", resp.status);

          if (resp.status !== 200) {
            console.log("There was a response status error");
            return false;
          }

          const data = await resp.json();
          console.log("Response data:", data);

          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error(
            "There was a catch error loading from the backend:",
            error
          );
        }
      },

      // FAVORITES
      addFavorites: async (user_id, post_id) => {
        const payload = {
          user_id,
          post_id,
        };

        const opts = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getStore().token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        };

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/users/favorites`,
            opts
          );
          const data = await response.json();
          setStore({ favorites: data.favorites });
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },

      // GET MESSAGE
      getMessage: async () => {
        const store = getStore();

        if (!store.token) {
          console.log("No token found");
          return;
        }

        const opts = {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        };

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/hello`,
            opts
          );

          if (response.status === 401) {
            console.log("Unauthorized: Token is invalid or expired");
            return;
          }

          if (response.ok) {
            const data = await response.json();
            setStore({ message: data.message });
          } else {
            console.log("Error loading message from backend:", response.status);
          }
        } catch (error) {
          console.error("Error loading message from backend:", error);
        }
      },

      // HOME/EXPLORE
      explore: () => {
        fetch("/api/single")
          .then((response) => response.json())
          .then((posts) => {
            const gridContainer = document.getElementById("grid-container");
            posts.forEach((post) => {
              const postDiv = document.createElement("div");
              postDiv.className = "post";
              postDiv.innerHTML = `
				  <img src="${post.image_url}" alt="${post.title}">
				  <h2>${post.title}</h2>
				  <p>${post.content}</p>
				`;
              gridContainer.appendChild(postDiv);
            });
          });
      },
    },
  };
};

export default getState;
