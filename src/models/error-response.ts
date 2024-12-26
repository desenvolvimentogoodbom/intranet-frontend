export default interface ResponseError {
	message: string | string[];
	error: string;
	statusCode: number;
}
