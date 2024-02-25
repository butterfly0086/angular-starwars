import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  handleError(error?: HttpErrorResponse) {
    let errorMessage: string | undefined;

    if (error?.error instanceof ErrorEvent) {
      console.error('Network Error', error.error.message);
      errorMessage = `Network Error ${error.error.message}`;
    } else {
      console.error(`Backend returned code ${error?.status},` + `body was: ${JSON.stringify(error?.error.responseDescription)}`);
      
      if (error?.statusText === 'Unknown Error') {
        errorMessage = 'Seems you are offline. Connect to the internet and try again.';
      }

      errorMessage = `${error?.error.responseDescription || errorMessage}`;
      console.log(errorMessage);
    }
    
    return throwError(() => new Error(errorMessage));
  };
};
