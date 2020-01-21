import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { LoginComponent }   from './login.component';
import { HomeComponent }   from './home.component';
import { NotFoundComponent }   from './not-found.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
  declarations: [AppComponent, HomeComponent, LoginComponent, NotFoundComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}