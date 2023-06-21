const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			posts: ["s3://storingaigoraphotos/OVNI.jpeg", "s3://storingaigoraphotos/Faro.jpg"]
		},
		actions: {
			// Use getActions to call a function within a fuction
			syncTokenFromSessionStorage: () => {
				const token = sessionStorage.getItem("token");
				console.log("SYNCINGSESIONTOKEN");
				if (token && token != "" && token != undefined)
					setStore({token: token});
			},
		//LOGOUT
		signout: () => {
			sessionStorage.removeItem("token");
			console.log('SIGNINGOUT');
			setStore({token: null});
		},

		//LOGIN !!
		login: async (username, password) => {
			try {
				const opts = {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({
						username: username,
						password: password,
					}),
				};

				const resp = await fetch (
					`${process.env.BACKEND_URL}/api/login`,
					opts
				);
				if (resp.status !==200) {
					console.log('THERE WAS A RESPONSE STATUS ERROR');
					return false;
				}

				const data = await resp.json();
				console.log ("TOKEN BACK HERE", data);
				sessionStorage.setItem("token", data.access_token);
				setStore({token: data.access_token});
				return true;
			}	catch (error) {
				console.error("THERE WAS A CATCH ERROR LOADING FROM BK END HERE!!", error);
			}
		},

			
			getMessage: async () => {
				const store = getStore();

				// Check if a token exists
				if (!store.token) {
					console.log("No token found");
					return;
				}

				const opts = {
					headers: {
						Authorization: `Beare ${store.token}`,
					},
				};

				try {
					const resp = await fetch(
						`${process.env.BACKEND_URL}/api/hello`,
						opts
					);

					if (resp.status === 401) {
						console.log("Unauthorized: Token is invalid or expierd");
						return;
					}

					if (resp.ok) {
						const data = await resp.json();
						setStore({ message: data.message });
					  } else {
						console.log("Error loading message from backend:", resp.status);
					  }
					} catch (error) {
					  console.error("Error loading message from backend:", error);
					}
				  },
				// HOME/ EXPLORE
				explore:()=>{
					fetch('/api/single')
					.then(response => response.json())
					.then(posts => {
						const gridContainer = document.getElementById('grid-container');
						posts.forEach(post => {
							const postDiv = document.createElement('div');
							postDiv.className = 'post';
							postDiv.innerHTML = `
								<img src="${post.image_url}" alt="${post.title}">
								<h2>${post.title}</h2>
								<p>${post.content}</p>
							`;
							gridContainer.appendChild(postDiv);
						});
					});
				},
						//Comments !!
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

			  const resp = await fetch(
				`${process.env.BACKEND_URL}/api/comments`,
				opts
			  );

			  if (resp.status !== 200) {
				console.log('THERE WAS A RESPONSE STATUS ERROR');
				return false;
			  }

			  const data = await resp.json();
			  console.log("TOKEN BACK HERE", data);
			  sessionStorage.setItem("token", data.access_token);
			  setStore({ token: data.access_token });
			  return true;
			} catch (error) {
			  console.error("THERE WAS A CATCH ERROR LOADING FROM BACKEND HERE!!", error);
			}
		  },

				},
			  };
			};

			export default getState;
			