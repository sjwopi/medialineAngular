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

import { OverlayComponent } from './ui/widgets/overlay/overlay.component';
import { AboutComponent } from './ui/widgets/about/about.component';
import { AdvantagesComponent } from './ui/widgets/advantages/advantages.component';
import { ConditionsComponent } from './ui/widgets/conditions/conditions.component';
import { ManufacturersComponent } from './ui/widgets/manufacturers/manufacturers.component';
import { ContactsComponent } from './ui/widgets/contacts/contacts.component';

import { FilterNewsPipe } from './pipes/filter-news.pipe';

import { NewsService } from './services/news.service';
import { QuestionService } from './services/question.service';
import { NewsItemComponent } from './ui/components/news-item/news-item.component';
import { CatalogPageComponent } from './ui/pages/catalog-page/catalog-page.component';
import { CatalogItemPageComponent } from './ui/pages/catalog-item-page/catalog-item-page.component';
import { ProductCardComponent } from './ui/components/product-card/product-card.component';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { AdminPanelComponent } from './ui/widgets/admin-panel/admin-panel.component';

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

    FilterNewsPipe,
    ProductCardComponent,
    FilterProductPipe,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    NewsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
