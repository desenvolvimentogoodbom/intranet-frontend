import ResponseError from '@/models/error-response';
import api from './api';

interface FetcherResponse<T> {
	data: T | undefined;
	error: ResponseError | null;
}

interface ReadFetcherOptions {
	query?: Record<string, string | number | boolean | undefined>;
	authToken?: string;
}

interface CreateFetcherOptions {
	authToken?: string;
	body?: any;
}

const readFetcher = async <T>(
	path: string,
	options: ReadFetcherOptions = {},
): Promise<FetcherResponse<T>> => {
	const response: FetcherResponse<T> = {
		data: undefined,
		error: null,
	};

	try {
		const headers: Record<string, string> = {};

		if (options.authToken) {
			headers.Authorization = `Bearer ${options.authToken}`;
		}

		const res = await api.get<T>(path, {
			headers,
			params: options.query,
		});

		response.data = res.data;
	} catch (error: any) {
		if (error.response) {
			const { message, error: errorType, statusCode } = error.response.data;

			const errorDetails: ResponseError = {
				message: Array.isArray(message) ? message : [message],
				error: errorType,
				statusCode,
			};

			response.error = errorDetails;
		} else {
			response.error = {
				message: 'Erro desconhecido',
				error: 'Unknown Error',
				statusCode: 500,
			};
		}
	}

	return response;
};

const createFetcher = async <T>(
	path: string,
	options: CreateFetcherOptions = {},
): Promise<FetcherResponse<T>> => {
	const response: FetcherResponse<T> = {
		data: undefined,
		error: null,
	};

	try {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};

		if (options.authToken) {
			headers.Authorization = `Bearer ${options.authToken}`;
		}

		const res = await api.post<T>(path, options.body, {
			headers,
		});

		response.data = res.data;
	} catch (error: any) {
		if (error.response) {
			const { message, error: errorType, statusCode } = error.response.data;

			const errorDetails: ResponseError = {
				message: Array.isArray(message) ? message : [message],
				error: errorType,
				statusCode,
			};

			response.error = errorDetails;
		} else {
			response.error = {
				message: 'Erro desconhecido',
				error: 'Unknown Error',
				statusCode: 500,
			};
		}
	}

	return response;
};

export { readFetcher, createFetcher };
