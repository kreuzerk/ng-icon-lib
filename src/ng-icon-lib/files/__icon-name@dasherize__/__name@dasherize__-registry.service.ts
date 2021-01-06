import { Injectable } from '@angular/core';

import { <%= capitalize(iconType) %>, <%= capitalize(iconInterface) %>} from '<%= libName %>';

@Injectable({
    providedIn: 'any'
})
export class B2cIconsRegistry {
    private registry = new Map<<%= capitalize(iconType) %>, string>();

    public registerIcons(icons: <%= capitalize(iconInterface) %>[]): void {
        icons.forEach((icon: any) => this.registry.set(icon.name, icon.data));
    }

    public getIcon(iconName: <%= capitalize(iconType) %>): string | undefined {
        if (!this.registry.has(iconName)) {
            console.warn(
                `👀 we could not find the Icon with the name ${iconName}, did you add it to the Icon registry?`
            );
        }
        return this.registry.get(iconName);
    }
}
