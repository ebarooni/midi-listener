import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceConfiguratorComponent } from './device-configurator.component';

describe('DeviceConfiguratorComponent', () => {
  let component: DeviceConfiguratorComponent;
  let fixture: ComponentFixture<DeviceConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceConfiguratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
