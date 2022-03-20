import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../common/toastr.service';
import { EventService } from './shared/event-services';

@Component({
  selector: 'events-list',
  template: `
    <div>
      <h1>Upcoming Angular Events</h1>
      <hr />
      <div class="row">
        <div class="col-md-6" *ngFor="let event of events">
          <events-thumbnail
            (click)="handleThumbnailClick(event.name)"
            [eventDetails]="event"
          ></events-thumbnail>
        </div>
      </div>
    </div>
  `,
})
export class EventsListComponent implements OnInit {
  events: any[];
  constructor(
    private eventService: EventService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.events = this.eventService.getEvents();
  }
  handleThumbnailClick(eventName) {
    this.toastr.info(eventName);
  }
}
