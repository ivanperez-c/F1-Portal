import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NewsItem } from '../models/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'http://localhost:8080/api/noticias'; 

  constructor(private http: HttpClient) { }

  private longText = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  `;

  /*private mockNews: NewsItem[] = [
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
  ];*/

  /**
   * OBTENER TODAS LAS NOTICIAS
   * -------------------------------------------------------------------------
   * Operación: Devuelve el listado de noticias públicas.
   * Endpoint: GET /api/news
   * @returns Observable<NewsItem[]> Lista de noticias.
   */
  getNews(): Observable<NewsItem[]> {
    // --- API CALL ---
    return this.http.get<NewsItem[]>(this.apiUrl);

    // --- MOCK ---
    //return of(this.mockNews).pipe(delay(800));
  }

  /**
   * OBTENER NOTICIA POR PERMALINK
   * -------------------------------------------------------------------------
   * Operación: Devuelve el detalle de una noticia específica.
   * Endpoint: GET /api/news/permalink/{permalink}
   * @param permalink URL amigable
   * @returns Observable<NewsItem> Objeto noticia.
   */
  getNewsByPermalink(permalink: string): Observable<NewsItem | undefined> {
    // --- API CALL ---
     return this.http.get<NewsItem>(`${this.apiUrl}/permalink/${permalink}`);

    // --- MOCK ---
    //const item = this.mockNews.find(n => n.permalink === permalink);
    //return of(item).pipe(delay(500));
  }

  /**
   * OBTENER NOTICIAS RELACIONADAS
   * -------------------------------------------------------------------------
   * Operación: Devuelve noticias sugeridas (excluyendo la actual).
   * Endpoint: GET /api/news/{permalink}/related
   * @param currentPermalink Permalink de la noticia actual
   * @returns Observable<NewsItem[]> Array de noticias relacionadas.
   */
  getRelatedNews(currentPermalink: string): Observable<NewsItem[]> {
    // --- API CALL ---
     return this.http.get<NewsItem[]>(`${this.apiUrl}/${currentPermalink}/related`);

    // --- MOCK ---
    //const related = this.mockNews.filter(n => n.permalink !== currentPermalink).slice(0, 3);
    //return of(related);
  }

  /**
   * CREAR NOTICIA (ADMIN)
   * -------------------------------------------------------------------------
   * Operación: Crea una nueva noticia en el sistema.
   * Endpoint: POST /api/news
   * @param news Objeto con título, texto, imagen, permalink
   * @returns Observable<NewsItem> Noticia creada.
   */
  createNews(news: Partial<NewsItem>): Observable<NewsItem> {
    // --- API CALL ---
     return this.http.post<NewsItem>(this.apiUrl, news);
    
    // --- MOCK ---
    /*const newItem = { ...news, id: Date.now() } as NewsItem;
    this.mockNews.push(newItem);
    return of(newItem).pipe(delay(600));*/
  }

  /**
   * EDITAR NOTICIA (ADMIN)
   * -------------------------------------------------------------------------
   * Operación: Actualiza una noticia existente.
   * Endpoint: PUT /api/news/{id}
   * @param id ID de la noticia
   * @param news Datos a actualizar
   * @returns Observable<NewsItem> Noticia actualizada.
   */
  updateNews(id: number, news: Partial<NewsItem>): Observable<NewsItem> {
    // --- API CALL ---
     return this.http.put<NewsItem>(`${this.apiUrl}/${id}`, news);

    // --- MOCK ---
    /*const index = this.mockNews.findIndex(n => n.id === id);
    if (index !== -1) {
      this.mockNews[index] = { ...this.mockNews[index], ...news };
      return of(this.mockNews[index]).pipe(delay(600));
    }
    return throwError(() => new Error('Not found'));*/
  }

  /**
   * BORRAR NOTICIA (ADMIN)
   * -------------------------------------------------------------------------
   * Operación: Elimina una noticia.
   * Endpoint: DELETE /api/news/{id}
   * @param id ID de la noticia
   * @returns Observable<boolean> Éxito de la operación.
   */
  deleteNews(id: number): Observable<boolean> {
    // --- API CALL ---
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);

    // --- MOCK ---
    /*this.mockNews = this.mockNews.filter(n => n.id !== id);
    return of(true).pipe(delay(600));*/
  }
}