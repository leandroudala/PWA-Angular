import { Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  @ViewChild("scanner", { static: false }) scanner: ZXingScannerComponent;

  autostart = false;

  deviceCurrent: MediaDeviceInfo;

  torchAvailable$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  ngOnInit(): void {
  }

  scannedValue = "";
  availableDevices: MediaDeviceInfo[] = [];
  hasDevices = false;
  hasPermission = false;

  async askForPermission() {
    this.hasPermission = await this.scanner.askForPermission();

    if (!this.hasPermission) {
      throw Error("No Permission");
    }

    this.startCamera();
  }

  startCamera() {
    if (!this.hasPermission) {
      this.askForPermission()
      return;
    }
    console.log("I have permission.")
    if (!this.hasDevices) {
      throw Error("No devices.");
    }

    if (this.deviceCurrent == null) {
      this.selectFirstDevice();
    } else {
      this.scanner.scanStart();
    }

  }

  listDevices() {
    this.scanner.updateVideoInputDevices()
    .then(devices => {
      devices.forEach(device => {
        console.log("device", device);
      })
    });

    this.scanner.getAnyVideoDevice()
    .then(device => {
      console.log("any device:", device);
    })
  }

  async selectFirstDevice() {
    const found = await this.scanner.getAnyVideoDevice();
    console.log("Any Video Device:", found);
    this.availableDevices = await this.scanner.updateVideoInputDevices();

    if (this.availableDevices.length) {
      this.deviceCurrent = this.availableDevices[0];
    }
  }

  onCamerasFound(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);

    if (!this.hasDevices) {
      alert("No camera device found");
    }

  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  onHasPermission(hasPermission: boolean) {
    this.hasPermission = hasPermission;
  }

  onScan(value: string) {
    this.scannedValue = value;
    this.scanner.scanStop()
  }

  onDeviceChange(device: MediaDeviceInfo) {
    console.log("device change", device);
  }

  allowedFormats = [BarcodeFormat.QR_CODE]

}
