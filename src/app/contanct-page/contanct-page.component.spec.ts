import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContanctPageComponent } from './contanct-page.component';

describe('ContanctPageComponent', () => {
  let component: ContanctPageComponent;
  let fixture: ComponentFixture<ContanctPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContanctPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContanctPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
