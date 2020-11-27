import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private afs: AngularFirestore) {
  }

  fetch() {
    return this.afs.collection('themes').valueChanges({idField: 'id'});
  }
}
