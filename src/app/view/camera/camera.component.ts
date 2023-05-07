import { Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from "@zxing/ngx-scanner";

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  @ViewChild("scanner", {static: false}) scanner: ZXingScannerComponent;

  autostart = true;

  deviceCurrent: MediaDeviceInfo;

  constructor() { }

  ngOnInit(): void {
    console.log("Started");
  }

  scannedValue = "";
  availableDevices: MediaDeviceInfo[] = [];
  hasDevices = false;
  hasPermission = false;

  async startCamera() {
    if (!this.hasPermission) {
      this.hasPermission = await this.scanner.askForPermission();
      if (!this.hasPermission) {
        throw Error("No Permission");
      } else {
        console.log("Permission granted");
      }
    }

    if (!this.hasDevices) {
      throw Error("No devices.");
    }
    
    if (this.deviceCurrent == null) {
      this.selectFirstDevice();
    } else {
      this.scanner.restart();
    }
    
  }

  selectFirstDevice() {
    this.deviceCurrent = this.availableDevices[0];
  }

  onCamerasFound(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);

    if (!this.hasDevices) {
      alert("No camera device found");
    }

  }

  onHasPermission(hasPermission: boolean) {
    this.hasPermission = hasPermission;
  }

  onScan(value: string) {
    this.scannedValue = value;
    this.scanner.scanStop()
  }

  allowedFormats = [ BarcodeFormat.QR_CODE ]

}
