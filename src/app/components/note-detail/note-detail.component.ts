import { Component } from "@angular/core";
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

export class NoteDetailComponent {

    noteSelected: Note | null = null;
    subscription: Subscription

    constructor(private notesService: NotesService) {
        this.subscription = this.notesService.noteSelected$.subscribe(note => this.noteSelected = note);
    }

}