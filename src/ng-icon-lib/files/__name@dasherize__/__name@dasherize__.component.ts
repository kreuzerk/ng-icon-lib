import {ChangeDetectionStrategy, Component, ElementRef, Inject, Input, Optional} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {<%= capitalize(name) %>Registry} from './<%= dasherize(name) %>-registry.service';

@Component({
    selector: '<%= dasherize(name) %>',
    template: `
        <ng-content></ng-content>
    `,
    styles: [':host::ng-deep svg{width: <%= defaultIconSize %>px; height: <%= defaultIconSize %>px}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class <%= capitalize(name) %>Component {
    private svgIcon: SVGElement;

    @Input()
    set name(iconName: <%= dasherize(iconInterface) %>) {
        if (this.svgIcon) {
            this.element.nativeElement.removeChild(this.svgIcon);
        }
        const svgData = this.dinosaurIconRegistry.getIcon(iconName);
        this.svgIcon = this.svgElementFromString(svgData);
        this.element.nativeElement.appendChild(this.svgIcon);
    }

    constructor(private element: ElementRef, private <%= dasherize(name) %>Registry: <%= dasherize(name) %>Registry,
                @Optional() @Inject(DOCUMENT) private document: any) {
    }

    private svgElementFromString(svgContent: string): SVGElement {
        const div = this.document.createElement('DIV');
        div.innerHTML = svgContent;
        return div.querySelector('svg') || this.document.createElementNS('http://www.w3.org/2000/svg', 'path');
    }
}
