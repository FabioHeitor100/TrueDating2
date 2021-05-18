import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PagesRedirectDivComponent } from './pages-redirect-div.component';

describe('PagesRedirectDivComponent', () => {
  let component: PagesRedirectDivComponent;
  let fixture: ComponentFixture<PagesRedirectDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesRedirectDivComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagesRedirectDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
