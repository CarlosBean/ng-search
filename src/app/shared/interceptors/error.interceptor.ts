import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertToastService } from '../alert-toast/alert-toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public alert: AlertToastService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((evt: any) => {
                const handleMethods = ['POST', 'PUT', 'DELETE'];
                if (evt instanceof HttpResponse && handleMethods.includes(req.method)) {
                    this.alert.success(`Success Operation ${req.method}`, 'Good Job!.');
                }
            }),
            catchError((err: any) => {
                switch (err.status) {
                    case 401:
                        this.alert.danger('Not Found', 'Resource not found. Try again later');
                        break;
                    case 404:
                        this.alert.danger('Not Found', 'Resource not found. Try again later');
                        break;
                    case 400:
                    case 500:
                        this.alert.danger(`Error ${err.status}`, err.error.message);
                        break;
                    default:
                        this.alert.danger('Error', 'Has appeared an unknown error on system.');
                        break;
                }

                const error = err.error.message || err.statusText;
                return throwError(error);
            })
        );
    }
}