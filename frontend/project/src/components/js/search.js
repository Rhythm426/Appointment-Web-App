import React from "react";
import axios from "axios"
import "../css/search.css"
import { useEffect } from "react";
import Navbar from "./navbar";

function Search(props) {
	const [docName, setDocName] = React.useState('');
	const [docSpec, setDocSpec] = React.useState('');
	const [docGender, setDocGender] = React.useState('');

	const [docList, setDocList] = React.useState([])

	const getDocList = async (e) => {
		try {
			const resp = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/doctorlist`)
			setDocList(resp.data);
		}
		catch (err) {
		}
	};

	useEffect(() => {
		getDocList();
	}, [])

	const filteredProducts = docList.filter((doc) => {
		return doc["name"].toUpperCase().includes(docName.toUpperCase()) 
			&& doc["specialisation"].toUpperCase().includes(docSpec.toUpperCase())
				&& doc["gender"].includes(docGender);
	});

	return (
		<div className="search-outer">
			<Navbar />
			<div className='search-container'>
				<div className='input-wrap'>
					<h2 className="search-h2">Need help searching for the right doctor?</h2>
					<div className="each-input" id="first-search">
						<label
							id="input-label"
						>
							By Name :
						</label>
						<input
							onChange={(e) => { setDocName(e.target.value) }}
							value={docName}
							type="text"
							name="product-search"
							id="product-search"
							placeholder="Doctor Name"
						/>
					</div>

					<div className="each-input" id="second-search">
						<label
							id="input-label"
						>
							By Specialisation :
						</label>
						<input
							onChange={(e) => { setDocSpec(e.target.value) }}
							value={docSpec}
							type="text"
							name="product-search"
							id="product-search"
							placeholder="Doctor Specialisation"
						/>
					</div>

					<div className="each-input" id="third-search">
						<label
							id="input-label"
						>
							By Gender :
						</label>
						<select
							onChange={(e) => { setDocGender(e.target.value) }}
							value={docGender}
							type="text"
							name="product-search"
							id="product-search"
							placeholder="Doctor Gender">
							<option value={''}>All</option>
							<option value={'Female'}>Female</option>
							<option value={'Male'}>Male</option>
							<option value={'Other'}>Other</option>
						</select>
						{/* <input
							onChange={(e) => { setDocSpec(e.target.value) }}
							value={docSpec}
							type="text"
							name="product-search"
							id="product-search"
							placeholder="Doctor Specialisation"
						/> */}
					</div>
				</div>
				<div className="results-wrap">

					{filteredProducts.map((doc) => {
						return <DocCard
							name={doc.name}
							email={doc.email}
							gender={doc.gender}
							phone_num={doc.phone_num}
							degree={doc.degree}
							specialisation={doc.specialisation}
						/>
					})}
				</div>
			</div>
		</div>
	);
}

function DocCard(props) {
	return (
		<div className="search-card">
			<div className="img">
			</div>
			<div className="infos">
				<div className="name">
					<h2>{props.name}</h2>
					<h5>Email : {props.email}</h5>
					<h5>Phone Number : {props.phone_num}</h5>
				</div>
				{/* Phone Number : {props.phone_num} <br /> */}
				<hr />
				<div className="stats">
					<div className="each-stat">
						<h3>{props.gender === 'F' ? "Female" : (props.gender === 'M' ? "Male" : "Other")}</h3>
						<h6>Gender</h6>
					</div>
					<div className="each-stat">
						<h3>{props.degree}</h3>
						<h6>Degree</h6>
					</div>
				</div>
				<div className="links">
					<div className="spec">Specialisation : {props.specialisation}</div>
				</div>
			</div>
		</div>
	)
}

export default Search;