import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  url_principal = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  get(url: string): Promise<any> {
    return this.http.get(this.url_principal + url).toPromise();
  }

  post(url: string, obj: any): Promise<any> {
    return this.http.post(this.url_principal + url, obj).toPromise();
  }

  put(url: string, obj: any): Promise<any> {
    return this.http.put(this.url_principal + url, obj).toPromise();
  }

  async delete(url: string): Promise <any> {
    return this.http.delete(this.url_principal + url).toPromise();
  }


}
