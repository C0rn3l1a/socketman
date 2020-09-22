import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './workspace/workspace.component';
import { TabsComponent } from './tabs/tabs.component';
import { UiKitModule } from '../ui-kit/ui-kit.module';
import { EventEditorComponent } from './event-editor/event-editor.component';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [WorkspaceComponent, TabsComponent, EventEditorComponent],
    imports: [
        CommonModule,
        UiKitModule,
        FormsModule
    ],
    exports: [WorkspaceComponent, TabsComponent, EventEditorComponent],
})
export class WorkspaceModule { }
