import { Injectable } from '@angular/core';

@Injectable()
export class AssetService {

  constructor() { }

  getURL(assetCode): string {
    let choosenUrl;
    switch (assetCode) {
      case "_icon":
        choosenUrl = './assets/favicon.ico';
        break;
      case "_logo":
        choosenUrl = './assets/logo.jpg';
        break;
      default:
        choosenUrl = './assets/favicon.ico';
        break;
    }
    return choosenUrl;
  }

}
