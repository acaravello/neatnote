import { Injectable } from "@angular/core";
import { Note } from "../interfaces/note";
import { BehaviorSubject } from "rxjs";

const mockNotes =  [{ id: 'n1', excerpt: 'buy more books', fullContent: 'buy more books. and read them.' }, { id: 'n2', excerpt: 'eat more vegetables', fullContent: 'eat vegetables. They\'re healthy.' }]

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
        updatedNotes.unshift(note);
        this.allNotes$.next(updatedNotes);
        this.noteSelected$.next(note);
    }

    editNote(noteId: string, noteExcerpt: string, noteContent: string) {
        let updatedNotes = this.allNotes$.value;
        updatedNotes = updatedNotes.map(note => note.id === noteId ? {...note, excerpt: noteExcerpt, fullContent: noteContent} : note);
        this.noteSelected$.next({id: noteId, excerpt: noteExcerpt, fullContent: noteContent});
        this.allNotes$.next(updatedNotes);
    }

    editTrashNote(noteId: string, noteExcerpt: string, noteContent: string) {
        let updatedTrashNotes = this.trashedNotes$.value;
        updatedTrashNotes = updatedTrashNotes.map(note => note.id === noteId ? {...note, excerpt: noteExcerpt, fullContent: noteContent} : note);
        this.noteSelected$.next({id: noteId, excerpt: noteExcerpt, fullContent: noteContent});
        this.trashedNotes$.next(updatedTrashNotes);
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

    deleteTrashNote(noteFromTrash: Note) {
        let updatedTrashNotes = this.trashedNotes$.value;
        updatedTrashNotes = updatedTrashNotes.filter(note => note.id !== noteFromTrash.id);
        this.trashedNotes$.next(updatedTrashNotes);
        this.noteSelected$.next(updatedTrashNotes.length > 0 ? updatedTrashNotes[0] : null);
    }

    emptyTrash() {
        this.trashedNotes$.next([]);
        this.noteSelected$.next(null);
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

