import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { ImageCaroselComponent } from './components/image-carosel/image-carosel.component';
import { DialogModule } from 'primeng/dialog';
import { MenuComponent } from './components/menu/menu.component';
import { DropdownModule } from 'primeng/dropdown';
import { CepPipe } from './pipe/cep/cep.pipe';
import { AccordionModule } from 'primeng/accordion';
import { SidebarModule } from 'primeng/sidebar';
import { LazyLoadImageModule } from 'ng-lazyload-image'; // <-- import it
import { LoadingController } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DialogModule,
    DropdownModule,
    AccordionModule,
    SidebarModule,
    LazyLoadImageModule
    
  ],
  declarations: [
    ImageCaroselComponent,
    MenuComponent,
    CepPipe,
    
  ],
  exports: [
    ImageCaroselComponent,
    MenuComponent,
    DropdownModule,
    CepPipe,
    AccordionModule,
    LazyLoadImageModule
  ],
  providers: [LoadingController]
})
export class SharedModule { }
