import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBeerDialogComponent } from './new-beer-dialog.component';

describe('NewBeerDialogComponent', () => {
  let component: NewBeerDialogComponent;
  let fixture: ComponentFixture<NewBeerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBeerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBeerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
