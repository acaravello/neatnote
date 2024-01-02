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
    noteSelected: string = '';
    subscription: Subscription;
    subscriptionMenu: Subscription;
    showAllNotes: boolean = true;

    constructor(private notesService: NotesService) {
        this.notesToDisplay = notesService.getNotes();
        this.subscription = notesService.noteSelected$.subscribe(note => this.noteSelected = note.id);
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

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.subscriptionMenu.unsubscribe();
    }
}