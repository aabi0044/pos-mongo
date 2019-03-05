import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpModule}from '@angular/http';
import { HttpClientModule, HttpHeaders } from '@angular/common/http'; 
import{RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import{NgxPrintModule} from 'ngx-print';


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
import { HelpComponent } from './pages/help/help.component';
import { HelpnameComponent } from './pages/helpname/helpname.component';
import { from } from 'rxjs';

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
    OrderlistComponent,
    HelpComponent,
    HelpnameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    NgxPrintModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'',redirectTo:'makeorder',pathMatch:'full'},
      {path:'makeorder',component:MakeorderComponent},
      {path:'addproduct',component:ProductsComponent},
      {path:'vieworder',component:VieworderComponent},
      {path:'vieworder/:id',component:VieworderComponent},
      {path:'cart',component:CartComponent},
      {path:'orderslist',component:OrderlistComponent},
      {path:'login',component:LoginComponent},
      {path:'helpname',component:HelpnameComponent}

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
