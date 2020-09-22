import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[ui-button]'
})
export class UiButtonDirective {
    private _classes: string[] = [];

    @Input('class')
    @HostBinding('class')
    get el_class(): string {
        return this._classes.join(' ');
    }
    set el_class(value: string) {
        this._classes = value.split(' ');
        this.add_custom_class()
    }
  
    constructor() {
        this.add_custom_class()
    }

    add_custom_class() {
        this._classes.push('ui-button');
    }
}
