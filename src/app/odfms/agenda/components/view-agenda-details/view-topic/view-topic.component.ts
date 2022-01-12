import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'view-topic',
    templateUrl: './view-topic.component.html',
    styleUrls: ['./view-topic.component.scss']
})
export class ViewTopicComponent implements OnInit {
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
