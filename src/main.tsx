import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import NotFoundAccountPage from './routes/not-found-page';
import AccessAccountPage from './routes/access-account-page/access-account-page';
import CreateAccountPage from './routes/create-account-page/create-account-page';
import HomePage from './routes/home-page';
import PrivateRoute from './components/private-route';

const root = document.getElementById('root');

if (root) {
	createRoot(root).render(
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AccessAccountPage />} />
				<Route path="/criar-conta" element={<CreateAccountPage />} />

				<Route element={<PrivateRoute />}>
					<Route path="/home" element={<HomePage />} />
				</Route>

				<Route path="*" element={<NotFoundAccountPage />} />
			</Routes>
		</BrowserRouter>,
	);
}
