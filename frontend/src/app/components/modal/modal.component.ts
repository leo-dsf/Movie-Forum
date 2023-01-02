import {Component, Injectable} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

@Injectable()
export class ModalComponent {

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
