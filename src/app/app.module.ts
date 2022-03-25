import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventlistResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  UpvoteComponent,
  VoterService,
  LocationValidator,
} from './events/index';

import {
  Toastr,
  toastr_token,
  jquery_token,
  CollapsibleWellComponent,
  SimpleModalComponent,
  ModalTriggerDirective,
} from './common/index';

import { NavBarComponent } from './nav/navbar.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.component';
import { EventsAppComponent } from './events-app.component';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

let toastr: Toastr = window['toastr'];
let jquery = window['$'];

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    SimpleModalComponent,
    ModalTriggerDirective,
    DurationPipe,
    UpvoteComponent,
    LocationValidator,
  ],
  providers: [
    EventService,
    { provide: toastr_token, useValue: toastr },
    { provide: jquery_token, useValue: jquery },
    EventRouteActivator,
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
    EventlistResolver,
    AuthService,
    VoterService,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [EventsAppComponent],
})
export class AppModule {}

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty)
    return window.confirm(
      'You have not saved this event, do you really want to cancel?'
    );
  return true;
}
