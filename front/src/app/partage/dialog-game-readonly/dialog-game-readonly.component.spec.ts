import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGameReadonlyComponent } from './dialog-game-readonly.component';

describe('DialogGameReadonlyComponent', () => {
  let component: DialogGameReadonlyComponent;
  let fixture: ComponentFixture<DialogGameReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGameReadonlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGameReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
