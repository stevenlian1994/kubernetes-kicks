import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantSigninComponent } from './merchant-signin.component';

describe('MerchantSigninComponent', () => {
  let component: MerchantSigninComponent;
  let fixture: ComponentFixture<MerchantSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantSigninComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
