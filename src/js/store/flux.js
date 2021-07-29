const getState = ({ getStore, getActions, setStore }) => {
	const CONTACT_UID = "CONTACT_UID";
	const URL_BASE = "https://assets.breatheco.de/apis/fake/contact/";
	const urlAgenda = `${URL_BASE}agenda/agenda_jonathan_diaz`;
	const urlContact = `${URL_BASE}${CONTACT_UID}`;
	return {
		store: {
			contact: []
		},
		actions: {
			getContact: () => {
				fetch(urlAgenda)
					.then(respuesta => respuesta.json())
					.then(data => setStore({ contact: data }));
			},
			fetchNewContact: async (newContact, exito, callbackError) => {
				const actions = getActions();
				await fetch(URL_BASE, {
					method: "POST",
					body: JSON.stringify(newContact),
					headers: {
						"Content-Type": "application/json"
					}
				}).then(function(response) {
					if (response.status === 200) {
						actions.getContact();
						exito();
					}

					if (response.status === 400) {
						callbackError();
					}
				});
			},

			fetchDeleteContact: (index, uid) => {
				const url = urlContact.replace(CONTACT_UID, uid);

				fetch(url, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				}).then(() => {
					getActions().removeContact(index);
				});
			},

			fetchEditContact: async (newEditContact, currentContactid, exito, callbackError) => {
				const actions = getActions();
				await fetch(urlContact.replace(CONTACT_UID, currentContactid), {
					method: "PUT",
					body: JSON.stringify(newEditContact),
					headers: {
						"Content-Type": "application/json"
					}
				}).then(function(response) {
					if (response.status === 200) {
						getActions().getContact();
						exito();
					}

					if (response.status === 400) {
						callbackError();
					}
				});
			},

			removeContact: contactIndex => {
				getStore().contact.splice(contactIndex, 1);
				setStore({ contact: getStore().contact });
			}
		}
	};
};

export default getState;
