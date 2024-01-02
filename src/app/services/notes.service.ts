import { Injectable } from "@angular/core";
import { Note } from "../interfaces/note";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})

export class NotesService {

    allNotes$: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>(
        [{ id: 'n1', excerpt: 'buy more books', fullContent: 'buy more books. buy more books.' }, { id: 'n2', excerpt: 'do abs workout', fullContent: 'do many many abs. Repeat.' }]
    )
    
    // noteSelected$: BehaviorSubject<Note> = new BehaviorSubject<Note>(this.allNotes[0]);
    noteSelected$: BehaviorSubject<Note> = new BehaviorSubject<Note>(this.allNotes$.value[0]);
    showAllNotes$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);


    getNote(noteId: string) {
        const noteIdentified = this.allNotes$.value.find(note => note.id === noteId);
        return noteIdentified ? noteIdentified : -1;
    }

    addNote(note: Note) {
        const updatedNotes = this.allNotes$.value;
        updatedNotes.push(note);
        this.allNotes$.next(updatedNotes)
    }

    editNote(noteId: string, noteContent: string) {
        let updatedNotes = this.allNotes$.value;
        updatedNotes = updatedNotes.map(note => note.id === noteId ? {...note, fullContent: noteContent} : note);
        this.allNotes$.next(updatedNotes);
    }

    deleteNote(noteId: string) {
        let updatedNotes = this.allNotes$.value;
        updatedNotes = updatedNotes.filter(note => note.id !== note.id);
        this.allNotes$.next(updatedNotes);
    }

    updateNoteSelected(note: Note) {
        this.noteSelected$.next(note);
    }

    toggleListSection(showAllNotes: boolean) {
        this.showAllNotes$.next(showAllNotes)
    }

}

