import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Note } from '../model/note';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private afs: AngularFirestore) {}

  // add Note
  addNote(NewNote: Note) {
    NewNote.title = this.afs.createId();
    return this.afs.collection('/Notes').add(NewNote);
  }
  // get all students
  getAllNotes() {
    return this.afs.collection('/Notes').snapshotChanges();
  }
  // delete student
  deleteNote(note: Note) {
    this.afs.doc('/Notes/' + note.title).delete();
  }
  // update student
  updateStudent(note: Note) {
    this.deleteNote(note);
    this.addNote(note);
  }
}
