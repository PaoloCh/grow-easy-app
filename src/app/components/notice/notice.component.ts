import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {
  articles: any[] = [];
  loading: boolean = true;

  constructor(private apiService: NewsService) {}

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.apiService.getListNews().subscribe((data: any) => {
      this.articles = data;
      this.loading = false;
    });
  }

  scrollToArticle(title: string) {
    const element = document.getElementById(title);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
