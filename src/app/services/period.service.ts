import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, RequestOptions } from '@angular/http';

import { JsonService } from './json.service';

import { Environment } from '../classes/environment';

@Injectable()
export class PeriodService {

  constructor(private jsonService: JsonService,
    private http: Http,) { }

  create(data): Observable<Response> {
    return this.http.post(Environment.apiUrl+'/training/create', data)
    .map((response: Response) => {
      return response;
    });
  }

  delete(data): Observable<Response> {
    return this.http.post(Environment.apiUrl+'/training/delete', data)
    .map((response: Response) => {
      return response;
    });
  }
}
