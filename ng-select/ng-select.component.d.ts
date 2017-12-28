import { OnInit, OnDestroy, OnChanges, AfterViewInit, ChangeDetectorRef, EventEmitter, TemplateRef, ElementRef, SimpleChanges, Renderer2, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { VirtualScrollComponent } from './virtual-scroll.component';
import { NgOption, NgSelectConfig } from './ng-select.types';
import { ItemsList } from './items-list';
import { Subject } from 'rxjs/Subject';
import { NgOptionComponent } from './ng-option.component';
export declare class NgSelectComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, ControlValueAccessor {
    private changeDetectorRef;
    private elementRef;
    private renderer;
    optionTemplate: TemplateRef<any>;
    labelTemplate: TemplateRef<any>;
    dropdownList: VirtualScrollComponent;
    dropdownPanel: ElementRef;
    ngOptions: QueryList<NgOptionComponent>;
    filterInput: any;
    items: any[];
    bindLabel: string;
    bindValue: string;
    clearable: boolean;
    markFirst: boolean;
    disableVirtualScroll: boolean;
    placeholder: string;
    notFoundText: any;
    typeToSearchText: any;
    addTagText: any;
    loadingText: any;
    clearAllText: any;
    dropdownPosition: 'bottom' | 'top';
    appendTo: any;
    typeahead: Subject<string>;
    multiple: boolean;
    addTag: boolean | ((term:any) => NgOption);
    searchable: boolean;
    blurEvent: EventEmitter<{}>;
    focusEvent: EventEmitter<{}>;
    changeEvent: EventEmitter<{}>;
    openEvent: EventEmitter<{}>;
    closeEvent: EventEmitter<{}>;
    searchEvent: EventEmitter<{}>;
    clearEvent: EventEmitter<{}>;
    addEvent: EventEmitter<{}>;
    removeEvent: EventEmitter<{}>;
    readonly single: boolean;
    isOpen: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    readonly filtered: boolean;
    itemsList: ItemsList;
    viewPortItems: NgOption[];
    isLoading: boolean;
    filterValue: string;
    private _ngModel;
    private _simple;
    private _defaultLabel;
    private _defaultValue;
    private onChange;
    private onTouched;
    private disposeDocumentClickListener;
    private disposeDocumentResizeListener;
    clearItem: (item: any) => void;
    readonly selectedItems: NgOption[];
    constructor(config: NgSelectConfig, changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef, renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    handleKeyDown($event: KeyboardEvent): void;
    handleArrowClick($event: Event): void;
    handleClearClick($event: Event): void;
    clearModel(): void;
    writeValue(value: any | any[]): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    toggle(): void;
    open(): void;
    close(): void;
    toggleItem(item: NgOption): void;
    select(item: NgOption): void;
    unselect(item: NgOption): void;
    selectTag(): void;
    showPlaceholder(): boolean;
    showClear(): boolean;
    showAddTag(): boolean;
    showFilter(): boolean;
    showNoItemsFound(): boolean;
    showTypeToSearch(): boolean;
    onFilter($event: any): void;
    onInputFocus(): void;
    onInputBlur(): void;
    onItemHover(item: NgOption): void;
    private setItems(items);
    private setItemsFromNgOptions();
    private handleDocumentClick();
    private handleDocumentResize();
    private handleAppendTo();
    private updateDropdownPosition();
    private validateWriteValue(value);
    private selectWriteValue(value);
    private updateModel();
    private clearSearch();
    private focusSearchInput();
    private scrollToMarked();
    private handleTab(_);
    private handleEnter($event);
    private handleSpace($event);
    private handleArrowDown($event);
    private handleArrowUp($event);
    private handleBackspace();
    private notifyModelChanged();
    private getDropdownMenu();
    private readonly isTypeahead;
    private detectChanges();
    private readonly value;
    private readonly isValueSet;
    private mergeGlobalConfig(config);
}
