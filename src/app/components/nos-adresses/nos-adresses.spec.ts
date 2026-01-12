import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosAdresses } from './nos-adresses';

describe('NosAdresses', () => {
  let component: NosAdresses;
  let fixture: ComponentFixture<NosAdresses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosAdresses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosAdresses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
