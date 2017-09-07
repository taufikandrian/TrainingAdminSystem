import { Injectable } from '@angular/core';

@Injectable()
export class JsonService {

  constructor() { }

  checkJsonParse(jsonString): any {
    try{
      var obj = JSON.parse(jsonString);
      return obj;
    }
    catch(err){
      return err;
    }
  }
}
