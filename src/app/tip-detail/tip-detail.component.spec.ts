import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipDetailComponent } from './tip-detail.component';

describe('TipDetailComponent', () => {
  let component: TipDetailComponent;
  let fixture: ComponentFixture<TipDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
