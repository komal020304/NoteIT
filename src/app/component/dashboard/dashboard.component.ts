import { Component, NgModule, OnInit } from '@angular/core';
import { Note } from '../../model/note';
import { DataService } from '../../shared/data.service';
import { FormsModule } from '@angular/forms';

// @NgModule({
//   imports: [FormsModule],
// })

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  NotesList: Note[] = [];
  noteObj: Note = {
    title: '',
    note_type: '',
    name: '',
    email: '',
    description: '',
  };
  title: string = '';
  note_type: string = '';
  name: string = '';
  email: string = '';
  description: string = '';

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getAllNotes();
  }

  getAllNotes() {
    this.data.getAllNotes().subscribe((res: any[]) => {
      this.NotesList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.title = e.payload.doc.title;
        return data;
      });
    });
  }

  resetForm() {
    this.title = '';
    this.note_type = '';
    this.name = '';
    this.email = '';
    this.description = '';
  }

  addNote() {
    if (
      this.note_type == '' ||
      this.name == '' ||
      this.description == '' ||
      this.email == ''
    ) {
      alert('Fill all input fields');
      return;
    }

    this.noteObj.title = '';
    this.noteObj.email = this.email;
    this.noteObj.note_type = this.note_type;
    this.noteObj.name = this.name;
    this.noteObj.description = this.description;

    this.data.addNote(this.noteObj);
    this.resetForm();
  }

  updateNote() {}

  deleteNote(note: Note) {
    if (
      window.confirm(
        'Are you sure you want to delete ' +
          note.title +
          ' of author ' +
          note.name +
          ' ?'
      )
    ) {
      this.data.deleteNote(note);
    }
  }
}
