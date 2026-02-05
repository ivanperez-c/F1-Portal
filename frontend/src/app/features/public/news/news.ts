import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsService } from '../../../core/services/news.service';
import { NewsItem } from '../../../core/models/news.interface';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news.html',
  styleUrls: ['./news.scss']
})
export class News implements OnInit {

  newsList: NewsItem[] = [];
  loading: boolean = true;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews() {
    this.loading = true;
    this.newsService.getNews().subscribe({
      next: (data) => {
        this.newsList = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    });
  }
}