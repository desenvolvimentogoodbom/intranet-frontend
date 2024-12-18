import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import NotFoundAccountPage from './routes/not-found-page';
import AccessAccountPage from './routes/access-account-page';
import CreateAccountPage from './routes/create-account-page';

const root = document.getElementById('root');

if (root) {
	createRoot(root).render(
		<StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AccessAccountPage />} />
					<Route path="/criar-conta" element={<CreateAccountPage />} />
					<Route path="*" element={<NotFoundAccountPage />} />
				</Routes>
			</BrowserRouter>
		</StrictMode>,
	);
}
