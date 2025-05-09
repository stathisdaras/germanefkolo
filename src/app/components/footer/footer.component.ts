import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
  standalone: true
})
export class FooterComponent {
  constructor(private translationService: TranslationService) {}

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }
} 