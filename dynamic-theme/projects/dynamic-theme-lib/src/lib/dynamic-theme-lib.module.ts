import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DynamicThemeLibComponent } from './dynamic-theme-lib.component';
import { BackgroundColorDirective } from './directives/background-colour.directive';
import { TextColorDirective } from './directives/text-colour.directive';
import { ColourService } from './services/colour.service';

@NgModule({
  declarations: [
    DynamicThemeLibComponent,
    BackgroundColorDirective,
    TextColorDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    DynamicThemeLibComponent,
    BackgroundColorDirective,
    TextColorDirective,
  ],
  providers: [ColourService]
})
export class DynamicThemeLibModule { }
