const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			favorites: [],
			posts: ["https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/640px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg"],
			username: null
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
				window.location.href = "/";
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

					if (resp.status !== 200) {
						console.log('THERE WAS A RESPONSE STATUS ERROR');
						return false;
					}

					const data = await resp.json();
					console.log("Response data:", data); // Log the response data

					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token, username: data.username });

					return true;
				} catch (error) {
					console.error("THERE WAS A CATCH ERROR LOADING FROM BACK END HERE!!", error);
				}
			},
			// SIGNUP
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
						`${process.env.BACKEND_URL}api/signup`,
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

					console.log('POST request options:', opts);

					let dataObj = {
						text: text,
						user_id: user_id,
						post_id: post_id,
						created_at: created_at
					};

					const resp = await fetch(
						`${process.env.BACKEND_URL}api/comments`,
						{
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify(dataObj)
						}
					);

					console.log('Response status:', resp.status);

					if (resp.status !== 200) {
						console.log('There was a response status error');
						return false;
					}

					const data = await resp.json();
					console.log("Response data:", data);

					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					return true;
				} catch (error) {
					console.error("There was a catch error loading from the backend:", error);
				}
			},
			// FAVORITES
			addFavorites: async (user_id, post_id) => {
				const payload = {
					user_id,
					post_id
				};

				const opts = {
					method: "POST",
					headers: {
						Authorization: `Bearer ${getStore().token}`,
						"Content-Type": "application/json"
					},
					body: JSON.stringify(payload)
				};

				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/users/favorites`, opts);
					const data = await response.json();
					setStore({ favorites: data.favorites });
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			// GET MESSAGE
			getMessage: async () => {
				try {
					const token = sessionStorage.getItem("token");
					const opts = {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					};

					const resp = await fetch(
						`${process.env.BACKEND_URL}/api/message`,
						opts
					);

					if (resp.status !== 200 || 201) {
						console.log('THERE WAS A RESPONSE STATUS ERROR');
						return null;
					}

					const data = await resp.json();

					if (!data || typeof data.username === 'undefined') {
						console.log('Response data or username property is undefined');
						return null;
					}

					console.log("Message data:", data);
					return data.username;
				} catch (error) {
					console.error("THERE WAS A CATCH ERROR LOADING FROM BACK END HERE!!", error);
					return null;
				}
			},
			// HOME/EXPLORE
			explore: async () => {
				try {
					const opts = {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					};

					const resp = await fetch(
						`${process.env.BACKEND_URL}api/explore`,
						opts
					);

					if (resp.status !== 200) {
						console.log("There was a response status error");
						return;
					}

					const posts = await resp.json();

					const gridContainer = document.getElementById("grid-container");
					posts.forEach(post => {
						const postDiv = document.createElement("div");
						postDiv.className = "post";
						postDiv.innerHTML = `
							<img src="${post.image_url}" alt="${post.title}">
							<h2>${post.title}</h2>
							<p>${post.content}</p>
						`;
						gridContainer.appendChild(postDiv);
					});
				} catch (error) {
					console.error("There was a catch error loading from the backend:", error);
				}
			}
		}
	};
};

export default getState;

