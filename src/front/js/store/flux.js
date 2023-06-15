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
						`${process.env.BACKEND_URL}/api/hello`
					)
				}
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
