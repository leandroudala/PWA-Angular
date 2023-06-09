import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { CameraComponent } from './view/camera/camera.component';
import * as M from "materialize-css"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.sidenav');
      M.Sidenav.init(elems);
    });
  }

  allowedFormats = [ BarcodeFormat.QR_CODE ]
  title = 'pwa_angular';
}
