import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit, OnChanges {
  @Input() article: any = null;
  @Output() saveChanges = new EventEmitter<any>();
  @Output() cancelEdit = new EventEmitter<void>();

  editForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['article']) {
      this.initForm();
      if (this.article) {
        this.editForm.patchValue({
          title: this.article.title,
          link: this.article.link,
          image: this.article.image
        });
      } else {
        this.editForm.reset();
      }
    }
  }

  private initForm() {
    this.editForm = this.formBuilder.group({
      title: [this.article?.title || '', Validators.required],
      image: [this.article?.image || '', Validators.required],
      link: [this.article?.link || '', Validators.required]
    });
  }

  onSaveChanges() {
    if (this.editForm.valid) {
      const updatedData = this.editForm.value;
      this.saveChanges.emit(updatedData);
    }
  }

  onCancelEdit() {
    this.cancelEdit.emit();
  }
}
