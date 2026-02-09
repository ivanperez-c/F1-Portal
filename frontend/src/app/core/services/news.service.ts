import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsItem } from '../models/news.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = `${environment.apiUrl}/api/noticias`; 

  constructor(private http: HttpClient) { }

  getNews(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(this.apiUrl);
  }

  getNewsByPermalink(permalink: string): Observable<NewsItem | undefined> {
     return this.http.get<NewsItem>(`${this.apiUrl}/permalink/${permalink}`);
  }

  getRelatedNews(currentPermalink: string): Observable<NewsItem[]> {
     return this.http.get<NewsItem[]>(`${this.apiUrl}/${currentPermalink}/related`);
  }

  createNews(news: Partial<NewsItem>): Observable<NewsItem> {
     return this.http.post<NewsItem>(this.apiUrl, news);
  }

  updateNews(id: number, news: Partial<NewsItem>): Observable<NewsItem> {
    const noticia = {
        ...news,
        id: id
    };
    return this.http.put<NewsItem>(`${this.apiUrl}`, noticia);
  }

  deleteNews(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}