const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		user : null,
		token: null,
		message: null,
		posts: [ 
			{id: 0, image_url: "https://images.nightcafe.studio//assets/tdraw-girl.jpg?tr=w-1200,c-at_max", title: "thing"},
			{id: 1, image_url: "https://preview.redd.it/o4egjbpsgm8b1.png?width=1456&format=png&auto=webp&v=enabled&s=c30f80a9ee898ae0a45ab6583eb06c76659f9aec", title: "shoe"},
			{id: 2, image_url: "https://i.redd.it/ohxlcovejd8b1.jpg", title: "idk"}, 
			{id: 3, image_url: "https://www.redsharknews.com/hubfs/Portrait_female_Midjourney.jpg", title: "woman"}, 
			{id: 4, image_url: "https://i.pcmag.com/imagery/articles/03a3gbCKfH8dDJnjhHLuHDf-1..v1665523315.png", title: "idek"}, 
			{id: 5, image_url: "https://preview.redd.it/uie9za2gjo7b1.png?width=1024&format=png&auto=webp&v=enabled&s=0ba5d8e71698e96edc0e13bbeb7384503f8b2202", title: "someone"}, 
			{id: 6, image_url: "https://preview.redd.it/p7t9oyas6k7b1.png?width=640&crop=smart&auto=webp&v=enabled&s=de9445c05ced8f0328bce951266657e6564fb7fd", title: "something"}, 
			{id: 7, image_url: "https://preview.redd.it/3u6yv3c8yr8b1.jpg?width=1024&format=pjpg&auto=webp&v=enabled&s=6a8ae18ed81ad0efc097af31068e785457dd903a", title: "yep"},
			{id: 8, image_url: "https://preview.redd.it/mvwfdc7z9m8b1.jpg?width=960&crop=smart&auto=webp&v=enabled&s=306c4d5bc5ee041c1ec2f44de39a69b0477f1c12", title: "dress"},
			{id: 9, image_url: "https://live.staticflickr.com/65535/52279110981_9f03201604_b.jpg", title: "land"},
			{id: 10, image_url: "https://cdnb.artstation.com/p/assets/images/images/054/123/535/large/mistral-wechatworkscreenshot-d7536e91-d937-4cae-91cc-4647d4230add.jpg?1663803273", title: "china"}

		],
		favorites: []
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
			addFavorites: (user_id, post_id) => {
				console.log(token);
				let token = getStore().token
				const payload = {
					user_id: user_id,
					post_id: post_id,
					// image_url,
					token: token
				}
				const opts = {
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
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

		},
	}
	};
  };
  
  export default getState;


