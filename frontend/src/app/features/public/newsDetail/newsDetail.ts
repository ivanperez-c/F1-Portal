import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NewsService } from '../../../core/services/news.service';
import { NewsItem } from '../../../core/models/news.interface';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './newsDetail.html',
  styleUrls: ['./newsDetail.scss']
})
export class NewsDetail implements OnInit {

  newsItem?: NewsItem;
  relatedNews: NewsItem[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.loading = true;
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0);
        }
        const permalink = params.get('permalink')!;
        return this.newsService.getNewsByPermalink(permalink);
      })
    ).subscribe(item => {
      this.newsItem = item;
      this.loading = false;
      
      if (item) {
        this.loadRelated(item.permalink);
      }
    });
  }

  loadRelated(currentPermalink: string) {
    this.newsService.getRelatedNews(currentPermalink).subscribe(related => {
      this.relatedNews = related.slice(0, 3);
    });
  }
}