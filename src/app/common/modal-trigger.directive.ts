import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { jquery_token } from './jquery.service';

@Directive({
  //use [modal-trigger] instead of modal-trigger, it is an attribute not an element
  selector: '[modal-trigger]',
})
export class ModalTriggerDirective implements OnInit {
  @Input('modal-trigger') modalId: string;
  private el: HTMLElement;
  constructor(ref: ElementRef, @Inject(jquery_token) private $: any) {
    this.el = ref.nativeElement;
  }

  ngOnInit() {
    this.el.addEventListener('click', (e) => {
      this.$(`#${this.modalId}`).modal({});
    });
  }
}
