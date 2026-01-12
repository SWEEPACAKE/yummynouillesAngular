import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseauxSociaux } from './reseaux-sociaux';

describe('ReseauxSociaux', () => {
  let component: ReseauxSociaux;
  let fixture: ComponentFixture<ReseauxSociaux>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReseauxSociaux]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReseauxSociaux);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
