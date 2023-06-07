// import {
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';

// export class AuthInterceptorService implements HttpInterceptor {
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const userData = localStorage.getItem('userData');
//     const data = JSON.parse(userData);
//     const token = data?.token ? data?.token : '';

//     if (token != null) {
//       const authReq = req.clone({
//         headers: req.headers.set('Authorization', 'Bearer ' + token),
//       });
//       return next.handle(authReq);
//     } else {
//       return next.handle(req);
//     }
//   }
// }
