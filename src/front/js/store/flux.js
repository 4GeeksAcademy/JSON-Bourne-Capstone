const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		user : null,
		token: sessionStorage.getItem('token') || null,
		message: null,
		// text: null,
		favorites: null,
		posts: [
		  "https://images.nightcafe.studio//assets/tdraw-girl.jpg?tr=w-1200,c-at_max/",
		  "https://e0.pxfuel.com/wallpapers/237/863/desktop-wallpaper-apotheon-hermes-platformer-resolution-games-and-background-hermes-logo.jpg",
		  "https://i.redd.it/ohxlcovejd8b1.jpg",
		  "https://www.redsharknews.com/hubfs/Portrait_female_Midjourney.jpg",
		  "https://i.pcmag.com/imagery/articles/03a3gbCKfH8dDJnjhHLuHDf-1..v1665523315.png",
		  "https://preview.redd.it/uie9za2gjo7b1.png?width=1024&format=png&auto=webp&v=enabled&s=0ba5d8e71698e96edc0e13bbeb7384503f8b2202",
		  "https://preview.redd.it/p7t9oyas6k7b1.png?width=640&crop=smart&auto=webp&v=enabled&s=de9445c05ced8f0328bce951266657e6564fb7fd",
		  "https://preview.redd.it/3u6yv3c8yr8b1.jpg?width=1024&format=pjpg&auto=webp&v=enabled&s=6a8ae18ed81ad0efc097af31068e785457dd903a",
		  "https://preview.redd.it/mvwfdc7z9m8b1.jpg?width=960&crop=smart&auto=webp&v=enabled&s=306c4d5bc5ee041c1ec2f44de39a69b0477f1c12",
		  "https://live.staticflickr.com/65535/52279110981_9f03201604_b.jpg",
		  "https://cdnb.artstation.com/p/assets/images/images/054/123/535/large/mistral-wechatworkscreenshot-d7536e91-d937-4cae-91cc-4647d4230add.jpg?1663803273",
		  "https://wp.technologyreview.com/wp-content/uploads/2023/03/ai-chongqing-6.png",
		  "https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxtT0dKa1pEUTFNeTFsTVRBekxUUmpPR010WVRGa01TMDFaR1V3WlRGaE9UZ3dZVEFHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--c2444fb788234372d53c042aea2e717ff1a72dc8/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--9e9280d525ba1fc2f95c971c0fbcb4a2ca8b55dd/prompthero-prompt-2fbba09f599.png",
		  "https://www.creativeshrimp.com/wp-content/uploads/2022/06/midjourney_aiart_gleb_alexandrov_16-1024x731.jpg",
		  "https://laughingsquid.com/wp-content/uploads/2022/08/Enter-Sandman-AI-Images.jpg",
		  "https://preview.redd.it/h973ocxrrs6b1.jpg?width=960&crop=smart&auto=webp&v=enabled&s=b9610937c85844af0ecb7f0750f2792de76b1fef",
		  "https://preview.redd.it/y2j9epld2p5b1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=332c5ea8af2b3ee76f76d82634fe5a3cef89a537",
		  "https://imgeng.jagran.com/images/2023/jun/hollywood%20celebrities1685881953412.jpg",
		  "https://media.licdn.com/dms/image/D4E1EAQF0ZCJ1ULhk9w/event-background-image-crop_720_1280/0/1665711055058?e=2147483647&v=beta&t=Dl66aka5EjixfHuI0zVrkFsF-qDmf5xZHdQ3QCL2uG0",
		  "https://miro.medium.com/v2/resize:fit:720/format:webp/1*Yzesp8TtwwuwFnzb75MjxA.png"

		]
	  },
	  actions: {
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
			  headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer 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"
			  },
			  body: JSON.stringify({
				prompt: prompt,
				number: number,
				size: size,
				response_format: responseFormat,
			  }),
			};
	  
			const response = await fetch("https://brennybaker-urban-doodle-9vg7j65g5wrh9p-3001.preview.app.github.dev/api/generate_image", opts);
			if (!response.ok) {
			  const errorResponse = await response.json();
			  console.log("Error response:", errorResponse);
			  throw new Error("Failed to generate image");
			}
	  
			const images = await response.json();
			return images;
		  } catch (error) {
			console.error("Error generating image:", error);
			// Handle the error as needed
		  }
		},
	  
		signout: () => {
		  const opts = {
			method: "POST",
			headers: {
			  Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
			  Bearer: "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"
			}
		  };
	  
		  fetch("https://brennybaker-urban-doodle-9vg7j65g5wrh9p-3001.preview.app.github.dev/api/logout", opts)
			.then(response => {
			  if (response.ok) {
				sessionStorage.removeItem("access_token");
				console.log("SIGNING OUT");
				setStore({ token: null });
				window.location.href = "/";
			  } else {
				console.log("Logout failed");
			  }
			})
			.catch(error => {
			  console.log("Fetch error:", error);
			});
		},
	  
		login: async (username, password) => {
		  try {
			const opts = {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer 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"
			  },
			  body: JSON.stringify({
				username: username,
				password: password
			  })
			};
	  
			const resp = await fetch("https://brennybaker-urban-doodle-9vg7j65g5wrh9p-3001.preview.app.github.dev/api/login", opts);
			if (resp.status !== 200) {
			  console.log("THERE WAS A RESPONSE STATUS ERROR");
			  return false;
			}
	  
			const data = await resp.json();
			console.log("Response data:", data);
			console.log(data.user_id);
			sessionStorage.setItem("token", data.access_token);
			setStore({ token: data.access_token, user: data.user_id });
			return true;
		  } catch (error) {
			console.error("THERE WAS A CATCH ERROR LOADING FROM BK END HERE!!", error);
			return false;
		  }
		},
	  
		signup: async (username, password) => {
		  try {
			const opts = {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer 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"
			  },
			  body: JSON.stringify({
				username: username,
				password: password,
			  })
			};
	  
			const resp = await fetch("https://brennybaker-urban-doodle-9vg7j65g5wrh9p-3001.preview.app.github.dev/api/signup", opts);
	  
			if (resp.status === 201 || resp.status === 200) {
			  const data = await resp.json();
			  console.log("User registered successfully", data);
			  return true;
			} else if (resp.status === 409) {
			  console.log("Username already registered");
			  return false;
			} else {
			  console.log("Failed to register user. Status code:", resp.status);
			  return false;
			}
		  } catch (error) {
			console.error("Error occurred during registration:", error);
			return false;
		  }
		},
	  
		comments: async (text, created_at, user_id, post_id) => {
			try {
			  const opts = {
				method: "POST",
				headers: { "Content-Type": "application/json",
				Authorization: "Bearer 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" },
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
	
			  const resp = await fetch(`https://brennybaker-urban-doodle-9vg7j65g5wrh9p-3001.preview.app.github.dev/api/comments`, {
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
	  
		addFavorites: (store, userId, post_id) => {
		  const payload = {
			user_id: userId,
			post_id: post_id,
		  };
		  const opts = {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			  Authorization: "Bearer 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",
			},
			body: JSON.stringify(payload),
		  };
	  
		  fetch("https://brennybaker-urban-doodle-9vg7j65g5wrh9p-3001.preview.app.github.dev/api/users/favorites", opts)
			.then((response) => response.json())
			.then((data) => {
			  actions.updateFavorites(data.favorites);
			  console.log(data);
			})
			.catch((error) => console.log(error));
		},
	  
		removeFavorites: (store, userId, post_id) => {
		  const opts = {
			method: "DELETE",
			headers: {
			  Authorization: `Bearer ${store.token}`,
			  "Content-Type": "application/json",
			  Authorization: "Bearer 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",
			},
		  };
	  
		  fetch(`https://brennybaker-urban-doodle-9vg7j65g5wrh9p-3001.preview.app.github.dev/api/users/favorites/${post_id}`, opts)
			.then((response) => response.json())
			.then((data) => {
			  actions.updateFavorites(data.favorites);
			  console.log(data);
			  actions.updateFavorites(data.favorites);
			})
			.catch((error) => console.log(error));
		},
	  
		getMessage: async () => {
		  const store = getStore();
	  
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
			const resp = await fetch("https://brennybaker-urban-doodle-9vg7j65g5wrh9p-3001.preview.app.github.dev/api/hello", opts);
	  
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
	  
		explore: (index) => {
		  const headers = {
			Authorization: 'Bearer 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'
		  };
	  
		  fetch(`https://brennybaker-urban-doodle-9vg7j65g5wrh9p-3001.preview.app.github.dev/api/single/${index}`, {
			headers: headers
		  })
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
	}};
	  export default getState;