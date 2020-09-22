import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CollectionComponent } from './collection/collection.component';
import { SocketComponent } from './socket/socket.component';
import { UiKitModule } from '../ui-kit/ui-kit.module';



@NgModule({
  declarations: [SidebarComponent, CollectionComponent, SocketComponent],
  imports: [
    CommonModule,
    UiKitModule
  ],
  exports: [SidebarComponent, CollectionComponent, SocketComponent]
})
export class SidebarModule { }
