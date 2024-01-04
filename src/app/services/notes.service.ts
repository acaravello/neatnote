import { Injectable } from "@angular/core";
import { Note } from "../interfaces/note";
import { BehaviorSubject } from "rxjs";

const mockNotes =  [{ id: 'n1', excerpt: 'buy more books', fullContent: 'buy more books. buy more books.' }, { id: 'n2', excerpt: 'eat more vegetables', fullContent: 'eat vegetables. They\'re healty.' }]

@Injectable({providedIn: 'root'})

export class NotesService {

    allNotes$: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>(mockNotes);
    trashedNotes$: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
    noteSelected$: BehaviorSubject<Note | null> = new BehaviorSubject<Note | null>(this.allNotes$.value[0]);
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

    deleteNote(originalNote: Note) {
        let updatedNotes = this.allNotes$.value;
        updatedNotes = updatedNotes.filter(note => note.id !== originalNote.id);
        this.allNotes$.next(updatedNotes);
        const udpdatedTrashedNotes = this.trashedNotes$.value;
        udpdatedTrashedNotes.push(originalNote);
        this.trashedNotes$.next(udpdatedTrashedNotes);
        this.noteSelected$.next(this.allNotes$.value[0])
    }

    updateNoteSelected(note: Note) {
        this.noteSelected$.next(note);
    }

    toggleListSection(showAllNotes: boolean) {
        this.showAllNotes$.next(showAllNotes);
        this.checkIfNoNotes();
    }

    checkIfNoNotes() {
        const showingNotes = this.showAllNotes$.value;
        if(showingNotes) {
            this.noteSelected$.next(this.allNotes$.value.length > 0 ? this.allNotes$.value[0] : null);
        } else {
            this.noteSelected$.next(this.trashedNotes$.value.length > 0 ? this.trashedNotes$.value[0] : null);
        }
    }

}

