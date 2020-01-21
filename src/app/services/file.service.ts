import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../enviroments/environment.prod';
import { MFile } from '../models';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<MFile[]>(`${environment.apiUrl}/api/files`);
  }

  uploadFiles(filesForUpload: FileList) {
    const formData: FormData = new FormData();
    for (let i = 0; i < filesForUpload.length; ++i) {
      const file = filesForUpload.item(i);
      formData.append(`file${i}`, file, file.name);
    }
    return this.http
      .post(`${environment.apiUrl}/api/files`, formData);
  }
}