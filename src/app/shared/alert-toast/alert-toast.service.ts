import { Injectable, Injector, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { ICustomAlert, CustomAlert } from 'src/app/models/custom-alert.model';
import { AlertToastComponent } from './alert-toast.component';

@Injectable({
  providedIn: 'root'
})

export class AlertToastService {

  icons = {
    success: 'fa-check-circle',
    danger: 'fa-times-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle',
  };

  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private resolver: ComponentFactoryResolver
  ) { }

  show(config: ICustomAlert) {
    const alertbox = document.createElement('alertbox-component');
    const factory = this.resolver.resolveComponentFactory(AlertToastComponent);
    const component = factory.create(this.injector, [], alertbox);

    this.applicationRef.attachView(component.hostView);

    setTimeout(() => {
      this.applicationRef.detachView(component.hostView);
      component.destroy();
    }, 2000);

    component.instance.config = config;
    document.body.appendChild(alertbox);
  }

  success(title: string, text: string) {
    const alert = new CustomAlert('success', title, text, this.icons.success);
    this.show(alert);
  }

  danger(title: string, text: string) {
    const alert = new CustomAlert('danger', title, text, this.icons.danger);
    this.show(alert);
  }

  warning(title: string, text: string) {
    const alert = new CustomAlert('warning', title, text, this.icons.warning);
    this.show(alert);
  }

  info(title: string, text: string) {
    const alert = new CustomAlert('info', title, text, this.icons.info);
    this.show(alert);
  }
}
