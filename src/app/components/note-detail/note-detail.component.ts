import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Note } from "src/app/interfaces/note";
import { NotesService } from "src/app/services/notes.service";

@Component({
    standalone: true,
    selector: 'app-note-detail',
    styleUrl: './note-detail.component.scss',
    templateUrl: './note-detail.component.html',
    imports: [IonicModule]
})

export class NoteDetailComponent implements OnInit{

    noteSelected: Note | null = null;
    subscription: Subscription;
    isInfoModalOpen: boolean = false;
    isConfirmDeleteModalOpen: boolean = false;

    constructor(private notesService: NotesService) {
        this.subscription = this.notesService.noteSelected$.subscribe(note => this.noteSelected = note);
    }

    ngOnInit(): void {
        setTimeout(() => {
        const textArea = document.getElementsByTagName('textarea')[0];
        textArea.style.caretColor = '#fff';
        }, 2000);
    }

    onTextAreaChange(event: any) {
        if(this.noteSelected?.id && event?.detail?.value) {
            this.notesService.editNote(this.noteSelected.id, event.detail.value);
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

}