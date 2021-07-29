import React from "react";
import { Link } from "react-router-dom";
import { createTheme, withStyles, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";

const theme = createTheme({
	palette: {
		primary: green
	}
});

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">Contact Managment Application</span>
			</Link>
			<div className="ml-auto">
				<Link to="/AddNewContact">
					<ThemeProvider theme={theme}>
						<Button variant="contained" color="primary">
							Add a new contact
						</Button>
					</ThemeProvider>
				</Link>
			</div>
		</nav>
	);
};
