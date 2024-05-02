import { BASE_URL } from "./consts";

const buildAPIUrl = (path: string) => `${BASE_URL}${path}`;

export { buildAPIUrl };