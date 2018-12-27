import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpModule}from '@angular/http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http'; 
import{RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { MakeorderComponent } from './pages/makeorder/makeorder.component';
import { VieworderComponent } from './pages/vieworder/vieworder.component';
import { CartComponent } from './pages/cart/cart.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { OrderlistComponent } from './pages/orderlist/orderlist.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    MakeorderComponent,
    VieworderComponent,
    CartComponent,
    DashboardComponent,
    NavbarComponent,
    OrderlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'',redirectTo:'makeorder',pathMatch:'full'},
      {path:'makeorder',component:MakeorderComponent},
      {path:'addproduct',component:ProductsComponent},
      {path:'vieworder',component:VieworderComponent},
      {path:'vieworder/:id',component:VieworderComponent},
      {path:'cart',component:CartComponent},
      {path:'orderslist',component:OrderlistComponent}


    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
