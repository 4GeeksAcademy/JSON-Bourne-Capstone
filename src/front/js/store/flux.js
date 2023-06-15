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
				}
			}
		},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
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
