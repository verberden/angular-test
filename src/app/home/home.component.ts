import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {saveAs } from "file-saver";

import { User, MFile } from '../models';
import { FileService, AuthenticationService } from '../services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  loading = false;
  user: User;
  files: MFile[];
  uploadedFiles: FileList;
  fileDates: string[];
  filesByDates = {};

  constructor(
    private fileService: FileService, 
    private authenticationService: AuthenticationService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.loading = true;
    this.user = this.authenticationService.currentUserValue;
    this.fileService.getAll().pipe(first()).subscribe((files: MFile[]) => {
        this.loading = false;
        const temp = [];
        for(let idx=0; idx < files.length; idx++) {
          const fileDate = (files[idx].created_at).split('T')[0];
          temp.push(fileDate);
          if (!this.filesByDates[fileDate]) {
            this.filesByDates[fileDate] = [];
          }
          this.filesByDates[fileDate].push(files[idx]);
        }
        this.fileDates = [...new Set(temp)];
        this.files = files;
    });
  }

  handleFileInput(uploadedFiles: FileList) {
    this.loading = true;
    this.uploadedFiles = uploadedFiles;
    this.fileService.uploadFiles(this.uploadedFiles).pipe(first()).subscribe((files: MFile[]) => {
      for(let i=files.length-1; i >= 0; i--)  {
        const file: { id:number, name: string, mime_type: string} = files[i];
        const fileDate = (files[i].created_at).split('T')[0];

        if (!this.filesByDates[fileDate]) {
          this.filesByDates[fileDate] = [];
          this.fileDates.unshift(fileDate);
        }
        this.filesByDates[fileDate].unshift(files[i]);
        this.files.unshift(file);
      }
      this.loading = false;
    });
  }

  handleDownloadFile(file: MFile) {
    this.fileService.downloadFile(file.id).subscribe(
      (data: any) => {
        this.downloadFile(data, file)
      },
      (error: any) => {
        console.log('error', error)
      }
      
    )
  }

  downloadFile(data: [], file: MFile) {
    const blob = new Blob(data, { type: file.mime_type });
    saveAs(blob, file.name);
  }
}