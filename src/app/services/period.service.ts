import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, RequestOptions } from '@angular/http';

import { JsonService } from './json.service';

import { Environment } from '../classes/environment';

@Injectable()
export class PeriodService {

  constructor(private jsonService: JsonService,
    private http: Http,) { }

  getCourses(): Observable<Response> {
    return this.http.get(Environment.apiUrl+'/coursetype/all')
    .map((response: Response) => {
      return response;
    });
  }

  getTrainer(): Observable<Response> {
    return this.http.get(Environment.apiUrl+'/trainer/all')
    .map((response: Response) => {
      return response;
    })
  }

  deleteCourses(coursesID): Observable<Response> {
    return this.http.post(Environment.apiUrl+'/schedule/delete', coursesID)
    .map((response: Response) => {
      return response;
    });
  }

  updateCourses(coursesID, data): Observable<Response> {
    return this.http.post(Environment.apiUrl+'/schedule/update/'+coursesID, data)
    .map((response: Response) => {
      return response;
    });
  }

  getCourse(idCourse): Observable<Response> {
    return this.http.get(Environment.apiUrl+'/schedule/TrainingClassDetail/'+idCourse)
    .map((response: Response) => {
      return response;
    })
  }

  getClassroom(): Observable<Response> {
    return this.http.get(Environment.apiUrl+'/classroom/all')
    .map((response: Response) => {
      return response;
    });
  }

  courseCreate(trainginID, data): Observable<Response> {
    return this.http.post(Environment.apiUrl+'/schedule/'+trainginID+'/create', data)
    .map((response: Response) => {
      return response;
    });
  }

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

  addP(courseID, addedParticipantsID): Observable<Response> {
    return this.http.post(Environment.apiUrl+'/schedule/EligibleStaffAdd/'+courseID, addedParticipantsID)
    .map((response: Response) => {
      return response;
    })
  }

  deleteP(courseID, eligiblesID): Observable<Response> {
    return this.http.post(Environment.apiUrl+'/schedule/EligibleStaffDelete/'+courseID, eligiblesID)
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
