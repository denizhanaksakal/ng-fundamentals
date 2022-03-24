import { InjectionToken } from '@angular/core';

export let toastr_token = new InjectionToken<Toastr>('');

export interface Toastr {
  success(msg: string, title?: string): void;
  info(msg: string, title?: string): void;
  warining(msg: string, title?: string): void;
  error(msg: string, title?: string): void;
}
