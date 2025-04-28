import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Language {
  code: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-language-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.less']
})
export class LanguagePickerComponent implements OnInit {
  currentLang: string;

  languages: Language[] = [
    { code: 'de', name: 'Deutsch', icon: '🇩🇪' },
    { code: 'en', name: 'English', icon: '🇬🇧' },
    { code: 'el', name: 'Ελληνικά', icon: '🇬🇷' }
  ];

  constructor(private translationService: TranslationService) {
    this.currentLang = 'de';
    this.translationService.currentLang$
      .pipe(takeUntilDestroyed())
      .subscribe(lang => {
        this.currentLang = lang;
      });
  }

  ngOnInit() {
    // Initialization code if needed
  }

  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.currentLang = lang;
  }

  getCurrentLanguageName(): string {
    return this.languages.find(lang => lang.code === this.currentLang)?.name || '';
  }

  getCurrentLanguageIcon(): string {
    return this.languages.find(lang => lang.code === this.currentLang)?.icon || '';
  }
} 