import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex space-x-2">
      <button 
        *ngFor="let lang of languages" 
        (click)="switchLanguage(lang.code)"
        [class.bg-blue-600]="currentLang === lang.code"
        [class.text-white]="currentLang === lang.code"
        class="px-3 py-1 rounded-md hover:bg-gray-200 transition-colors"
      >
        {{ lang.label }}
      </button>
    </div>
  `
})
export class LanguageSwitcherComponent {
  languages = [
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
    { code: 'el', label: 'EL' }
  ];
  currentLang = 'de';

  constructor(private translationService: TranslationService) {
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  switchLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }
} 