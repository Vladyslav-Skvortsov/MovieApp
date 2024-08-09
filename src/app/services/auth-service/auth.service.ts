import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { API_KEY, BASE_API_URL } from '@constants/constant-api';
import {
	RequestTokenResponse,
	ValidateRequestTokenResponse,
	CreateSessionResponse,
	AccountResponse,
} from '@interfaces/auth-responses';
import { setAuthentication } from '@store/actions';
import { Store } from '@ngrx/store';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient, private store: Store) {}

	private getRequestToken(): Observable<string> {
		const url = `${BASE_API_URL}/authentication/token/new${API_KEY}`;
		return this.http.get<RequestTokenResponse>(url).pipe(
			map((response) => response.request_token),
			catchError(this.handleError)
		);
	}

	private validateRequestToken(
		requestToken: string,
		username: string,
		password: string
	): Observable<void> {
		const url = `${BASE_API_URL}/authentication/token/validate_with_login${API_KEY}`;
		const body = {
			username,
			password,
			request_token: requestToken,
		};
		return this.http.post<ValidateRequestTokenResponse>(url, body).pipe(
			map(() => {}),
			catchError(this.handleError)
		);
	}

	private createSession(requestToken: string): Observable<string> {
		const url = `${BASE_API_URL}/authentication/session/new${API_KEY}`;
		const body = { request_token: requestToken };
		return this.http.post<CreateSessionResponse>(url, body).pipe(
			map((response) => response.session_id),
			catchError(this.handleError)
		);
	}

	private fetchAccountId(sessionId: string): Observable<number> {
		const url = `${BASE_API_URL}/account${API_KEY}&session_id=${sessionId}`;
		return this.http.get<AccountResponse>(url).pipe(
			map((response) => response.id),
			catchError(this.handleError)
		);
	}

	public authenticate(username: string, password: string): Observable<void> {
		return this.getRequestToken().pipe(
			switchMap((requestToken) =>
				this.validateRequestToken(requestToken, username, password).pipe(
					switchMap(() => this.createSession(requestToken)),
					switchMap((sessionId) =>
						this.fetchAccountId(sessionId).pipe(
							map((accountId) => {
								this.store.dispatch(
									setAuthentication({ accountId, sessionId })
								);
							})
						)
					)
				)
			)
		);
	}

	private handleError(error: HttpErrorResponse): Observable<never> {
		console.error('An error occurred:', error);
		return throwError(error);
	}
}
