import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  allowedFormats = [ BarcodeFormat.QR_CODE ]

}
