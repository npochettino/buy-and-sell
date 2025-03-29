import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, user } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    NavBarComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'buy-and-sell';

  auth = inject(Auth);
  user$: Observable<any | null> = user(this.auth);


  async signInClicked(): Promise<void>{
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async signOutClicked(): Promise<void>{
    await signOut(this.auth);
  }
}
