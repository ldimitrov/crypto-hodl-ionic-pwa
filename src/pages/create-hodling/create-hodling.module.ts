import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateHodlingPage } from './create-hodling';

@NgModule({
  declarations: [
    CreateHodlingPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateHodlingPage),
  ],
})
export class CreateHodlingPageModule {}
