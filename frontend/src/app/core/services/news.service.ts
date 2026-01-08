import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { NewsItem } from '../models/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'http://localhost:8080/api/news'; 

  constructor(private http: HttpClient) { }

  private longText = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  `;

  private mockNews: NewsItem[] = [
    {
      id: 1,
      permalink: 'Lorem ipsum dolor sit amet 1',
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://tiermaker.com/images/templates/coches-de-fernando-alonso-153555/1535551681941221.png',
      text: this.longText
    },
    {
      id: 2,
      permalink: 'Lorem ipsum dolor sit amet 2',
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://tiermaker.com/images/templates/coches-de-fernando-alonso-153555/1535551681941221.png',
      text: this.longText
    },
    {
      id: 3,
      permalink: 'Lorem ipsum dolor sit amet 3',
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://tiermaker.com/images/templates/coches-de-fernando-alonso-153555/1535551681941221.png',
      text: this.longText
    },
    {
      id: 4,
      permalink: 'Lorem ipsum dolor sit amet 4',
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://tiermaker.com/images/templates/coches-de-fernando-alonso-153555/1535551681941221.png',
      text: this.longText
    },
    {
      id: 5,
      permalink: 'Lorem ipsum dolor sit amet 5',
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://tiermaker.com/images/templates/coches-de-fernando-alonso-153555/1535551681941221.png',
      text: this.longText
    },
    {
      id: 6,
      permalink: 'Lorem ipsum dolor sit amet 6',
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://tiermaker.com/images/templates/coches-de-fernando-alonso-153555/1535551681941221.png',
      text: this.longText
    },
    {
      id: 7,
      permalink: 'Lorem ipsum dolor sit amet 7',
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://tiermaker.com/images/templates/coches-de-fernando-alonso-153555/1535551681941221.png',
      text: this.longText
    },
    {
      id: 8,
      permalink: 'Lorem ipsum dolor sit amet 8',
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://tiermaker.com/images/templates/coches-de-fernando-alonso-153555/1535551681941221.png',
      text: this.longText
    },
    {
      id: 9,
      permalink: 'Lorem ipsum dolor sit amet 9',
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://tiermaker.com/images/templates/coches-de-fernando-alonso-153555/1535551681941221.png',
      text: this.longText
    },
    {
      id: 10,
      permalink: 'Lorem ipsum dolor sit amet 10',
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://tiermaker.com/images/templates/coches-de-fernando-alonso-153555/1535551681941221.png',
      text: this.longText
    },
    {
      id: 11,
      permalink: 'Lorem ipsum dolor sit amet 11',
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://tiermaker.com/images/templates/coches-de-fernando-alonso-153555/1535551681941221.png',
      text: this.longText
    },
    {
      id: 12,
      permalink: 'Lorem ipsum dolor sit amet 12',
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://tiermaker.com/images/templates/coches-de-fernando-alonso-153555/1535551681941221.png',
      text: this.longText
    },
    {
      id: 13,
      permalink: 'Lorem ipsum dolor sit amet 13',
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://tiermaker.com/images/templates/coches-de-fernando-alonso-153555/1535551681941221.png',
      text: this.longText
    },
    {
      id: 14,
      permalink: 'Lorem ipsum dolor sit amet 14',
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://tiermaker.com/images/templates/coches-de-fernando-alonso-153555/1535551681941221.png',
      text: this.longText
    },
    {
      id: 15,
      permalink: 'Lorem ipsum dolor sit amet 15',
      title: 'Lorem ipsum dolor sit amet',
      image: 'https://tiermaker.com/images/templates/coches-de-fernando-alonso-153555/1535551681941221.png',
      text: this.longText
    }
  ];


  getNews(): Observable<NewsItem[]> {
    
    return of(this.mockNews).pipe(delay(800));

    /*
    return this.http.get<NewsItem[]>(this.apiUrl).pipe(
      map(news => news.map(item => ({
        ...item,
        date: new Date(item.date) 
      })))
    );
    */
  }

  getNewsByPermalink(permalink: string): Observable<NewsItem | undefined> {
    const item = this.mockNews.find(n => n.permalink === permalink);
    return of(item).pipe(delay(500));
  }

  getRelatedNews(currentPermalink: string): Observable<NewsItem[]> {
    const related = this.mockNews
        .filter(n => n.permalink !== currentPermalink)
        .slice(0, 3);
    return of(related);
  }
}