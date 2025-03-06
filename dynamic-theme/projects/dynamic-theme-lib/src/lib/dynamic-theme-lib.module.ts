import { NgModule } from '@angular/core';
import { DynamicThemeLibComponent } from './dynamic-theme-lib.component';
import { BackgroundColorDirective } from './directives/background-colour.directive';
import { TextColorDirective } from './directives/text-colour.directive';



@NgModule({
  declarations: [
    DynamicThemeLibComponent,
    BackgroundColorDirective,
    TextColorDirective
  ],
  imports: [
  ],
  exports: [
    DynamicThemeLibComponent
  ]
})
export class DynamicThemeLibModule { }
