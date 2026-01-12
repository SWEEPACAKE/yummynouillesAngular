import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavoirFaire } from './savoir-faire';

describe('SavoirFaire', () => {
  let component: SavoirFaire;
  let fixture: ComponentFixture<SavoirFaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavoirFaire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavoirFaire);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
