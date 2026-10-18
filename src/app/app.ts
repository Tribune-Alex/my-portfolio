import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  imports: [RouterOutlet, TranslatePipe, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('my-portfolio');
  public menuOpen = signal(false);
  public readonly translate = inject(TranslateService);

  currentLanguage = signal('en');

  constructor() {
    this.translate.addLangs(['en', 'ka', 'ru']);
    this.translate.setFallbackLang('en');

    const savedLanguage = localStorage.getItem('language');
    const language = ['en', 'ka', 'ru'].includes(savedLanguage ?? '')
      ? savedLanguage!
      : 'en';

    this.translate.use(language);
    this.currentLanguage.set(language);
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLanguage.set(lang);
    localStorage.setItem('language', lang);
  }

  

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
