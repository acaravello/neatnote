import { Injectable } from "@angular/core";
import { Note } from "../interfaces/note";
import { BehaviorSubject } from "rxjs";

const mockNotes =  [
    { id: 'n1', excerpt: 'buy more books', fullContent: 'buy more books. and read them.', created: '01 01 2024, 06:00', modified: '', words: 6, characters: 29 }, 
    { id: 'n2', excerpt: 'eat more vegetables', fullContent: 'eat vegetables. They\'re healthy.', created: '01 01 2024, 06:00', modified: '', words: 4, characters: 31}]

@Injectable({providedIn: 'root'})

export class NotesService {

    allNotes$: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>(mockNotes);
    trashedNotes$: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
    noteSelected$: BehaviorSubject<Note | null> = new BehaviorSubject<Note | null>(this.allNotes$.value[0]);
    showAllNotes$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    getNowDateFormatted() {
        const date = new Date();
        const dateFormatted = `${date.getDate() < 10 ? '0' + date.getDate(): date.getDate()} ${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 } 
        ${date.getFullYear()} , ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes()}`;
        return dateFormatted;
    }

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

    editNote(noteSelected: Note, noteExcerpt: string, noteContent: string) {
        const dateFormatted = this.getNowDateFormatted();
        const totalWords =  noteContent.trim().split(/\s+/).filter(word => word.length > 1).length;
        const totalCharacters = noteContent.length - 1;
        let updatedNotes = this.allNotes$.value;
        updatedNotes = updatedNotes.map(note => note.id === noteSelected.id ? {...note, 
            excerpt: noteExcerpt, fullContent: noteContent, 
            modified: dateFormatted, words: totalWords, characters: totalCharacters} : note);
        this.noteSelected$.next({ ...noteSelected, excerpt: noteExcerpt, fullContent: noteContent, modified: dateFormatted, words: totalWords, characters: totalCharacters });
        this.allNotes$.next(updatedNotes);
    }

    editTrashNote(noteSelected: Note, noteExcerpt: string, noteContent: string) {
        const date = new Date();
        const dateFormatted = `${date.getDate() < 10 ? '0' + date.getDate(): date.getDate()} ${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 } 
        ${date.getFullYear()} , ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes()}`;
        const totalWords =  noteContent.trim().split(/\s+/).filter(word => word.length > 1).length;
        const totalCharacters = noteContent.length - 1;
        let updatedTrashNotes = this.trashedNotes$.value;
        updatedTrashNotes = updatedTrashNotes.map(note => note.id === noteSelected.id ? {...note, 
            excerpt: noteExcerpt, fullContent: noteContent, 
            modified: dateFormatted, words: totalWords, characters: totalCharacters} : note);
        this.noteSelected$.next({ ...noteSelected, excerpt: noteExcerpt, fullContent: noteContent, modified: dateFormatted, words: totalWords, characters: totalCharacters });
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

