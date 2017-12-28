import { NgOption } from './ng-select.types';
export declare class ItemsList {
    items: NgOption[];
    filteredItems: NgOption[];
    private _markedIndex;
    private _selected;
    private _multiple;
    private _simple;
    private _bindLabel;
    readonly value: NgOption[];
    readonly markedItem: NgOption;
    setItems(items: NgOption[], bindLabel: string, simple?: boolean): void;
    setMultiple(multiple: boolean): void;
    select(item: NgOption): void;
    findItem(value: any, bindValue: string): NgOption;
    unselect(item: NgOption): void;
    unselectLast(): void;
    addItem(item: any): {
        index: number;
        label: any;
        value: any;
    };
    clearSelected(): void;
    filter(term: string): void;
    clearFilter(): void;
    markNextItem(): void;
    markPreviousItem(): void;
    markItem(item: NgOption): void;
    markSelectedOrDefault(markDefault: any): void;
    private getNextItemIndex(steps);
    private stepToItem(steps);
    private getDefaultFilterFunc(term);
    private readonly lastSelectedItem;
    private mapItems(items);
    resolveNested(option: any, key: string): any;
}
