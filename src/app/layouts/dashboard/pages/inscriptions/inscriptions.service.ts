import { Injectable } from '@angular/core';
import { CreateInscriptionPayload, IInscription } from './models';
import { catchError, delay, first, map, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  constructor(private httpClient: HttpClient) {}

  getInscriptions(): Observable<IInscription[]> {
    return this.httpClient.get<IInscription[]>(environment.baseAPIURL + '/inscriptions');
  }

  getIinscriptionById(id: string): Observable<IInscription | undefined> {
    return this.httpClient.get<IInscription>(`${environment.baseAPIURL}/inscriptions/${id}`); 
  }

  createInscription(payload: CreateInscriptionPayload): Observable<IInscription> {
    return this.httpClient.post<IInscription>(
      `${environment.baseAPIURL}/inscriptions`,
      payload
    );
  }

  deleteInscription(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.baseAPIURL}/inscriptions/${id}`);
  }

  updateInscription(id: number, payload: CreateInscriptionPayload): Observable<IInscription> {
    return this.httpClient.put<IInscription>(
      `${environment.baseAPIURL}/inscriptions/${id}`,
      payload
    );
  }

  getInscriptionsByStudentId(studentId: number): Observable<IInscription[]> {
    return this.getInscriptions().pipe(
      map((inscripciones: IInscription[]) => {
        return inscripciones.filter(inscripcion => inscripcion.student === studentId);
      }),
      catchError(error => {
        // Manejar errores de la petición HTTP aquí si es necesario
        return throwError(error);
      })
    );
  }

  getInscriptionsByCourseId(courseId: number): Observable<IInscription[]> {
    console.log("en servicio");
    console.log(courseId);
    return this.getInscriptions().pipe(
      map((inscripciones: IInscription[]) => {
        return inscripciones.filter(inscription => inscription.course === courseId);
      }),
      catchError(error => {
        // Manejar errores de la petición HTTP aquí si es necesario
        return throwError(error);
      })
    );
  }
  

}
