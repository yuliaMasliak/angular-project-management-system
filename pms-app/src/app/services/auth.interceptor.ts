import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable, tap } from 'rxjs'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: any = localStorage.getItem('access_token')
    let result: string = ''
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      })
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      })
    }
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    })
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) result = 'Server response'
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err) {
              result = 'Unauthorized'
              this.router.navigate(['main', 'login'])
            }
          }
        }
      )
    )
  }
}
