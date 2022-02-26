import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LookUpsService {
  baseUrl: string;
  GetAllQuantityPerUnitsURL: string;

  constructor(private http: HttpClient) {
    this.baseUrl =  "https://localhost:44388";
    this.GetAllQuantityPerUnitsURL = this.baseUrl + '/api/LookUps/GetAllQuantityPerUnit';

  }

  getQuantityPerUnits() {
    return this.http.get(this.GetAllQuantityPerUnitsURL).pipe(
      map((res: any) => res)
    );
  }
  
}
