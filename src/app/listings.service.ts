import { Injectable, inject } from '@angular/core';
import { Listing } from './types';
import { Observable, from, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { Auth, user } from '@angular/fire/auth';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

const httpOptionsWithAuthToken = (token: any) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'AuthToken': token
  })
})

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  private auth = inject(Auth);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api';

  constructor(
  ) { }

  getListings(): Observable<Listing[]>{
    return this.http.get<Listing[]>('http://localhost:8000/api/listings');
  }

  getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`http://localhost:8000/api/listings/${id}`);
  }

  addViewToListing(id: string): Observable<Listing>{
    return this.http.post<Listing>(
      `http://localhost:8000/api/listings/${id}/add-view`,
      {},
      httpOptions,
    ).pipe(
      timeout(30000) // Set timeout to 30 seconds (adjust as needed)
    );
  }

  getListingsForUser(): Observable<Listing[]> {
    return user(this.auth).pipe(
      switchMap((currentUser) => {
        if (!currentUser) {
          throw new Error('User not authenticated');
        }
        return from(currentUser.getIdToken()).pipe(
          switchMap((idToken) => {
            return this.http.get<Listing[]>(`${this.apiUrl}/users/${currentUser.uid}/listings`, 
              httpOptionsWithAuthToken(idToken));
          })
        );
      })
    );
  }

  deleteListing(id: string): Observable<any> {
    return user(this.auth).pipe(
      switchMap((currentUser) => {
        if (!currentUser) {
          throw new Error('User not authenticated');
        }
        return from(currentUser.getIdToken()).pipe(
          switchMap((idToken) => {
            return this.http.delete(
              `http://localhost:8000/api/listings/${id}`,
              httpOptionsWithAuthToken(idToken));
          })
        );
      })
    );
  }

  createListing(name: string, description: string, price: number): Observable<Listing> {
    return user(this.auth).pipe(
      switchMap((currentUser) => {
        if (!currentUser) {
          throw new Error('User not authenticated');
        }
        return from(currentUser.getIdToken()).pipe(
          switchMap((idToken) => {
            return this.http.post<Listing>(
              `http://localhost:8000/api/listings`,
              { name, description, price },
              httpOptionsWithAuthToken(idToken));
          })
        );
      })
    );
  }

  editListing(id: string, name: string, description: string, price: number): Observable<Listing> {
    return user(this.auth).pipe(
      switchMap((currentUser) => {
        if (!currentUser) {
          throw new Error('User not authenticated');
        }
        return from(currentUser.getIdToken()).pipe(
          switchMap((idToken) => {
            return this.http.post<Listing>(
              `http://localhost:8000/api/listings/${id}`,
              { name, description, price },
              httpOptionsWithAuthToken(idToken));
          })
        );
      })
    );
  }
}

