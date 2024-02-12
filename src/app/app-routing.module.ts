import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './ui/pages/home-page/home-page.component';
import { LoginPageComponent } from './ui/pages/login-page/login-page.component';
import { NewsPageComponent } from './ui/pages/news-page/news-page.component';
import { NewsItemPageComponent } from './ui/pages/news-item-page/news-item-page.component';
import { CatalogPageComponent } from './ui/pages/catalog-page/catalog-page.component';
import { CatalogItemPageComponent } from './ui/pages/catalog-item-page/catalog-item-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'news',
    component: NewsPageComponent
  },
  {
    path: 'news/:id',
    component: NewsItemPageComponent
  },
  {
    path: 'products',
    component: CatalogPageComponent
  },
  {
    path: 'products/:id',
    component: CatalogItemPageComponent
  },
  {
    path: '**',
    component: HomePageComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
