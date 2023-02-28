import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, of, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}
  allowLogin(user: {
    email: string
    password: string
  }): Observable<string | boolean> {
    if (user.email && user.password) {
      return of(true)
    } else {
      return throwError(() => {
        new Error('Failed login')
      })
    }
  }
}
