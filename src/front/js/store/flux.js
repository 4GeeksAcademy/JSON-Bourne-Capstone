const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		user : null,
		token: null,
		message: null,
		posts: [ "src/front/img/Africa.jpg", "src/front/img/anime kid HD.jpg", "src/front/img/cittaVecchia.jpg", "src/front/img/Faro.jpg", "src/front/img/OVNI.jpeg", "src/front/img/degas.jpg", "src/front/img/unicorn.jpg", "src/front/img/unTigreDiaoulo.jpeg","src/front/img/Dali.jpg", "src/front/img/Rembrandt.jpg", "src/front/img/ZhouGuo.jpg", "animeProtag.jpeg",
		]
	  },
	  actions: {
		// Use getActions to call a function within a function
		syncTokenFromSessionStorage: () => {
		  const token = sessionStorage.getItem("token");
		  console.log("SYNCING SESSION TOKEN" + token);
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
				password: password
			  })
			};
  
			const resp = await fetch(`https://edgardmen-studious-parakeet-g9wqrwg6x7p299w6-3001.preview.app.github.dev/api/login`, opts);
			if (resp.status !== 200) {
			  console.log("THERE WAS A RESPONSE STATUS ERROR");
			  return false;
			}
  
			const data = await resp.json();
			console.log("Response data:", data); // Log the response data
  
			sessionStorage.setItem("token", data.access_token);
			setStore({ token: data.access_token, user: data.user_id });
			return true;
		  } catch (error) {
			console.error("THERE WAS A CATCH ERROR LOADING FROM BK END HERE!!", error);
			return false;
		  }
		},
  
		// SIGN UP
		signup: async (username, password) => {
		  try {
			const opts = {
			  method: "POST",
			  headers: { "Content-Type": "application/json" },
			  body: JSON.stringify({
				username: username,
				password: password,
				confirm_password: password
			  })
			};
  
			const resp = await fetch(`https://edgardmen-studious-parakeet-g9wqrwg6x7p299w6-3001.preview.app.github.dev/api/signup`, opts);
  
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
	
			  const resp = await fetch(`https://edgardmen-studious-parakeet-g9wqrwg6x7p299w6-3001.preview.app.github.dev/api/comments`, {
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
			addFavorites: (store, user_id, post_id, token) => {
				console.log(token);
				const payload = {
					user_id: user_id,
					post_id: post_id,
					token: token
				}
				const opts = {
					method: "POST",
					headers: {
						Authorization: `Bearer ${store.token}`,
						"Content-Type": "application/json"
					},
					body: JSON.stringify(payload)
				};

				fetch(`https://edgardmen-studious-parakeet-g9wqrwg6x7p299w6-3001.preview.app.github.dev/api/users/favorites`, opts)
				.then(response => response.json())
				.then(data => {
					setStore({ favorites: data.favorites });
					console.log(data)
				})
				.catch(error => console.log(error))

			},
		// GET MESSAGE
		getMessage: async () => {
		  const store = getStore();
  
		  // Check if a token exists
		  if (!store.token) {
			console.log("No token found");
			return;
		  }
  
		  const opts = {
			headers: {
			  Authorization: `Bearer ${store.token}`
			}
		  };
  
		  try {
			const resp = await fetch(`https://edgardmen-studious-parakeet-g9wqrwg6x7p299w6-3001.preview.app.github.dev/api/hello`, opts);
  
			if (resp.status === 401) {
			  console.log("Unauthorized: Token is invalid or expired");
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
  
		// EXPLORE
		explore: (index) => {
		  fetch(`https://edgardmen-studious-parakeet-g9wqrwg6x7p299w6-3001.preview.app.github.dev/api/single/${index}`)
			.then(response => response.json())
			.then(posts => {
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
			});
		}
	  }
	};
  };
  
  export default getState;


