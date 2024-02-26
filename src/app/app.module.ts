import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './ui/widgets/footer/footer.component';
import { HeaderComponent } from './ui/widgets/header/header.component';

import { HomePageComponent } from './ui/pages/home-page/home-page.component';
import { LoginPageComponent } from './ui/pages/login-page/login-page.component';
import { NewsPageComponent } from './ui/pages/news-page/news-page.component';
import { NewsItemPageComponent } from './ui/pages/news-item-page/news-item-page.component';

import { OverlayComponent } from './ui/blocks/overlay/overlay.component';
import { AboutComponent } from './ui/blocks/about/about.component';
import { AdvantagesComponent } from './ui/blocks/advantages/advantages.component';
import { ConditionsComponent } from './ui/blocks/conditions/conditions.component';
import { ManufacturersComponent } from './ui/blocks/manufacturers/manufacturers.component';
import { ContactsComponent } from './ui/widgets/contacts/contacts.component';

import { NewsService } from './services/news.service';
import { NewsItemComponent } from './ui/components/news-item/news-item.component';
import { CatalogPageComponent } from './ui/pages/catalog-page/catalog-page.component';
import { CatalogItemPageComponent } from './ui/pages/catalog-item-page/catalog-item-page.component';
import { ProductCardComponent } from './ui/components/product-card/product-card.component';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { AdminPanelNewsComponent } from './ui/widgets/admin-panel-news/admin-panel-news.component';
import { AdminPanelProductComponent } from './ui/widgets/admin-panel-product/admin-panel-product.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FeedbackService } from './services/feedback.service';
import { LoadingComponent } from './ui/components/loading/loading.component';
import { AdminPanelCategoriesComponent } from './ui/widgets/admin-panel-categories/admin-panel-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,

    HomePageComponent,
    OverlayComponent,
    AboutComponent,
    AdvantagesComponent,
    ConditionsComponent,
    ManufacturersComponent,
    ContactsComponent,

    LoginPageComponent,

    NewsPageComponent,
    NewsItemPageComponent,
    NewsItemComponent,

    CatalogPageComponent,
    CatalogItemPageComponent,

    ProductCardComponent,
    FilterProductPipe,
    AdminPanelNewsComponent,
    AdminPanelProductComponent,
    LoadingComponent,
    AdminPanelCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  providers: [
    NewsService,
    FeedbackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
