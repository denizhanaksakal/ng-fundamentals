import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { jquery_token } from './jquery.service';

@Component({
  selector: 'simple-modal',
  template: `
    <div id="{{ elementID }}" #modalcontainer class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
            <h4 class="modal-title">{{ title }}</h4>
          </div>
          <div class="modal-body" (click)="closeModal()">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-body {
        height: 250px;
        overflow-y: scroll;
      }
    `,
  ],
})
export class SimpleModalComponent {
  @Input() title: string;
  @Input() elementID: string;
  @Input() closeOnBodyClick: string;
  @ViewChild('modalcontainer') containerEl: ElementRef;

  constructor(@Inject(jquery_token) private $: any) {}

  closeModal() {
    if (this.closeOnBodyClick === 'true') {
      this.$(this.containerEl.nativeElement).modal('hide');
    }
  }
}
