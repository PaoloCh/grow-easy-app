import { NgOptimizedImage } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
export type Provider = 'github' | 'google' ;

@Component({
  standalone: true,
  imports: [NgOptimizedImage],
  selector: 'app-button-providers',
  templateUrl: './button-providers.component.html',
  styleUrls: ['./button-providers.component.scss'],
})
export class ButtonProviders {
  @Input() isLogin = false;



  providerAction(provider: Provider): void {
    if (provider === 'google') {
      this.signUpWithGoogle();
    } else {
      this.signUpWithGithub();
    }
   
  }

  async signUpWithGoogle(): Promise<void> {

  }

  async signUpWithGithub(): Promise<void> {
  }
  
}