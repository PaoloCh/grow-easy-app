import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/core/services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: any[] = [];
  loading: boolean = true;
  editMode: boolean = false;
  selectedArticle: any = null;

  constructor(private apiService: ArticlesService) {}

  ngOnInit() {
    this.getArticles();
   
  }

  getArticles() {
    this.apiService.getData().subscribe((data: any) => {
      this.articles = data;
      this.loading = false;
    });
  }

  editArticle(article: any) {
    this.selectedArticle = article;
    this.editMode = true;
  }

  addArticle() {
    this.selectedArticle = null;
    this.editMode = true;
  }

  saveArticle(updatedData: any) {
    if (this.selectedArticle && this.selectedArticle.id) {
      const id = this.selectedArticle.id;
      this.apiService.updateArticle(id, updatedData).subscribe(() => {
        this.getArticles();
        this.editMode = false;
      });
    } else {
      this.apiService.addArticle(updatedData).subscribe(() => {
        this.getArticles();
        this.editMode = false;
      });
    }
  }

  cancelEdit() {
    this.editMode = false;
  }

  deleteArticle(id: number) {
    this.apiService.deleteArticle(id).subscribe(() => {
      this.articles = this.articles.filter(article => article.id !== id);
    });
  }
  scrollToArticle(articleId: number) {
    const element = document.getElementById('article-' + articleId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
}
