import './App.css';
import Booking from './components/js/booking.js';
import BookingDoc from './components/js/bookingDoc';
import Dashboard from './components/js/dashboard';
import DashboardDoc from './components/js/dashboardDoc';
import Profile from './components/js/profile';
import Search from './components/js/search';
import SignUp from './components/js/signUp.js';
import { Route, Routes, BrowserRouter } from "react-router-dom"

function App() {
	let type = localStorage.getItem("type");

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<SignUp />} />
					<Route path="/dashboard" element={type==="Patient" ? <Dashboard /> : <DashboardDoc />} />
					<Route path="/booking" element={type==="Patient" ? <Booking /> : <BookingDoc />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/search" element={<Search />} />
        		</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
