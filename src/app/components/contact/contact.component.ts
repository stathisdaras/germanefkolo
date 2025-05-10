import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less'],
  standalone: true
})
export class ContactComponent {
  constructor(private translationService: TranslationService) {}

  translate(key: string): string {
    return this.translationService.translate(key);
  }
} 