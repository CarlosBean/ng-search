import { Injectable, ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CustomAlert } from 'src/app/models/custom-alert.model';
import { AlertBoxComponent } from './alert-box.component';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertBoxService {
  accept = new Subject<any>();

  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private resolver: ComponentFactoryResolver
  ) { }

  show(title: string, text: string) {
    const alertbox = document.createElement('alertbox-component');
    const factory = this.resolver.resolveComponentFactory(AlertBoxComponent);
    const component = factory.create(this.injector, [], alertbox);

    this.applicationRef.attachView(component.hostView);

    component.instance.closed.subscribe((output: boolean) => {
      this.accept.next(output);
      this.applicationRef.detachView(component.hostView);
      component.destroy();
    });

    component.instance.config = new CustomAlert('info', title, text);
    document.body.appendChild(alertbox);
  }

  afterClosed(): Observable<boolean> {
    return this.accept.asObservable().pipe(take(1));
  }
}
