import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignComponent } from './core/components/sign/sign.component';
import { InComponent } from './core/components/sign/in/in.component';
import { UpComponent } from './core/components/sign/up/up.component';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { productReducer } from './store/product/product.reducer';
import { ProductEffects } from './store/product/product.effects';

@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    InComponent,
    UpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      auth: authReducer,
      product: productReducer
    }),
    EffectsModule.forRoot([AuthEffects, ProductEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
