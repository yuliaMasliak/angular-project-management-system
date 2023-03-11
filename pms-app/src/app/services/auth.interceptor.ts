import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http'
import { map, Observable, tap } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(this.authService.user.login)
    const token: any = localStorage.getItem(
      `${this.authService.user.login}token`
    )
    console.log('token string', token)

    if (token) {
      console.log('token ', token)
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
          if (event instanceof HttpResponse) console.log('Server response')
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) console.log('Unauthorized')
          }
        }
      )
    )
  }
}
