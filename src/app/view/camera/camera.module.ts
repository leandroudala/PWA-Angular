import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './camera.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
  declarations: [
    CameraComponent
  ],
  imports: [
    CommonModule,
    ZXingScannerModule
  ],
  exports: [
    CameraComponent
  ]
})
export class CameraModule { }
