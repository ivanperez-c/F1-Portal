import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from '../../../core/services/news.service';
import { NewsItem } from '../../../core/models/news.interface';
import Swal from 'sweetalert2';
import { inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ImageUploaderComponent } from '../../../shared/image-uploader/image-uploader';

@Component({
  selector: 'app-admin-news',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImageUploaderComponent],
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {

  newsList: NewsItem[] = [];
  isLoading = true;
  authService = inject(AuthService);
  user = this.authService.getUser();

  showForm = false;
  isEditing = false;
  editingId: number | null = null;
  newsForm: FormGroup;

  constructor(private newsService: NewsService, private fb: FormBuilder) {
    this.newsForm = this.fb.group({
      titulo: ['', Validators.required],
      permalink: ['', Validators.required],
      imagen: ['', Validators.required],
      texto: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.isLoading = true;
    this.newsService.getNews().subscribe(data => {
      this.newsList = data;
      this.isLoading = false;
    });
  }

  openCreate() {
    this.isEditing = false;
    this.editingId = null;
    this.newsForm.reset();
    this.showForm = true;
  }

  openEdit(news: NewsItem) {
    this.isEditing = true;
    this.editingId = news.id;
    this.newsForm.patchValue({
      titulo: news.titulo,
      permalink: news.permalink,
      imagen: news.imagen,
      texto: news.texto
    });
    this.showForm = true;
  }

  cancelForm() {
    this.showForm = false;
    this.newsForm.reset();
  }
  
  onSubmit() {
    if (this.newsForm.invalid) return;

    const formVal = this.newsForm.value;
    const newsData: any = {
      titulo: formVal.titulo,
      permalink: formVal.permalink,
      imagen: formVal.imagen,
      texto: formVal.texto,
      autor: { id: this.user?.id }
    };

    if (this.isEditing && this.editingId) {
      this.newsService.updateNews(this.editingId, newsData).subscribe(() => {
        this.loadNews(); 
        this.cancelForm();
        this.showToast('Noticia actualizada');
      });
    } else {
      this.newsService.createNews(newsData).subscribe(() => {
        this.loadNews();
        this.cancelForm();
        this.showToast('Noticia publicada');
      });
    }
  }

  deleteNews(id: number) {
    Swal.fire({
      title: '¿Borrar noticia?',
      text: "Desaparecerá del portal público.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e10600',
      background: '#141414', color: '#fff',
      confirmButtonText: 'Sí, borrar'
    }).then((res) => {
      if (res.isConfirmed) {
        this.newsService.deleteNews(id).subscribe(() => {
          this.newsList = this.newsList.filter(n => n.id !== id);
          this.showToast('Noticia eliminada');
        });
      }
    });
  }

  private showToast(msg: string) {
    Swal.mixin({
      toast: true, position: 'top-end', showConfirmButton: false, timer: 3000,
      background: '#141414', color: '#fff', iconColor: '#e10600', timerProgressBar: true
    }).fire({ icon: 'success', title: msg });
  }
}