import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  endPoint = "api/User/";
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json"}),
  };
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(
      environment.apiURL + this.endPoint + "GetAllUsers"
    );
  }
  getUser(){
    return this.http.get<any>(
      environment.apiURL + this.endPoint + "GetUser/",
      this.httpOptions
    );
  }
}