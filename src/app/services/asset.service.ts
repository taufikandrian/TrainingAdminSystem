import { Injectable } from '@angular/core';

@Injectable()
export class AssetService {

  constructor() { }

  getURL(assetCode): string {
    let choosenUrl;
    switch (assetCode) {
      case "_icon":
        choosenUrl = './assets/tas.png';
        break;
      case "_logo":
        choosenUrl = './assets/logo.png';
        break;
      case "_logo_tas":
        choosenUrl = './assets/tas_.png';
        break;
      default:
        choosenUrl = './assets/tas.png';
        break;
    }
    return choosenUrl;
  }

}
