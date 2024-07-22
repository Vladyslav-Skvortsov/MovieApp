export interface RequestTokenResponse {
	success: boolean;
	expires_at: string;
	request_token: string;
}

export interface ValidateRequestTokenResponse {
	success: boolean;
}

export interface CreateSessionResponse {
	success: boolean;
	session_id: string;
}

export interface AccountResponse {
	id: number;
	name: string;
	username: string;
	include_adult: boolean;
	iso_639_1: string;
	iso_3166_1: string;
	avatar: {
		gravatar: {
			hash: string;
		};
	};
}
