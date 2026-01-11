import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { NewsService } from '../../../core/services/news.service';
import { CircuitService } from '../../../core/services/circuit.service';
import { NewsItem } from '../../../core/models/news.interface';
import { Circuit } from '../../../core/models/circuit.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('mainContainer') mainContainer!: ElementRef;

  latestNews: NewsItem[] = [];
  nextRace?: Circuit;
  upcomingRaces: Circuit[] = [];
  
  days = '00'; hours = '00'; minutes = '00'; seconds = '00';
  private timerInterval: any;
  private ctx: any;

  constructor(
    private newsService: NewsService,
    private circuitService: CircuitService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngOnInit(): void {
    this.newsService.getNews().subscribe(news => this.latestNews = news.slice(0, 5));
    
    this.circuitService.getCircuits().subscribe(calendar => {
      const now = new Date();
      const nextIndex = calendar.findIndex(c => new Date(c.date) > now);
      
      if (nextIndex !== -1) {
        this.nextRace = calendar[nextIndex];
        this.upcomingRaces = calendar.slice(nextIndex + 1, nextIndex + 4);
        this.startCountdown(new Date(this.nextRace.date));
      }
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      
      this.ctx = gsap.context(() => {
        
        const tl = gsap.timeline();

        tl.from('.home__hero__content__header__title__char', { 
          y: 100, 
          opacity: 0, 
          stagger: 0.05, 
          duration: 0.8, 
          ease: 'back.out(1.7)' 
        })
        
        .from('.home__hero__content__telemetry', { 
          scaleX: 0, 
          duration: 1, 
          ease: 'expo.inOut' 
        }, '-=0.5')
        
        .from('.home__hero__content__header__meta, .home__hero__scroll', { 
          opacity: 0, 
          y: 20, 
          duration: 0.5 
        }, '-=0.2');
      }, this.mainContainer);
    }
  }

  ngOnDestroy(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.ctx) this.ctx.revert();
  }

  startCountdown(targetDate: Date) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      if (distance < 0) {
        clearInterval(this.timerInterval);
        return;
      }
      
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }, 1000);
  }
}