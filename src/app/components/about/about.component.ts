import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent {
  showMore = false;

  constructor(private translationService: TranslationService) {}

  translate(key: string): string {
    return this.translationService.getTranslation(key);
  }

  toggleShowMore(): void {
    this.showMore = !this.showMore;
  }
} 