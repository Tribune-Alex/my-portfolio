import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-contact',
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class Contact {
  copyMessage = '';

async copyPhone(): Promise<void> {
  try {
    await navigator.clipboard.writeText('+995579284717');
    this.copyMessage = 'Phone number copied!';
  } catch {
    this.copyMessage = 'Please copy: +995 579 284 717';
  }
}
}
