import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/core/services/db.service';
import { ToastrService } from 'ngx-toastr';
import { PostModel } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent {

  //newPost: PostModel = {} as PostModel;


  newPost = {
    title: '',
    author: '',
    date: new Date().toLocaleDateString('es-ES'),
    image: '',
    description: '',
    tag:'',
    likes: 0,
    comments: 0,
    views: 0,
  };

  constructor(
    private dbService: DbService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  createPost() {
    this.dbService.createPost(this.newPost).subscribe(
      (data : any) => {
        this.toastr.success('Post creado exitosamente', 'Éxito');
        console.log(data);
        this.redirectAfterDelay('/comunnity', 3000); // Redirigir a la vista de comunidad después de 3 segundos
      },
      (error) => {
        this.toastr.error('Error al crear el post', 'Error');
        console.error(error);
      }
    );
  }

  redirectAfterDelay(url: string, delay: number) {
    setTimeout(() => {
      this.router.navigate([url]);
    }, delay);
  }
}
