import { Navigate, Outlet } from 'react-router';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = () => {
	const token = localStorage.getItem('token');

	if (!token) {
		return <Navigate to="/" />;
	}

	try {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const decodedToken: any = jwtDecode(token);
		const isExpired = decodedToken.exp < Date.now() / 1000;

		if (isExpired) {
			localStorage.removeItem('token');
			return <Navigate to="/" />;
		}

		return <Outlet />;
	} catch (error) {
		localStorage.removeItem('token');
		return <Navigate to="/" />;
	}
};

export default PrivateRoute;
