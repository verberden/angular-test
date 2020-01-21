import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User, MFile } from '../models';
import { FileService, AuthenticationService } from '../services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  loading = false;
  user: User;
  files: MFile[];
  uploadedFiles: FileList;

  constructor(
    private fileService: FileService, 
    private authenticationService: AuthenticationService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.loading = true;
    this.user = this.authenticationService.currentUserValue;
    this.fileService.getAll().pipe(first()).subscribe(files => {
        this.loading = false;
        this.files = files;
    });
  }

  handleFileInput(uploadedFiles: FileList) {
    this.loading = true;
    this.uploadedFiles = uploadedFiles;
    this.fileService.uploadFiles(this.uploadedFiles).pipe(first()).subscribe((files: []) => {
      for(let i=0; i < files.length; i++)  {
        const file: { id:number, name: string} = files[i];
        this.files.push(file);
      }
      this.loading = false;
    });
  }
}