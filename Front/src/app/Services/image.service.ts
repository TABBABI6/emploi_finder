import { Injectable } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {Candidat} from "../Entity/Candidat";
import {Image} from "../Entity/image";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private sanitizer: DomSanitizer,
              private http: HttpClient) { }

  public createImage(user: any){
    const userImage: any = user.image;

    const imageFileData = userImage;
    const imageBlob = this.dataURItoBlob(imageFileData.imageBytes, imageFileData.type);

    const imageFile = new File([imageBlob], imageFileData.nom, {type: imageFileData.type});
    const imageFinal: Image = {
      file: imageFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    }

    user.image = imageFinal;
    return user;

  }

  public createCv(user: any){
    const userCv: any = user.cv;

    const cvFileData = userCv;
    const cvBlob = this.dataURItoBlob(cvFileData.imageBytes, cvFileData.type);

    const cvFile = new File([cvBlob], cvFileData.nom, {type: cvFileData.type});
    const cvFinal: Image = {
      file: cvFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(cvFile))
    }

    user.cv = cvFinal;
    return user;

  }

  public createLm(user: any){
    const userLm: any = user.lettre_motivation;

    const lmFileData = userLm;
    const cvBlob = this.dataURItoBlob(lmFileData.imageBytes, lmFileData.type);

    const lmFile = new File([cvBlob], lmFileData.nom, {type: lmFileData.type});
    const lmFinal: Image = {
      file: lmFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(lmFile))
    }

    user.lettre_motivation = lmFinal;
    return user;

  }

  public dataURItoBlob(imageBytes: any, imageType: any){
    const byteString = window.atob(imageBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++){
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], {type: imageType});
    return blob;
  }

  public deleteImage(imageId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/image/delete/${imageId}`);
  }

}
