import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  Auth,
} from '@angular/fire/auth';
import { doc, setDoc, getDoc, Firestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAdminChanged = new Subject<boolean>();
  private isAdmin: boolean = false;

  constructor(private afs: Firestore, private auth: Auth) {}

  async signup(email: string, password: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    await setDoc(doc(this.afs, 'users', credential.user.uid), {
      isAdmin: false,
    });
    await getDoc(doc(this.afs, 'users', credential.user.uid))
      .then((snapshot) => {
        this.isAdmin = snapshot.data().isAdmin;
        this.isAdminChanged.next(this.isAdmin);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  async login(email: string, password: string): Promise<any> {
    return await signInWithEmailAndPassword(this.auth, email, password)
      .then((cred) => {
        getDoc(doc(this.afs, 'users', cred.user.uid)).then((snapshot) => {
          this.isAdmin = snapshot.data().isAdmin;
          this.isAdminChanged.next(this.isAdmin);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  logout() {
    signOut(this.auth).catch((err) => {
      console.log(err.message);
    });
    this.isAdmin = false;
    this.isAdminChanged.next(this.isAdmin);
  }
}
