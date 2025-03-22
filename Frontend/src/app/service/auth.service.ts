import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
 
  constructor() {
    this.auth.onAuthStateChanged(user => this.userSubject.next(user));
  }
 
  loginWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle(): Promise<any> {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((result) => {
        this.userSubject.next(result.user);
        return result; 
      });
  }
  

  registerWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth,provider);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
 
  logout() {
    return signOut(this.auth)
      .then(() => {
        this.router.navigate(['/login']); // Redirige al login
      })
      .catch(error => {
        console.error('Error al cerrar sesión:', error);
        throw error;
      });
  }
}
