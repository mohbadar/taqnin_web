import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'view-subject',
    templateUrl: './view-subject.component.html',
    styleUrls: ['./view-subject.component.scss']
})
export class ViewSubjectComponent implements OnInit {
    @Input() data;

    constructor(
        private activeModal: NgbActiveModal
    ) { }

    ngOnInit() {
        console.log(this.data, "Data")
    }

    closeModal() {
        this.activeModal.close();
    }

}
