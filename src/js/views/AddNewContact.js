import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Context } from "../store/appContext";
import "../../styles/demo.scss";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Modall from "../component/Modall";
import queryString from "query-string";

const CONTACT_ID = "CONTACT_ID";
const URL_BASE = "https://assets.breatheco.de/apis/fake/contact/";
const urlContact = `${URL_BASE}${CONTACT_ID}`;
const urlAgenda = `${URL_BASE}agenda/agenda_jonathan_diaz`;

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			margin: theme.spacing(1)
		},
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "100%"
		}
	}
}));

const MESSAGE_ERROR = {
	title: "You have a problem",
	description: `Your email is  already in use`
};

const MESSAGE_SUCCESS = {
	title: "Correct!",
	description: `You Create a new Contact!`
};

const MESSAGE_SUCCESS_EDIT = {
	title: "Correct!",
	description: `your contact has been updated!`
};

export const AddNewContact = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [open, setOpen] = React.useState(false);
	const { actions } = useContext(Context);
	const [message, setMessage] = useState({});

	const classes = useStyles();
	const handleClose = () => {
		setOpen(false);
	};

	const enviarDatos = () => {
		let currentContactid = queryString.parse(location.search).id;
		const payload = {
			full_name: name,
			email: email,
			agenda_slug: "agenda_jonathan_diaz",
			address: address,
			phone: phone
		};

		if (currentContactid === null || currentContactid === undefined) actions.fetchNewContact(payload, exito, error);
		else actions.fetchEditContact(payload, currentContactid, exitoEditContact, error);
	};

	const exito = () => {
		setMessage(MESSAGE_SUCCESS);
		setOpen(true);
	};

	const error = () => {
		setMessage(MESSAGE_ERROR);
		setOpen(true);
	};

	const exitoEditContact = () => {
		setMessage(MESSAGE_SUCCESS_EDIT);
		setOpen(true);
	};

	const getCurrentContact = currentContactid => {
		const url = urlContact.replace(CONTACT_ID, currentContactid);
		fetch(url)
			.then(respuesta => respuesta.json())
			.then(data => {
				setName(data.full_name);
				setEmail(data.email);
				setAddress(data.address);
				setPhone(data.phone);
			});
	};

	useEffect(() => {
		let currentContactid = queryString.parse(location.search).id;

		if (currentContactid !== null && currentContactid !== undefined) getCurrentContact(currentContactid);
	}, []);

	return (
		<div className={classes.root}>
			<Modall open={open} handleClose={handleClose} message={message} />

			<h1 className="text-center">Add a new contact</h1>
			<Container>
				<Grid item xs={12}>
					<ValidatorForm className={classes.root} noValidate autoComplete="off" onSubmit={enviarDatos}>
						<div>
							<TextValidator
								id="standard-name"
								label="Name"
								variant="outlined"
								required
								validators={["required"]}
								errorMessages={["this field is required"]}
								value={name}
								onChange={event => setName(event.target.value)}
							/>
						</div>
						<div>
							<TextValidator
								required
								id="standard-required"
								label="Email"
								placeholder="Email"
								variant="outlined"
								validators={["required", "isEmail"]}
								errorMessages={["this field is required", "email is not valid"]}
								value={email}
								onChange={event => setEmail(event.target.value)}
							/>
						</div>
						<div>
							<TextValidator
								required
								id="standard-required"
								label="Phone"
								placeholder="(+xx)xxx-xxx-xxx"
								variant="outlined"
								validators={["required"]}
								errorMessages={["this field is required"]}
								value={phone}
								onChange={event => setPhone(event.target.value)}
							/>
						</div>
						<div>
							<TextValidator
								required
								id="standard-required"
								label="Address"
								placeholder="sidewalk 1, street 1, house #..."
								variant="outlined"
								validators={["required"]}
								errorMessages={["this field is required"]}
								value={address}
								onChange={event => setAddress(event.target.value)}
							/>
						</div>
						<Grid container justifyContent="center" item xs={12}>
							<Button
								variant="contained"
								size="large"
								color="primary"
								className={classes.button}
								startIcon={<SaveIcon />}
								type="submit">
								Save
							</Button>
						</Grid>
					</ValidatorForm>
				</Grid>
				<Link to="/">
					<Button color="primary">Or get back to contacts</Button>
				</Link>
			</Container>
		</div>
	);
};
