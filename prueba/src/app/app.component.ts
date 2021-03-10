import { PruebaService } from './services/prueba.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'prueba';
  form: FormGroup;
  usuarios: any[] = [];
  id = '';

  constructor(
    private service: PruebaService,
    private Fbuilder: FormBuilder
  ){
    this.builderForm();
  }

  ngOnInit(): void {
    this.getUserList();
  }

  builderForm(){
    this.form = this.Fbuilder.group({
      user: ['', [Validators.required]],
      job: ['', [Validators.required]]
    });
  }
  addUser(event: Event){
    event.preventDefault();
    if (this.form.valid) {
      this.service.createUsers(this.form.value).subscribe(
        (resp: any) => {
          console.log(resp);
          this.form.reset();
        },
        (error: any) => {
          console.log('Ha ocurrido un error', error);
        }
      );
    } else {
      alert('Formulario invalido');
    }
  }

  getUserList() {
    this.service.getUserList('2').subscribe(
      (resp: any) => {
        console.log('Respuesta', resp);
        this.usuarios = resp.data;
      },
      (error: any) => {
        console.log('Ha ocurrido un error', error);
      }
    );
  }
  searchUserId(){
    if (this.id !== '') {
      this.service.getUserId(this.id).subscribe(
        (resp: any) => {
          console.log(resp);
        },
        (error: any) => {
          console.log('Ha ocurrido un error', error);
        }
      );
    } else {
      alert('No puede buscar vacio');
    }
  }
}
