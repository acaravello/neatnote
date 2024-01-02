import { Injectable } from "@angular/core";
import { Note } from "../interfaces/note";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})

export class NotesService {

    showAllNotesNotTrash: boolean = true;
    private allNotes: Note[] = [{ id: 'n1', excerpt: 'buy more books', fullContent: 'buy more books. buy more books.' }, { id: 'n2', excerpt: 'do abs workout', fullContent: 'do many many abs. Repeat.' }];
    noteSelected$: BehaviorSubject<Note> = new BehaviorSubject<Note>(this.allNotes[0]);

    getNotes() {
        return [...this.allNotes];
    }

    getNote(noteId: string) {
        const noteIdentified = this.allNotes.find(note => note.id === noteId);
        return noteIdentified ? noteIdentified : -1;
    }

    addNote(note: Note) {
        this.allNotes.push(note);
    }

    deleteNote(noteId: string) {
        this.allNotes = this.allNotes.filter(note => note.id !== noteId);
    }

    updateNoteSelected(note: Note) {
        this.noteSelected$.next(note);
    }

    toggleListSection(showAllNotes: boolean) {
        this.showAllNotesNotTrash = showAllNotes
    }

    getMenuSectionVisible() {
        return this.showAllNotesNotTrash;
    }
}

