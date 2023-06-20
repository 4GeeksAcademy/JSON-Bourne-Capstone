const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
		
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
				console.log ("TOCKEN BACK HERE", data);
				sessionStorage.setItem("token", data.access_token);
				setStore({token: data.access_token});
				return true;
			}	catch (error) {
				console.error("THERE WAS A CATCH ERROR LOADING FROM BK END HERE!!", error);
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
        // created_at: created_at,
        user_id: 1,
        post_id: 1
      }),
    };

    console.log('POST request options:', opts);
	let dataObj={ text: text,
        user_id: user_id,
        post_id: post_id}
    const resp = await fetch(
      `${process.env.BACKEND_URL}/api/comments`,
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
				},
			  };
			};
			
			export default getState;
			