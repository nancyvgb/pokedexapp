import {Injectable} from '@angular/core'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Subject, throwError} from 'rxjs'
import {User} from './user.model'
import { catchError, tap } from 'rxjs/operators';
import {Router} from '@angular/router'

export interface AuthResponseData {
idToken: string,
email:	string,
refreshToken: string,	
expiresIn:	string,
localId: string,
registered?: boolean,
displayName: string,
}
@Injectable({providedIn: "root"})


export class AuthService {
    user = new Subject<User>();

    constructor(private http: HttpClient, private router: Router){}
    singUp(email: string, password: string, displayName: string) {
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBG6TKZVulOV2YULy4izZ7ZO39gR6vBT58',
        {
         email: email,
         password: password,
         displayName: displayName,
         returnSecureToken: true
        }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handdleAuth(
                resData.email, 
                resData.localId, 
                resData.idToken,
                +resData.expiresIn,
                resData.displayName)})
        ) 
    }
    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBG6TKZVulOV2YULy4izZ7ZO39gR6vBT58',
        {
         email: email,
         password: password,
         returnSecureToken: true
        }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handdleAuth(
                resData.email, 
                resData.localId, 
                resData.idToken,
                +resData.expiresIn,
                resData.displayName)})
        ) 

    }

    logout(){
        this.user.next(null)
        this.router.navigate(['/auth']);
        localStorage.removeItem('currentUser');
    }
    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error ocurred'
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage)
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists Already' 
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist' 
                break;
           case 'INVALID PASSWORD':
             errorMessage = 'This password is not correct' 
                break;
        }
        return throwError(errorMessage)
    }
    private handdleAuth(email: string, userId: string, token: string, expiresIn: number, displayName: string) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)
        const user =  new User(
            email, 
            userId, 
            token, 
            expirationDate,
            displayName);
            this.user.next(user);
    }
}