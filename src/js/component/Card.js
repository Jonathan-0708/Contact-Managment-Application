import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { green } from "@material-ui/core/colors";
import CreateIcon from "@material-ui/icons/Create";
import { Link } from "react-router-dom";

const Card = props => {
	const { actions } = useContext(Context);
	const { element, indexNuevo } = props;

	return (
		<div className="container  border1 mb-3">
			<div className="row pt-3 pb-2 ">
				<div className="col-1 ml-5 pt-2 ">
					<img
						className="rounded-circle border2 "
						src="data:image/png;base64,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"
						height="100px"
					/>
				</div>

				<div className="col-8 px-5 m-auto">
					<ul>
						<h4>{element.full_name}</h4>
						<div className="row">
							<div className="fas fa-map-marker-alt col-1 pt-1 pl-3" />
							<div className=" col-10 pl-1">{element.address}</div>
						</div>
						<div className="row">
							<div className="fas fa-phone col-1 pt-1" />
							<div className=" col-10 pl-1">{element.phone}</div>
						</div>
						<div className="row">
							<div className="fas fa-envelope col-1 pt-1" />
							<div className=" col-10 pl-1">{element.email}</div>
						</div>
					</ul>
				</div>

				<div className="col-2">
					<Link to={`/AddNewContact?id=${element.id}`}>
						<IconButton aria-label="create">
							<CreateIcon style={{ color: green[900] }} />
						</IconButton>
					</Link>
					<IconButton aria-label="delete" onClick={() => actions.fetchDeleteContact(indexNuevo, element.id)}>
						<DeleteRoundedIcon style={{ color: green[900] }} />
					</IconButton>
				</div>
			</div>
		</div>
	);
};

Card.propTypes = {
	element: PropTypes.object,
	indexNuevo: PropTypes.number
};

export default Card;
