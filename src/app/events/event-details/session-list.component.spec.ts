import { SessionListComponent } from './session-list.component';
import { ISession } from '../shared/event.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from './voter.service';
import { DurationPipe } from '../shared';
import { By } from '@angular/platform-browser';

describe('SessionListComponent Isolated Test', () => {
  let component: SessionListComponent;
  let mockAuthService, mockVoterService;

  beforeEach(() => {
    component = new SessionListComponent(mockAuthService, mockVoterService);
  });

  describe('ngOnChanges function', () => {
    it('should filter the sessions correctly', () => {
      component.sessions = <ISession[]>[
        { name: 'session 1', level: 'intermediate' },
        { name: 'session 2', level: 'intermediate' },
        { name: 'session 3', level: 'beginner' },
      ];
      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.filteredSessions.length).toBe(2);
    });

    it('should sort the sessions correctly', () => {
      component.sessions = <ISession[]>[
        { name: 'session 1', level: 'intermediate' },
        { name: 'session 3', level: 'intermediate' },
        { name: 'session 2', level: 'beginner' },
      ];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.filteredSessions[2].name).toBe('session 3');
    });
  });
});

describe('SessionListComponent Integrated Test', () => {
  let component: SessionListComponent;
  let mockAuthService, mockVoterService;
  let fixture: ComponentFixture<SessionListComponent>;
  let element: HTMLElement;
  let debugElement: DebugElement;

  beforeEach(() => {
    mockAuthService = {
      isAuthenticated: () => true,
      currentUser: { userName: 'Joe' },
    };
    mockVoterService = { userHasVoted: () => true };

    TestBed.configureTestingModule({
      declarations: [SessionListComponent, DurationPipe],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: VoterService, useValue: mockVoterService },
      ],
      schemas: [NO_ERRORS_SCHEMA], //ignore child components
    });

    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    element = fixture.nativeElement;
  });

  describe('Initial Display', () => {
    it('should have the correct name', () => {
      component.sessions = <ISession[]>[
        {
          name: 'Session 1',
          id: 3,
          presenter: 'Joe',
          level: 'beginner',
          abstract: 'abstract',
          voters: ['john', 'bob'],
        },
      ];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;
      component.ngOnChanges(); //for initializing filteredSessions

      fixture.detectChanges();

      expect(element.querySelector('[well-title]').textContent).toContain(
        'Session 1'
      ); //toBe or toEqual can match other elements in div,toContain can match name
      expect(
        debugElement.query(By.css('[well-title]')).nativeElement.textContent
      ).toContain('Session 1');
    });
  });
});
