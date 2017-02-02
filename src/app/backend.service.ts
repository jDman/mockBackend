import { MockBackend } from '@angular/http/testing';
import { Http, HttpModule, BaseRequestOptions } from '@angular/http';

export let BackendServiceFactory = (backend, options) => {
  return new Http(backend, options);
};

export let BackendServiceProvider = {
  provide: Http,
  deps: [MockBackend, BaseRequestOptions],
  useFactory: BackendServiceFactory
}
