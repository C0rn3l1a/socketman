import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiInputDirective } from './directives/ui-input/ui-input.directive';
import { UiButtonDirective } from './directives/ui-button/ui-button.directive';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [UiInputDirective, UiButtonDirective, ToastComponent],
  imports: [
    CommonModule
  ],
  exports: [UiInputDirective, UiButtonDirective, ToastComponent]
})
export class UiKitModule { }
