import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandeauRouge } from './bandeau-rouge';

describe('BandeauRouge', () => {
  let component: BandeauRouge;
  let fixture: ComponentFixture<BandeauRouge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandeauRouge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandeauRouge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
