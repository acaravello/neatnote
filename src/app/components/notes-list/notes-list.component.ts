import { CommonModule } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Note } from "src/app/interfaces/note";
import { NotesService } from "src/app/services/notes.service";

@Component({
    standalone: true,
    selector: 'app-notes-list',
    styleUrl: './notes-list.component.scss',
    templateUrl: './notes-list.component.html',
    imports: [IonicModule, CommonModule]
})

export class NotesListComponent implements OnDestroy{

    notesToDisplay: Note[] = [];
    trashedNoteToDisplay: Note[] = [];
    noteSelected: string = '';
    allNotesSubscription: Subscription;
    trashedNotesSubscription: Subscription;
    subscription: Subscription;
    subscriptionMenu: Subscription;
    showAllNotes: boolean = true;
    isEmptyTrashModalOpen: boolean = false;

    constructor(private notesService: NotesService) {
        this.allNotesSubscription = notesService.allNotes$.subscribe(notes => this.notesToDisplay = notes);
        this.trashedNotesSubscription = notesService.trashedNotes$.subscribe(notes => this.trashedNoteToDisplay = notes);
        this.subscription = notesService.noteSelected$.subscribe(note => note && (this.noteSelected = note.id));
        this.subscriptionMenu = notesService.showAllNotes$.subscribe(show => this.showAllNotes = show);
    }

    onSetSelectedNote(noteSelected: Note) {
        this.notesService.updateNoteSelected(noteSelected);
    }

    checkPreviousOfSelected(noteId: string) {
        const noteToCheckIndex = this.notesToDisplay.findIndex( note=> note.id === noteId);
        if(this.notesToDisplay[noteToCheckIndex + 1] && this.notesToDisplay[noteToCheckIndex + 1].id === this.noteSelected) {
            return true;
        } 
        return false;
    }

    onOpenTrashModal() {
        this.isEmptyTrashModalOpen = true;
    }

    onCloseTrashModal() {
        this.isEmptyTrashModalOpen = false;
    }

    onEmptyTrash() {
        this.notesService.emptyTrash();
        this.isEmptyTrashModalOpen = false;
    }

    onAddNewNote() {
        const newNote: Note = {id: Date.now().toString(), excerpt: 'New Note...', fullContent: ''};
        this.notesService.addNote(newNote);
    }

    ngOnDestroy(): void {
        this.allNotesSubscription.unsubscribe();
        this.trashedNotesSubscription.unsubscribe();
        this.subscription.unsubscribe();
        this.subscriptionMenu.unsubscribe();
    }
}