import { CommonModule } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Subscription, interval } from "rxjs";
import { Note } from "src/app/interfaces/note";
import { NotesService } from "src/app/services/notes.service";

@Component({
    standalone: true,
    selector: 'app-note-detail',
    styleUrl: './note-detail.component.scss',
    templateUrl: './note-detail.component.html',
    imports: [IonicModule, CommonModule]
})

export class NoteDetailComponent implements OnDestroy {

    noteSelected: Note | null = null;
    subscription: Subscription;
    showAllNotesSubscription: Subscription;
    intervalSubscription: Subscription;
    isInfoModalOpen: boolean = false;
    isConfirmDeleteModalOpen: boolean = false;
    showAllNotes: boolean = true;

    constructor(private notesService: NotesService) {
        this.subscription = this.notesService.noteSelected$.subscribe(note => this.noteSelected = note);
        this.showAllNotesSubscription = this.notesService.showAllNotes$.subscribe(value => this.showAllNotes = value);
        const source = interval(500);
        this.intervalSubscription = source.subscribe(val => {
            const textArea = document.getElementsByTagName('textarea')[0];
            if(textArea) textArea.style.caretColor = '#fff';
        })
    }

    onTextAreaChange(event: any) {
        if(this.noteSelected?.id && event?.detail?.value) {
            const stringSplitted = event.detail.value.split(/[.,\n]+/);
            if(this.showAllNotes) {
                this.notesService.editNote(this.noteSelected.id, stringSplitted[0], event.detail.value);
            } else {
                this.notesService.editTrashNote(this.noteSelected.id, stringSplitted[0], event.detail.value);
            }            
        }
    }

    onOpenModal(modalName: string) {
        modalName === 'info' && (this.isInfoModalOpen = true);
        modalName === 'delete' && (this.isConfirmDeleteModalOpen = true);
    }

    onCloseModal(modalName: string) {
        modalName === 'info' && (this.isInfoModalOpen = false);
        modalName === 'delete' && (this.isConfirmDeleteModalOpen = false);
    }

    onDeleteNote() {
        this.noteSelected &&  this.notesService.deleteNote(this.noteSelected);
    }

    onRestoreNote() {
        const updatedNotes = this.notesService.allNotes$.value;
        this.noteSelected && updatedNotes.unshift(this.noteSelected);
        this.notesService.allNotes$.next(updatedNotes);
        this.noteSelected && this.notesService.deleteTrashNote(this.noteSelected);
    }

    onDeleteNoteForever() {
        this.noteSelected && this.notesService.deleteTrashNote(this.noteSelected);
        this.isConfirmDeleteModalOpen = false;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.intervalSubscription.unsubscribe();
        this.showAllNotesSubscription.unsubscribe();
    }

}