const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			posts: ["https://cdn.britannica.com/55/188355-050-D5E49258/Salvatore-Corsitto-The-Godfather-Marlon-Brando-Francis.jpg", "https://media.newyorker.com/photos/5c882173b52af22cd6fe65c9/master/w_2560%2Cc_limit/720318_ra623.jpg", "https://www.indiewire.com/wp-content/uploads/2022/03/Al-Pacino-Godfather.jpg?w=3000&h=2000&crop=1", "https://decider.com/wp-content/uploads/2017/03/the-godfather.jpg?quality=80&strip=all" ]
		},
		actions: {
			// Use getActions to call a function within a fuction
			syncTokenFromSessionStorage: () => {
				const token = sessionStorage.getItem("token");
				console.log("SYNCING SESSION TOKEN" + token);
				if (token && token != "" && token != undefined)
					setStore({token: token});
			},
		//LOGOUT
		signout: () => {
			sessionStorage.removeItem("token");
			console.log('SIGNING OUT');
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
					`https://brennybaker-improved-space-couscous-44pjwqvprwg27-3001.preview.app.github.dev/api/login`,
					opts
					
				);
				console.log('Request URL:', resp)
				if (resp.status !==200) {
					console.log('THERE WAS A RESPONSE STATUS ERROR');
					return false;
				}

				const data = await resp.json();
				console.log ("TOKEN HERE", data);
				sessionStorage.setItem("token", data.access_token);
				setStore({token: data.access_token});
				return true;
			}	catch (error) {
				console.error("THERE WAS A CATCH ERROR LOADING FROM BACK END HERE!!", error);
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
				`https://brennybaker-improved-space-couscous-44pjwqvprwg27-3001.preview.app.github.dev/api/signup`,
				opts
			  );
		  
			  if (resp.status === 201 || 200) {
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
		//Comments !!
	comments: async (text, created_at, user_id, post_id) => {
  try {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
        created_at: created_at,
        user_id: 1,
        post_id: 1
      }),
    };

    console.log('POST request options:', opts);
	let dataObj={ text: text,
        user_id: user_id,
        post_id: post_id,
		created_at: created_at}
    const resp = await fetch(
      `${process.env.BACKEND_URL}/api/comments`,
      {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(dataObj)
	  }
	  //HARD CODE user_id AND post_id UP THERE
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
			