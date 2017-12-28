/**
 * The MIT License (MIT)
 * Copyright (c) 2016 Rinto Jose (rintoj)
 * Source code https://github.com/rintoj/angular2-virtual-scroll
 */
import { ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
export declare class VirtualScrollComponent implements OnInit, OnChanges, OnDestroy {
    private element;
    private zone;
    private renderer;
    items: any[];
    scrollbarWidth: number;
    scrollbarHeight: number;
    childWidth: number;
    childHeight: number;
    bufferAmount: number;
    disabled: boolean;
    update: EventEmitter<any[]>;
    contentElementRef: ElementRef;
    containerElementRef: ElementRef;
    topPadding: number;
    scrollHeight: number;
    private _previousStart;
    private _previousEnd;
    private _startupLoop;
    private _disposeScrollListener;
    constructor(element: ElementRef, zone: NgZone, renderer: Renderer2);
    readonly enabled: boolean;
    readonly transformStyle: string;
    handleScroll(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    refresh(): void;
    scrollInto(item: any): void;
    private countItemsPerRow();
    private getElementsOffset();
    private calculateDimensions();
    private calculateItems();
}
export declare class VirtualScrollModule {
}
