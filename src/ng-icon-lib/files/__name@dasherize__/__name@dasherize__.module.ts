import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <%= capitalize(name) %>Component } from '.<%= dasherize(iconInterface) %>/.component';

@NgModule({
    declarations: [<%= capitalize(name) %>Component],
    exports: [<%= capitalize(name) %>Component],
    imports: [CommonModule]
})
export class <%= capitalize(name) %>Module {}
