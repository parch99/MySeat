import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from '../../skupno/komponenti/homepage/homepage.component';
import { InformacijeComponent } from '../../skupno/komponenti/informacije/informacije.component';
import { StranSPodrobnostmiComponent } from '../../skupno/komponenti/stran-s-podrobnostmi/stran-s-podrobnostmi.component';
import { HomeUserComponent } from '../../skupno/komponenti/home-user/home-user.component';
import { MapaComponent } from '../../skupno/komponenti/mapa/mapa.component';
import { SeznamLokacijComponent } from '../../skupno/komponenti/seznam-lokacij/seznam-lokacij.component';
import { RegistracijaComponent } from '../../skupno/komponenti/registracija/registracija.component';
import { PrijavaComponent } from '../../skupno/komponenti/prijava/prijava.component';
import { NotFoundComponentComponent } from '../../skupno/komponenti/not-found-component/not-found-component.component';
import { AccountRecoveryComponent } from '../../skupno/komponenti/account-recovery/account-recovery.component';
import { PasswordResetComponent } from '../../skupno/komponenti/password-reset/password-reset.component';

const poti: Routes = [
  {
    path: '',
    component: HomepageComponent
  }, {
    path: 'map',
    component: MapaComponent
  }, {
    path: 'informacije',
    component: InformacijeComponent
  }, {
    path: 'seznam-lokacije',
    component: SeznamLokacijComponent
  }, {
    path: 'lokacija/:idLokacije',
    component: StranSPodrobnostmiComponent
  }, {
    path: 'uporabnik/:idUporabnika',
    component: HomeUserComponent
  }, {
    path: 'registracija',
    component: RegistracijaComponent
  }, {
    path: 'prijava',
    children: [
      { path: '', component: PrijavaComponent },
      { path: 'google/:token', component: PrijavaComponent }, 
      { path: 'facebook/:token', component: PrijavaComponent },
    ]
  }, {
    path: 'account-recovery',
    component: AccountRecoveryComponent
  }, {
    path: 'reset/:token',
    component: PasswordResetComponent
  }, { 
    path: '404', 
    component: NotFoundComponentComponent
  }, {
     path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(poti)
  ],
  exports: [RouterModule]
})

export class AppUsmerjanjeModule { }