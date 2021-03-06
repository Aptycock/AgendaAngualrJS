import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  usuarios:any[];

  constructor(
    private http:Http,
    private router:Router
  ) {}

  public autenticar(usuario:any) {
    let uriUsuario:string = "http://localhost:3000/auth/";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjEsIm5pY2siOiJASkh1ZXJ0YXMiLCJjb250cmFzZW5hIjoiMTIzNCIsImlhdCI6MTQ5OTk3MjI4OCwiZXhwIjoxNDk5OTc1ODg4fQ.aIiN0EiCspOk9rXY5pzTdIgvd6tdY6yYbRr9M1tj0Vg');

    let options = new RequestOptions({headers : headers});
    let data = JSON.stringify(usuario);

    this.http.post(uriUsuario, data, options)
    .subscribe(res => {
      let token = res.json().token;
      if(token) {
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard/contacto']);
      } else {
        return false;
      }
    }, error => {
      console.log(error.text());
    })

  }

  public registrar(usuario:any) {
    let uriUsuario:string = "http://localhost:3000/api/v1/usuario";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({headers : headers});
    let data = JSON.stringify(usuario);

    return this.http.post(uriUsuario, data, options)
    .map(res => {
      return res.json();
    }, error => {
      console.log(error.text());
    })

  }
  public verificarUsuario():boolean {
    if(localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  public getUsuario(idUsuario:number) {
    let uri = "http://localhost:3000/api/v1/contacto/" + idUsuario;
    let headers = new Headers();

    let options = new RequestOptions({ headers: headers});
    return this.http.get(uri, options)
    .map(res => {
      console.log(res.json());
      return res.json();
    });
  }

}
