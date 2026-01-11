import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from '../../../core/services/news.service';
import { NewsItem } from '../../../core/models/news.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-news',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {

  newsList: NewsItem[] = [];
  isLoading = true;
  
  showForm = false;
  isEditing = false;
  editingId: number | null = null;
  newsForm: FormGroup;

  constructor(private newsService: NewsService, private fb: FormBuilder) {
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      permalink: ['', Validators.required],
      image: ['', Validators.required],
      text: ['', Validators.required]
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
      title: news.title,
      permalink: news.permalink,
      image: news.image,
      text: news.text
    });
    this.showForm = true;
  }

  cancelForm() {
    this.showForm = false;
    this.newsForm.reset();
  }
  
  onSubmit() {
    if (this.newsForm.invalid) return;

    if (this.isEditing && this.editingId) {
      this.newsService.updateNews(this.editingId, this.newsForm.value).subscribe(() => {
        this.loadNews(); 
        this.cancelForm();
        this.showToast('Noticia actualizada');
      });
    } else {
      this.newsService.createNews(this.newsForm.value).subscribe(() => {
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