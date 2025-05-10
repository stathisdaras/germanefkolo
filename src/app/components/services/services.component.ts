import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.less']
})
export class ServicesComponent {
  constructor(private translationService: TranslationService) {}

  translate(key: string): string {
    return this.translationService.translate(key);
  }
} 