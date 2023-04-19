//axios
import axios from 'axios';

export const API = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
	params: {
		apikey: process.env.NEXT_PUBLIC_API_KEY,
		hash: process.env.NEXT_PUBLIC_API_HASH,
		ts: 1,
	},
});
