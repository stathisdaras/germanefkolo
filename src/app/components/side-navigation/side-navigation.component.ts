import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <div class="flex flex-col space-y-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
        <a href="#hero" 
           class="p-3 rounded-full hover:bg-blue-50 transition-colors duration-200 group"
           title="Home">
          <svg class="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        </a>
        <a href="#about" 
           class="p-3 rounded-full hover:bg-blue-50 transition-colors duration-200 group"
           title="About">
          <svg class="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </a>
        <a href="#services" 
           class="p-3 rounded-full hover:bg-blue-50 transition-colors duration-200 group"
           title="Services">
          <svg class="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
        </a>
        <a href="#testimonials" 
           class="p-3 rounded-full hover:bg-blue-50 transition-colors duration-200 group"
           title="Testimonials">
          <svg class="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </a>
        <a href="#contact" 
           class="p-3 rounded-full hover:bg-blue-50 transition-colors duration-200 group"
           title="Contact">
          <svg class="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </a>
      </div>
    </nav>
  `
})
export class SideNavigationComponent {} 