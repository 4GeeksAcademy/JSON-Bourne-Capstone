const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		user : null,
		token: null,
		message: null,
		posts: [
		  "https://steamuserimages-a.akamaihd.net/ugc/29606766018333081/5FCC3DECF7BA68C0C053AC44C1166AA2D510D15C/",
		  "https://e0.pxfuel.com/wallpapers/237/863/desktop-wallpaper-apotheon-hermes-platformer-resolution-games-and-background-hermes-logo.jpg",
		  "https://i.ytimg.com/vi/_vg-jl6_L_U/maxresdefault.jpg"
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
		generate_image: async (prompt, number, size, responseFormat) => {
			try {
				const opts = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						prompt: prompt,
						number: number,
						size: size,
						response_format: responseFormat,
					}),
				};
		
				const response = await fetch("https://brennybaker-reimagined-bassoon-pv5jp7w5wxvc7rr4-3001.preview.app.github.dev/generate_image", opts);
				if (!response.ok) {
					throw new Error("Failed to generate image");
				}
		
				const images = await response.json();
				return images;
			} catch (error) {
				console.error("Error generating image:", error);
				// Handle the error as needed
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
  
			const resp = await fetch(`https://brennybaker-reimagined-bassoon-pv5jp7w5wxvc7rr4-3001.preview.app.github.dev/api/login`, opts);
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
  
			const resp = await fetch(`https://brennybaker-reimagined-bassoon-pv5jp7w5wxvc7rr4-3001.preview.app.github.dev/api/signup`, opts);
  
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
	
			  const resp = await fetch(`https://brennybaker-reimagined-bassoon-pv5jp7w5wxvc7rr4-3001.preview.app.github.dev/api/comments`, {
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

				fetch(`https://brennybaker-reimagined-bassoon-pv5jp7w5wxvc7rr4-3001.preview.app.github.dev/api/users/favorites`, opts)
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
			const resp = await fetch(`https://brennybaker-reimagined-bassoon-pv5jp7w5wxvc7rr4-3001.preview.app.github.dev/api/hello`, opts);
  
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
		  fetch(`https://brennybaker-reimagined-bassoon-pv5jp7w5wxvc7rr4-3001.preview.app.github.dev/api/single/${index}`)
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


