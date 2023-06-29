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
			{id: 10, image_url: "https://cdnb.artstation.com/p/assets/images/images/054/123/535/large/mistral-wechatworkscreenshot-d7536e91-d937-4cae-91cc-4647d4230add.jpg?1663803273", title: "china"},
			{id: 11, image_url: "https://preview.redd.it/p31c52c4lr3b1.png?width=1024&format=png&auto=webp&v=enabled&s=25c23b331b8bc8a2df74144165d92423e6313743"},
			{id: 12, image_url: "https://preview.redd.it/n7d5u1anvk3b1.jpg?width=1024&format=pjpg&auto=webp&v=enabled&s=d6ef647420e295f71bb752dd814e57a6bccdee9d"},
			{id: 13, image_url: "https://preview.redd.it/y2j9epld2p5b1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=332c5ea8af2b3ee76f76d82634fe5a3cef89a537"},
			{id:14, image_url: "https://preview.redd.it/h973ocxrrs6b1.jpg?width=960&crop=smart&auto=webp&v=enabled&s=b9610937c85844af0ecb7f0750f2792de76b1fef"},
			{id:15, image_url: "https://preview.redd.it/t5w2x4kuh86b1.jpg?width=960&crop=smart&auto=webp&v=enabled&s=b30995991a38ba420e43bf00aa0fce45b45c3725"},
			{id:16, image_url: "https://imgeng.jagran.com/images/2023/jun/hollywood%20celebrities1685881953412.jpg"},
			{id: 17, image_url: "https://laughingsquid.com/wp-content/uploads/2022/08/Enter-Sandman-AI-Images.jpg"},
			{id: 18, image_url: "https://www.protocol.com/media-library/yellow-and-blue-dragon-in-the-sky.png?id=31823462&width=1245&height=700&quality=85&coordinates=0%2C202%2C0%2C246"},
			{id: 19, image_url: "https://images.squarespace-cdn.com/content/v1/5b549cf4b27e39707a5804a7/832e4f9f-2a5d-42eb-9f31-4e69c99dd75a/DALL%C2%B7E+2022-07-06+17.26.33+-+Homer+Simpson+is+mid-air+jumping+on+a+trampoline%2C+Professional+book+cover+design%2C+IMG_00299371.tiff.png?format=1000w"},
			{id: 20, image_url: "https://s.yimg.com/ny/api/res/1.2/BBtgBuUnZ4yE_KK0mqtE6g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04NzY-/https://s.yimg.com/os/creatr-uploaded-images/2022-04/cacc8fa0-b652-11ec-af75-438ac34a567d"},
			{id: 21, image_url: "https://www.creativeshrimp.com/wp-content/uploads/2022/06/midjourney_aiart_gleb_alexandrov_16-1024x731.jpg"},
			{id: 22, image_url: "https://prompthero.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxtT0dKa1pEUTFNeTFsTVRBekxUUmpPR010WVRGa01TMDFaR1V3WlRGaE9UZ3dZVEFHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--c2444fb788234372d53c042aea2e717ff1a72dc8/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDRG9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkIya0NBQWd3T2dwellYWmxjbnNKT2hOemRXSnpZVzF3YkdWZmJXOWtaVWtpQjI5dUJqb0dSVlE2Q25OMGNtbHdWRG9PYVc1MFpYSnNZV05sVkRvTWNYVmhiR2wwZVdsZiIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--9e9280d525ba1fc2f95c971c0fbcb4a2ca8b55dd/prompthero-prompt-2fbba09f599.png"},
			{id: 23, image_url: "https://www.betchashesews.com/wp-content/uploads/2022/06/andre-the-giant-in-the-style-of-daniel-clowes-midjourney-portrait.jpg"},
			{id: 24, image_url: "https://wp.technologyreview.com/wp-content/uploads/2023/03/ai-chongqing-6.png"},
			// {id: 26, image_url: ""},
			// {id: 27, image_url: ""},
			// {id: 28, image_url: ""},
			// {id: 29, image_url: ""},
			// {id: 30, image_url: ""},
			// {id: 31, image_url: ""},
			// {id: , image_url: ""},
			// {id: , image_url: ""},
			// {id: , image_url: ""},
			// {id: , image_url: ""},
			// {id: , image_url: ""},
			// {id: , image_url: ""},
			// {id: , image_url: ""}
		],
		favorites: []
	  },
	  actions: {
		syncTokenFromSessionStorage: () => {
		  const token = sessionStorage.getItem("token");
		  console.log("SYNCING SESSION TOKEN" + token);
		  if (token && token !== "" && token !== undefined) {
			setStore({ token: token });
		  }
		},
  

			// GENERATE IMAGES
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
		
				const response = await fetch(`${process.env.BACKEND_URL}/api/generate_image`, opts);
				if (!response.ok) {
					const errorResponse = await response.json();
					console.log("Error response:", errorResponse)
					throw new Error("Failed to generate image");
				}
		
				const images = await response.json();
				return images;
			} catch (error) {
				console.error("Error generating image:", error);
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
  
			const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, opts);
			if (resp.status !== 200) {
			  console.log("THERE WAS A RESPONSE STATUS ERROR");
			  return false;
			}
  
			const data = await resp.json();
			console.log("Response data:", data); 
  
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
  
			const resp = await fetch(`${process.env.BACKEND_URL}/api/signup`, opts);
  
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

				fetch(`${process.env.BACKEND_URL}/api/users/favorites`, opts)
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
			const resp = await fetch(`${process.env.BACKEND_URL}/api/hello`, opts);
  
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
		  fetch(`${process.env.BACKEND_URL}/api/single/${index}`)
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


