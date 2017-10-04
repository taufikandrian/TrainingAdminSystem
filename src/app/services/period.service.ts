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

  addEP(trainginID, addedEligiblesID): Observable<Response> {
    return this.http.post(Environment.apiUrl+'/training/addEligibleList/'+trainginID, addedEligiblesID)
    .map((response: Response) => {
      return response;
    })
  }

  deleteEP(trainginID,eligiblesID): Observable<Response> {
    return this.http.post(Environment.apiUrl+'/training/deleteEligibleList/'+trainginID, eligiblesID)
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

  update(data, username): Observable<Response> {
    return this.http.post(Environment.apiUrl+'/training/update/'+username, data)
    .map((response: Response) => {
      return response;
    });
  }

  detail(data): Observable<Response> {
    return this.http.get(Environment.apiUrl+'/training/update/'+data)
    .map((response: Response) => {
      return response;
    });
  }
}
