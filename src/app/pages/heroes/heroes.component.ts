import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

   heroes: HeroeModel[] = [];
   cargando = false;

  constructor( private heroesServices: HeroesService) { }

  ngOnInit() {

    this.cargando = true; 
    this.heroesServices.getHeroes()
      .subscribe( resp => {
        this.heroes = resp;
        this.cargando = false;
      } );

  }

  borrarHeroe( heroe: HeroeModel, i: number ){

    Swal.fire({
       title:'¿Está seguro?',
       text: `Está seguro que desea borrar ${ heroe.nombre }`,
       type: 'question',
       showConfirmButton:true,
       showCancelButton: true
       
    }).then( resp =>{
 
      if ( resp.value) {
        this.heroes.splice(i, 1);
        this.heroesServices.borrarHeroe( heroe.id ).subscribe();

      }


    })

   

    this.heroes.splice(i, 1);
    this.heroesServices.borrarHeroe( heroe.id ).subscribe(); // subscribe es para que se dispare el evento

  }


}
