import { ModuleWithProviders } from '@angular/core';
import { NgSelectConfig } from './ng-select.types';
export declare class NgSelectModule {
    static forRoot(config?: NgSelectConfig): ModuleWithProviders;
    static forChild(config?: NgSelectConfig): ModuleWithProviders;
}
export declare function provideModule(config: NgSelectConfig): {
    ngModule: typeof NgSelectModule;
    providers: {
        provide: typeof NgSelectConfig;
        useValue: NgSelectConfig;
    }[];
};
