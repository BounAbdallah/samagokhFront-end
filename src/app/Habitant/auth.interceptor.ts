import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function authInterceptor(req:HttpRequest<unknown>,next:HttpHandlerFn):Observable<HttpEvent<unknown>>{
    let token;
   

    if(localStorage.getItem("token")){
        token = JSON.parse(localStorage.getItem("token") || "");

    }
    if(!token){
        return next(req);
    } 

    const headers = new HttpHeaders(

       { Authorization:`Bearer ${token}`}
    );


    const newRequete = req.clone({
        headers
    });

    return next (newRequete);

}