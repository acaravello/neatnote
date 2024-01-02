import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Note } from "src/app/interfaces/note";
import { NotesService } from "src/app/services/notes.service";

@Component({
    standalone: true,
    selector: 'app-notes-list',
    styleUrl: './notes-list.component.scss',
    templateUrl: './notes-list.component.html',
    imports: [IonicModule, CommonModule]
})

export class NotesListComponent {

    sectionTitle: string = 'All Notes';
    notesToDisplay: Note[] = [];
    noteSelected: string = '';

    constructor(notesService: NotesService) {
        const showAllNotes = notesService.getMenuSectionVisible();
        if(!showAllNotes) this.sectionTitle = 'Trash'
        this.notesToDisplay = notesService.getNotes();
        if(this.notesToDisplay && this.notesToDisplay.length > 0) {
            this.noteSelected = this.notesToDisplay[0].id;
        }
    }

    onSetSelectedNote(noteId: string) {
        this.noteSelected = noteId;
    }

    checkPreviousOfSelected(noteId: string) {
        const noteToCheckIndex = this.notesToDisplay.findIndex( note=> note.id === noteId);
        if(this.notesToDisplay[noteToCheckIndex + 1] && this.notesToDisplay[noteToCheckIndex + 1].id === this.noteSelected) {
            return true;
        } 
        return false;
    }
}