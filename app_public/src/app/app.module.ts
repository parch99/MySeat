import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppUsmerjanjeModule } from './moduli/app-usmerjanje/app-usmerjanje.module';

import { SeznamLokacijComponent } from './skupno/komponenti/seznam-lokacij/seznam-lokacij.component';
import { RazdaljaPipe } from './skupno/cevi/razdalja.pipe';
import { OgrodjeComponent } from './skupno/komponenti/ogrodje/ogrodje.component';
import { InformacijeComponent } from './skupno/komponenti/informacije/informacije.component';
import { HomepageComponent } from './skupno/komponenti/homepage/homepage.component';
import { HtmlPrelomVrsticePipe } from './skupno/cevi/html-prelom-vrstice.pipe';
import { ZvezdiceComponent } from './skupno/komponenti/zvezdice/zvezdice.component';
import { StranSPodrobnostmiComponent } from './skupno/komponenti/stran-s-podrobnostmi/stran-s-podrobnostmi.component';
import { PodrobnostiLokacijeComponent } from './skupno/komponenti/podrobnosti-lokacije/podrobnosti-lokacije.component';
import { DovoliUrlPipe } from './skupno/cevi/dovoli-url.pipe';
import { NajnovejsiNajprejPipe } from './skupno/cevi/najnovejsi-najprej.pipe';
import { EvriceComponent } from './skupno/komponenti/evrice/evrice.component';
import { HomeUserComponent } from './skupno/komponenti/home-user/home-user.component';
import { MapaComponent } from './skupno/komponenti/mapa/mapa.component';
import { RegistracijaComponent } from './skupno/komponenti/registracija/registracija.component';
import { PrijavaComponent } from './skupno/komponenti/prijava/prijava.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IzbrisiIdPipe } from './skupno/cevi/izbrisi-id.pipe';
import { NotFoundComponentComponent } from './skupno/komponenti/not-found-component/not-found-component.component';
import { AccountRecoveryComponent } from './skupno/komponenti/account-recovery/account-recovery.component';
import { PasswordResetComponent } from './skupno/komponenti/password-reset/password-reset.component';


@NgModule({
  declarations: [
    SeznamLokacijComponent,
    RazdaljaPipe,
    OgrodjeComponent,
    InformacijeComponent,
    HomepageComponent,
    HtmlPrelomVrsticePipe,
    ZvezdiceComponent,
    StranSPodrobnostmiComponent,
    PodrobnostiLokacijeComponent,
    DovoliUrlPipe,
    NajnovejsiNajprejPipe,
    EvriceComponent,
    HomeUserComponent,
    MapaComponent,
    PrijavaComponent,
    RegistracijaComponent,
    IzbrisiIdPipe,
    NotFoundComponentComponent,
    AccountRecoveryComponent,
    PasswordResetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    AppUsmerjanjeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [OgrodjeComponent]
})
export class AppModule {}
