import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import {
	USERNAME,
	PASSWORD,
	API_KEY,
	BASE_API_URL,
} from '@constants/constant-api';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}

	private getRequestToken(): Observable<string> {
		const url = `${BASE_API_URL}/authentication/token/new${API_KEY}`;
		return this.http.get<any>(url).pipe(
			map((response) => response.request_token),
			catchError(this.handleError)
		);
	}

	private validateRequestToken(requestToken: string): Observable<void> {
		const url = `${BASE_API_URL}/authentication/token/validate_with_login${API_KEY}`;
		const body = {
			username: USERNAME,
			password: PASSWORD,
			request_token: requestToken,
		};
		return this.http.post<any>(url, body).pipe(
			map(() => {}),
			catchError(this.handleError)
		);
	}

	private createSession(requestToken: string): Observable<string> {
		const url = `${BASE_API_URL}/authentication/session/new${API_KEY}`;
		const body = { request_token: requestToken };
		return this.http.post<any>(url, body).pipe(
			map((response) => response.session_id),
			catchError(this.handleError)
		);
	}

	private fetchAccountId(sessionId: string): Observable<number> {
		const url = `${BASE_API_URL}/account${API_KEY}&session_id=${sessionId}`;
		return this.http.get<any>(url).pipe(
			map((response) => response.id),
			catchError(this.handleError)
		);
	}

	public authenticateAndGetAccountId(): Observable<{
		accountId: number;
		sessionId: string;
	}> {
		return this.getRequestToken().pipe(
			switchMap((requestToken) =>
				this.validateRequestToken(requestToken).pipe(
					switchMap(() => this.createSession(requestToken)),
					switchMap((sessionId) =>
						this.fetchAccountId(sessionId).pipe(
							map((accountId) => ({ accountId, sessionId }))
						)
					)
				)
			)
		);
	}

	private handleError(error: any) {
		console.error('An error occurred:', error);
		return throwError(error);
	}
}
