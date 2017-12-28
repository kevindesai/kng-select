(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
	(factory((global['ng-select'] = {}),global.ng.core,global.ng.forms,global.ng.common));
}(this, (function (exports,core,forms,common) { 'use strict';

var NgOptionTemplateDirective = /** @class */ (function () {
    /**
     * @param {?} template
     */
    function NgOptionTemplateDirective(template) {
        this.template = template;
    }
    return NgOptionTemplateDirective;
}());
NgOptionTemplateDirective.decorators = [
    { type: core.Directive, args: [{ selector: '[ng-option-tmp]' },] },
];
/**
 * @nocollapse
 */
NgOptionTemplateDirective.ctorParameters = function () { return [
    { type: core.TemplateRef, },
]; };
var NgLabelTemplateDirective = /** @class */ (function () {
    /**
     * @param {?} template
     */
    function NgLabelTemplateDirective(template) {
        this.template = template;
    }
    return NgLabelTemplateDirective;
}());
NgLabelTemplateDirective.decorators = [
    { type: core.Directive, args: [{ selector: '[ng-label-tmp]' },] },
];
/**
 * @nocollapse
 */
NgLabelTemplateDirective.ctorParameters = function () { return [
    { type: core.TemplateRef, },
]; };
/**
 * The MIT License (MIT)
 * Copyright (c) 2016 Rinto Jose (rintoj)
 * Source code https://github.com/rintoj/angular2-virtual-scroll
 */
var VirtualScrollComponent = /** @class */ (function () {
    /**
     * @param {?} element
     * @param {?} zone
     * @param {?} renderer
     */
    function VirtualScrollComponent(element, zone, renderer) {
        this.element = element;
        this.zone = zone;
        this.renderer = renderer;
        this.items = [];
        this.bufferAmount = 0;
        this.disabled = false;
        this.update = new core.EventEmitter();
        this._startupLoop = true;
        this._disposeScrollListener = function () { };
    }
    Object.defineProperty(VirtualScrollComponent.prototype, "enabled", {
        /**
         * @return {?}
         */
        get: function () {
            return !this.disabled && this.items && this.items.length > 20;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScrollComponent.prototype, "transformStyle", {
        /**
         * @return {?}
         */
        get: function () {
            return this.enabled ? 'translateY(' + this.topPadding + 'px)' : 'none';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.handleScroll = function () {
        var _this = this;
        var /** @type {?} */ handler = function () {
            if (!_this.enabled) {
                _this.update.emit(_this.items);
                return;
            }
            _this.refresh();
        };
        this._disposeScrollListener = this.renderer.listen(this.element.nativeElement, 'scroll', handler);
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngOnInit = function () {
        this.handleScroll();
        this.scrollbarWidth = 0; // this.element.nativeElement.offsetWidth - this.element.nativeElement.clientWidth;
        this.scrollbarHeight = 0; // this.element.nativeElement.offsetHeight - this.element.nativeElement.clientHeight;
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngOnDestroy = function () {
        this._disposeScrollListener();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    VirtualScrollComponent.prototype.ngOnChanges = function (changes) {
        this._previousStart = undefined;
        this._previousEnd = undefined;
        var /** @type {?} */ items = ((changes)).items || {};
        if (((changes)).items !== undefined && items.previousValue === undefined ||
            (items.previousValue !== undefined && items.previousValue.length === 0)) {
            this._startupLoop = true;
        }
        this.items = items.currentValue;
        this.refresh();
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.refresh = function () {
        var _this = this;
        if (!this.enabled) {
            this.update.emit(this.items);
            return;
        }
        this.zone.runOutsideAngular(function () {
            requestAnimationFrame(function () { return _this.calculateItems(); });
        });
    };
    /**
     * @param {?} item
     * @return {?}
     */
    VirtualScrollComponent.prototype.scrollInto = function (item) {
        var /** @type {?} */ el = this.element.nativeElement;
        var /** @type {?} */ index = (this.items || []).indexOf(item);
        if (index < 0 || index >= (this.items || []).length) {
            return;
        }
        var /** @type {?} */ d = this.calculateDimensions();
        var /** @type {?} */ buffer = Math.floor(d.viewHeight / d.childHeight) - 1;
        el.scrollTop = (Math.floor(index / d.itemsPerRow) * d.childHeight)
            - (d.childHeight * Math.min(index, buffer));
        this.refresh();
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.countItemsPerRow = function () {
        var /** @type {?} */ offsetTop;
        var /** @type {?} */ itemsPerRow;
        var /** @type {?} */ children = this.contentElementRef.nativeElement.children;
        for (itemsPerRow = 0; itemsPerRow < children.length; itemsPerRow++) {
            if (offsetTop !== undefined && offsetTop !== children[itemsPerRow].offsetTop) {
                break;
            }
            offsetTop = children[itemsPerRow].offsetTop;
        }
        return itemsPerRow;
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.getElementsOffset = function () {
        var /** @type {?} */ offsetTop = 0;
        if (this.containerElementRef && this.containerElementRef.nativeElement) {
            offsetTop += this.containerElementRef.nativeElement.offsetTop;
        }
        return offsetTop;
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.calculateDimensions = function () {
        var /** @type {?} */ el = this.element.nativeElement;
        var /** @type {?} */ items = this.items || [];
        var /** @type {?} */ itemCount = items.length;
        var /** @type {?} */ viewWidth = el.clientWidth - this.scrollbarWidth;
        var /** @type {?} */ viewHeight = el.clientHeight - this.scrollbarHeight;
        var /** @type {?} */ contentDimensions;
        if (this.childWidth === undefined || this.childHeight === undefined) {
            var /** @type {?} */ content = this.contentElementRef.nativeElement;
            if (this.containerElementRef && this.containerElementRef.nativeElement) {
                content = this.containerElementRef.nativeElement;
            }
            contentDimensions = content.children[0] ? content.children[0].getBoundingClientRect() : {
                width: viewWidth,
                height: viewHeight
            };
        }
        var /** @type {?} */ childWidth = this.childWidth || contentDimensions.width;
        var /** @type {?} */ childHeight = this.childHeight || contentDimensions.height;
        var /** @type {?} */ itemsPerRow = Math.max(1, this.countItemsPerRow());
        var /** @type {?} */ itemsPerRowByCalc = Math.max(1, Math.floor(viewWidth / childWidth));
        var /** @type {?} */ itemsPerCol = Math.max(1, Math.floor(viewHeight / childHeight));
        var /** @type {?} */ scrollTop = Math.max(0, el.scrollTop);
        if (itemsPerCol === 1 && Math.floor(scrollTop / this.scrollHeight * itemCount) + itemsPerRowByCalc >= itemCount) {
            itemsPerRow = itemsPerRowByCalc;
        }
        return {
            itemCount: itemCount,
            viewWidth: viewWidth,
            viewHeight: viewHeight,
            childWidth: childWidth,
            childHeight: childHeight,
            itemsPerRow: itemsPerRow,
            itemsPerCol: itemsPerCol,
            itemsPerRowByCalc: itemsPerRowByCalc
        };
    };
    /**
     * @return {?}
     */
    VirtualScrollComponent.prototype.calculateItems = function () {
        var _this = this;
        core.NgZone.assertNotInAngularZone();
        var /** @type {?} */ el = this.element.nativeElement;
        var /** @type {?} */ d = this.calculateDimensions();
        var /** @type {?} */ items = this.items || [];
        var /** @type {?} */ offsetTop = this.getElementsOffset();
        this.scrollHeight = d.childHeight * d.itemCount / d.itemsPerRow;
        if (el.scrollTop > this.scrollHeight) {
            el.scrollTop = this.scrollHeight + offsetTop;
        }
        var /** @type {?} */ scrollTop = Math.max(0, el.scrollTop - offsetTop);
        var /** @type {?} */ indexByScrollTop = scrollTop / this.scrollHeight * d.itemCount / d.itemsPerRow;
        var /** @type {?} */ end = Math.min(d.itemCount, Math.ceil(indexByScrollTop) * d.itemsPerRow + d.itemsPerRow * (d.itemsPerCol + 1));
        var /** @type {?} */ maxStartEnd = end;
        var /** @type {?} */ modEnd = end % d.itemsPerRow;
        if (modEnd) {
            maxStartEnd = end + d.itemsPerRow - modEnd;
        }
        var /** @type {?} */ maxStart = Math.max(0, maxStartEnd - d.itemsPerCol * d.itemsPerRow - d.itemsPerRow);
        var /** @type {?} */ start = Math.min(maxStart, Math.floor(indexByScrollTop) * d.itemsPerRow);
        this.topPadding = d.childHeight * Math.ceil(start / d.itemsPerRow) - (d.childHeight * Math.min(start, this.bufferAmount));
        start = !isNaN(start) ? start : -1;
        end = !isNaN(end) ? end : -1;
        start -= this.bufferAmount;
        start = Math.max(0, start);
        end += this.bufferAmount;
        end = Math.min(items.length, end);
        if (start !== this._previousStart || end !== this._previousEnd) {
            // update the scroll list
            this.zone.run(function () {
                _this.update.emit(items.slice(start, end));
            });
            this._previousStart = start;
            this._previousEnd = end;
            if (this._startupLoop === true) {
                this.refresh();
            }
        }
        else if (this._startupLoop === true) {
            this._startupLoop = false;
            this.refresh();
        }
    };
    return VirtualScrollComponent;
}());
VirtualScrollComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'virtual-scroll,[virtualScroll]',
                exportAs: 'virtualScroll',
                template: "\n        <div *ngIf=\"enabled\" class=\"total-padding\" [style.height]=\"scrollHeight + 'px'\"></div>\n        <div #content\n             [class.scrollable-content]=\"enabled\"\n             [style.transform]=\"transformStyle\">\n            <ng-content></ng-content>\n        </div>\n    ",
                styles: ["\n        :host {\n            overflow: hidden;\n            overflow-y: auto;\n            position: relative;\n            display: block;\n            -webkit-overflow-scrolling: touch;\n        }\n\n        .scrollable-content {\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            position: absolute;\n        }\n\n        .total-padding {\n            width: 1px;\n            opacity: 0;\n        }\n    "]
            },] },
];
/**
 * @nocollapse
 */
VirtualScrollComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.NgZone, },
    { type: core.Renderer2, },
]; };
VirtualScrollComponent.propDecorators = {
    'items': [{ type: core.Input },],
    'scrollbarWidth': [{ type: core.Input },],
    'scrollbarHeight': [{ type: core.Input },],
    'childWidth': [{ type: core.Input },],
    'childHeight': [{ type: core.Input },],
    'bufferAmount': [{ type: core.Input },],
    'disabled': [{ type: core.Input },],
    'update': [{ type: core.Output },],
    'contentElementRef': [{ type: core.ViewChild, args: ['content', { read: core.ElementRef },] },],
    'containerElementRef': [{ type: core.ContentChild, args: ['container',] },],
};
var VirtualScrollModule = /** @class */ (function () {
    function VirtualScrollModule() {
    }
    return VirtualScrollModule;
}());
VirtualScrollModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                exports: [VirtualScrollComponent],
                declarations: [VirtualScrollComponent]
            },] },
];
/**
 * @nocollapse
 */
VirtualScrollModule.ctorParameters = function () { return []; };
var KeyCode = {};
KeyCode.Tab = 9;
KeyCode.Enter = 13;
KeyCode.Esc = 27;
KeyCode.Space = 32;
KeyCode.ArrowUp = 38;
KeyCode.ArrowDown = 40;
KeyCode.Backspace = 8;
KeyCode[KeyCode.Tab] = "Tab";
KeyCode[KeyCode.Enter] = "Enter";
KeyCode[KeyCode.Esc] = "Esc";
KeyCode[KeyCode.Space] = "Space";
KeyCode[KeyCode.ArrowUp] = "ArrowUp";
KeyCode[KeyCode.ArrowDown] = "ArrowDown";
KeyCode[KeyCode.Backspace] = "Backspace";
var NgSelectConfig = /** @class */ (function () {
    function NgSelectConfig() {
        this.notFoundText = 'No items found';
        this.typeToSearchText = 'Type to search';
        this.addTagText = 'Add item';
        this.loadingText = 'Loading...';
        this.clearAllText = 'Clear all';
        this.disableVirtualScroll = false;
    }
    return NgSelectConfig;
}());
var diacritics = {
    '\u24B6': 'A',
    '\uFF21': 'A',
    '\u00C0': 'A',
    '\u00C1': 'A',
    '\u00C2': 'A',
    '\u1EA6': 'A',
    '\u1EA4': 'A',
    '\u1EAA': 'A',
    '\u1EA8': 'A',
    '\u00C3': 'A',
    '\u0100': 'A',
    '\u0102': 'A',
    '\u1EB0': 'A',
    '\u1EAE': 'A',
    '\u1EB4': 'A',
    '\u1EB2': 'A',
    '\u0226': 'A',
    '\u01E0': 'A',
    '\u00C4': 'A',
    '\u01DE': 'A',
    '\u1EA2': 'A',
    '\u00C5': 'A',
    '\u01FA': 'A',
    '\u01CD': 'A',
    '\u0200': 'A',
    '\u0202': 'A',
    '\u1EA0': 'A',
    '\u1EAC': 'A',
    '\u1EB6': 'A',
    '\u1E00': 'A',
    '\u0104': 'A',
    '\u023A': 'A',
    '\u2C6F': 'A',
    '\uA732': 'AA',
    '\u00C6': 'AE',
    '\u01FC': 'AE',
    '\u01E2': 'AE',
    '\uA734': 'AO',
    '\uA736': 'AU',
    '\uA738': 'AV',
    '\uA73A': 'AV',
    '\uA73C': 'AY',
    '\u24B7': 'B',
    '\uFF22': 'B',
    '\u1E02': 'B',
    '\u1E04': 'B',
    '\u1E06': 'B',
    '\u0243': 'B',
    '\u0182': 'B',
    '\u0181': 'B',
    '\u24B8': 'C',
    '\uFF23': 'C',
    '\u0106': 'C',
    '\u0108': 'C',
    '\u010A': 'C',
    '\u010C': 'C',
    '\u00C7': 'C',
    '\u1E08': 'C',
    '\u0187': 'C',
    '\u023B': 'C',
    '\uA73E': 'C',
    '\u24B9': 'D',
    '\uFF24': 'D',
    '\u1E0A': 'D',
    '\u010E': 'D',
    '\u1E0C': 'D',
    '\u1E10': 'D',
    '\u1E12': 'D',
    '\u1E0E': 'D',
    '\u0110': 'D',
    '\u018B': 'D',
    '\u018A': 'D',
    '\u0189': 'D',
    '\uA779': 'D',
    '\u01F1': 'DZ',
    '\u01C4': 'DZ',
    '\u01F2': 'Dz',
    '\u01C5': 'Dz',
    '\u24BA': 'E',
    '\uFF25': 'E',
    '\u00C8': 'E',
    '\u00C9': 'E',
    '\u00CA': 'E',
    '\u1EC0': 'E',
    '\u1EBE': 'E',
    '\u1EC4': 'E',
    '\u1EC2': 'E',
    '\u1EBC': 'E',
    '\u0112': 'E',
    '\u1E14': 'E',
    '\u1E16': 'E',
    '\u0114': 'E',
    '\u0116': 'E',
    '\u00CB': 'E',
    '\u1EBA': 'E',
    '\u011A': 'E',
    '\u0204': 'E',
    '\u0206': 'E',
    '\u1EB8': 'E',
    '\u1EC6': 'E',
    '\u0228': 'E',
    '\u1E1C': 'E',
    '\u0118': 'E',
    '\u1E18': 'E',
    '\u1E1A': 'E',
    '\u0190': 'E',
    '\u018E': 'E',
    '\u24BB': 'F',
    '\uFF26': 'F',
    '\u1E1E': 'F',
    '\u0191': 'F',
    '\uA77B': 'F',
    '\u24BC': 'G',
    '\uFF27': 'G',
    '\u01F4': 'G',
    '\u011C': 'G',
    '\u1E20': 'G',
    '\u011E': 'G',
    '\u0120': 'G',
    '\u01E6': 'G',
    '\u0122': 'G',
    '\u01E4': 'G',
    '\u0193': 'G',
    '\uA7A0': 'G',
    '\uA77D': 'G',
    '\uA77E': 'G',
    '\u24BD': 'H',
    '\uFF28': 'H',
    '\u0124': 'H',
    '\u1E22': 'H',
    '\u1E26': 'H',
    '\u021E': 'H',
    '\u1E24': 'H',
    '\u1E28': 'H',
    '\u1E2A': 'H',
    '\u0126': 'H',
    '\u2C67': 'H',
    '\u2C75': 'H',
    '\uA78D': 'H',
    '\u24BE': 'I',
    '\uFF29': 'I',
    '\u00CC': 'I',
    '\u00CD': 'I',
    '\u00CE': 'I',
    '\u0128': 'I',
    '\u012A': 'I',
    '\u012C': 'I',
    '\u0130': 'I',
    '\u00CF': 'I',
    '\u1E2E': 'I',
    '\u1EC8': 'I',
    '\u01CF': 'I',
    '\u0208': 'I',
    '\u020A': 'I',
    '\u1ECA': 'I',
    '\u012E': 'I',
    '\u1E2C': 'I',
    '\u0197': 'I',
    '\u24BF': 'J',
    '\uFF2A': 'J',
    '\u0134': 'J',
    '\u0248': 'J',
    '\u24C0': 'K',
    '\uFF2B': 'K',
    '\u1E30': 'K',
    '\u01E8': 'K',
    '\u1E32': 'K',
    '\u0136': 'K',
    '\u1E34': 'K',
    '\u0198': 'K',
    '\u2C69': 'K',
    '\uA740': 'K',
    '\uA742': 'K',
    '\uA744': 'K',
    '\uA7A2': 'K',
    '\u24C1': 'L',
    '\uFF2C': 'L',
    '\u013F': 'L',
    '\u0139': 'L',
    '\u013D': 'L',
    '\u1E36': 'L',
    '\u1E38': 'L',
    '\u013B': 'L',
    '\u1E3C': 'L',
    '\u1E3A': 'L',
    '\u0141': 'L',
    '\u023D': 'L',
    '\u2C62': 'L',
    '\u2C60': 'L',
    '\uA748': 'L',
    '\uA746': 'L',
    '\uA780': 'L',
    '\u01C7': 'LJ',
    '\u01C8': 'Lj',
    '\u24C2': 'M',
    '\uFF2D': 'M',
    '\u1E3E': 'M',
    '\u1E40': 'M',
    '\u1E42': 'M',
    '\u2C6E': 'M',
    '\u019C': 'M',
    '\u24C3': 'N',
    '\uFF2E': 'N',
    '\u01F8': 'N',
    '\u0143': 'N',
    '\u00D1': 'N',
    '\u1E44': 'N',
    '\u0147': 'N',
    '\u1E46': 'N',
    '\u0145': 'N',
    '\u1E4A': 'N',
    '\u1E48': 'N',
    '\u0220': 'N',
    '\u019D': 'N',
    '\uA790': 'N',
    '\uA7A4': 'N',
    '\u01CA': 'NJ',
    '\u01CB': 'Nj',
    '\u24C4': 'O',
    '\uFF2F': 'O',
    '\u00D2': 'O',
    '\u00D3': 'O',
    '\u00D4': 'O',
    '\u1ED2': 'O',
    '\u1ED0': 'O',
    '\u1ED6': 'O',
    '\u1ED4': 'O',
    '\u00D5': 'O',
    '\u1E4C': 'O',
    '\u022C': 'O',
    '\u1E4E': 'O',
    '\u014C': 'O',
    '\u1E50': 'O',
    '\u1E52': 'O',
    '\u014E': 'O',
    '\u022E': 'O',
    '\u0230': 'O',
    '\u00D6': 'O',
    '\u022A': 'O',
    '\u1ECE': 'O',
    '\u0150': 'O',
    '\u01D1': 'O',
    '\u020C': 'O',
    '\u020E': 'O',
    '\u01A0': 'O',
    '\u1EDC': 'O',
    '\u1EDA': 'O',
    '\u1EE0': 'O',
    '\u1EDE': 'O',
    '\u1EE2': 'O',
    '\u1ECC': 'O',
    '\u1ED8': 'O',
    '\u01EA': 'O',
    '\u01EC': 'O',
    '\u00D8': 'O',
    '\u01FE': 'O',
    '\u0186': 'O',
    '\u019F': 'O',
    '\uA74A': 'O',
    '\uA74C': 'O',
    '\u01A2': 'OI',
    '\uA74E': 'OO',
    '\u0222': 'OU',
    '\u24C5': 'P',
    '\uFF30': 'P',
    '\u1E54': 'P',
    '\u1E56': 'P',
    '\u01A4': 'P',
    '\u2C63': 'P',
    '\uA750': 'P',
    '\uA752': 'P',
    '\uA754': 'P',
    '\u24C6': 'Q',
    '\uFF31': 'Q',
    '\uA756': 'Q',
    '\uA758': 'Q',
    '\u024A': 'Q',
    '\u24C7': 'R',
    '\uFF32': 'R',
    '\u0154': 'R',
    '\u1E58': 'R',
    '\u0158': 'R',
    '\u0210': 'R',
    '\u0212': 'R',
    '\u1E5A': 'R',
    '\u1E5C': 'R',
    '\u0156': 'R',
    '\u1E5E': 'R',
    '\u024C': 'R',
    '\u2C64': 'R',
    '\uA75A': 'R',
    '\uA7A6': 'R',
    '\uA782': 'R',
    '\u24C8': 'S',
    '\uFF33': 'S',
    '\u1E9E': 'S',
    '\u015A': 'S',
    '\u1E64': 'S',
    '\u015C': 'S',
    '\u1E60': 'S',
    '\u0160': 'S',
    '\u1E66': 'S',
    '\u1E62': 'S',
    '\u1E68': 'S',
    '\u0218': 'S',
    '\u015E': 'S',
    '\u2C7E': 'S',
    '\uA7A8': 'S',
    '\uA784': 'S',
    '\u24C9': 'T',
    '\uFF34': 'T',
    '\u1E6A': 'T',
    '\u0164': 'T',
    '\u1E6C': 'T',
    '\u021A': 'T',
    '\u0162': 'T',
    '\u1E70': 'T',
    '\u1E6E': 'T',
    '\u0166': 'T',
    '\u01AC': 'T',
    '\u01AE': 'T',
    '\u023E': 'T',
    '\uA786': 'T',
    '\uA728': 'TZ',
    '\u24CA': 'U',
    '\uFF35': 'U',
    '\u00D9': 'U',
    '\u00DA': 'U',
    '\u00DB': 'U',
    '\u0168': 'U',
    '\u1E78': 'U',
    '\u016A': 'U',
    '\u1E7A': 'U',
    '\u016C': 'U',
    '\u00DC': 'U',
    '\u01DB': 'U',
    '\u01D7': 'U',
    '\u01D5': 'U',
    '\u01D9': 'U',
    '\u1EE6': 'U',
    '\u016E': 'U',
    '\u0170': 'U',
    '\u01D3': 'U',
    '\u0214': 'U',
    '\u0216': 'U',
    '\u01AF': 'U',
    '\u1EEA': 'U',
    '\u1EE8': 'U',
    '\u1EEE': 'U',
    '\u1EEC': 'U',
    '\u1EF0': 'U',
    '\u1EE4': 'U',
    '\u1E72': 'U',
    '\u0172': 'U',
    '\u1E76': 'U',
    '\u1E74': 'U',
    '\u0244': 'U',
    '\u24CB': 'V',
    '\uFF36': 'V',
    '\u1E7C': 'V',
    '\u1E7E': 'V',
    '\u01B2': 'V',
    '\uA75E': 'V',
    '\u0245': 'V',
    '\uA760': 'VY',
    '\u24CC': 'W',
    '\uFF37': 'W',
    '\u1E80': 'W',
    '\u1E82': 'W',
    '\u0174': 'W',
    '\u1E86': 'W',
    '\u1E84': 'W',
    '\u1E88': 'W',
    '\u2C72': 'W',
    '\u24CD': 'X',
    '\uFF38': 'X',
    '\u1E8A': 'X',
    '\u1E8C': 'X',
    '\u24CE': 'Y',
    '\uFF39': 'Y',
    '\u1EF2': 'Y',
    '\u00DD': 'Y',
    '\u0176': 'Y',
    '\u1EF8': 'Y',
    '\u0232': 'Y',
    '\u1E8E': 'Y',
    '\u0178': 'Y',
    '\u1EF6': 'Y',
    '\u1EF4': 'Y',
    '\u01B3': 'Y',
    '\u024E': 'Y',
    '\u1EFE': 'Y',
    '\u24CF': 'Z',
    '\uFF3A': 'Z',
    '\u0179': 'Z',
    '\u1E90': 'Z',
    '\u017B': 'Z',
    '\u017D': 'Z',
    '\u1E92': 'Z',
    '\u1E94': 'Z',
    '\u01B5': 'Z',
    '\u0224': 'Z',
    '\u2C7F': 'Z',
    '\u2C6B': 'Z',
    '\uA762': 'Z',
    '\u24D0': 'a',
    '\uFF41': 'a',
    '\u1E9A': 'a',
    '\u00E0': 'a',
    '\u00E1': 'a',
    '\u00E2': 'a',
    '\u1EA7': 'a',
    '\u1EA5': 'a',
    '\u1EAB': 'a',
    '\u1EA9': 'a',
    '\u00E3': 'a',
    '\u0101': 'a',
    '\u0103': 'a',
    '\u1EB1': 'a',
    '\u1EAF': 'a',
    '\u1EB5': 'a',
    '\u1EB3': 'a',
    '\u0227': 'a',
    '\u01E1': 'a',
    '\u00E4': 'a',
    '\u01DF': 'a',
    '\u1EA3': 'a',
    '\u00E5': 'a',
    '\u01FB': 'a',
    '\u01CE': 'a',
    '\u0201': 'a',
    '\u0203': 'a',
    '\u1EA1': 'a',
    '\u1EAD': 'a',
    '\u1EB7': 'a',
    '\u1E01': 'a',
    '\u0105': 'a',
    '\u2C65': 'a',
    '\u0250': 'a',
    '\uA733': 'aa',
    '\u00E6': 'ae',
    '\u01FD': 'ae',
    '\u01E3': 'ae',
    '\uA735': 'ao',
    '\uA737': 'au',
    '\uA739': 'av',
    '\uA73B': 'av',
    '\uA73D': 'ay',
    '\u24D1': 'b',
    '\uFF42': 'b',
    '\u1E03': 'b',
    '\u1E05': 'b',
    '\u1E07': 'b',
    '\u0180': 'b',
    '\u0183': 'b',
    '\u0253': 'b',
    '\u24D2': 'c',
    '\uFF43': 'c',
    '\u0107': 'c',
    '\u0109': 'c',
    '\u010B': 'c',
    '\u010D': 'c',
    '\u00E7': 'c',
    '\u1E09': 'c',
    '\u0188': 'c',
    '\u023C': 'c',
    '\uA73F': 'c',
    '\u2184': 'c',
    '\u24D3': 'd',
    '\uFF44': 'd',
    '\u1E0B': 'd',
    '\u010F': 'd',
    '\u1E0D': 'd',
    '\u1E11': 'd',
    '\u1E13': 'd',
    '\u1E0F': 'd',
    '\u0111': 'd',
    '\u018C': 'd',
    '\u0256': 'd',
    '\u0257': 'd',
    '\uA77A': 'd',
    '\u01F3': 'dz',
    '\u01C6': 'dz',
    '\u24D4': 'e',
    '\uFF45': 'e',
    '\u00E8': 'e',
    '\u00E9': 'e',
    '\u00EA': 'e',
    '\u1EC1': 'e',
    '\u1EBF': 'e',
    '\u1EC5': 'e',
    '\u1EC3': 'e',
    '\u1EBD': 'e',
    '\u0113': 'e',
    '\u1E15': 'e',
    '\u1E17': 'e',
    '\u0115': 'e',
    '\u0117': 'e',
    '\u00EB': 'e',
    '\u1EBB': 'e',
    '\u011B': 'e',
    '\u0205': 'e',
    '\u0207': 'e',
    '\u1EB9': 'e',
    '\u1EC7': 'e',
    '\u0229': 'e',
    '\u1E1D': 'e',
    '\u0119': 'e',
    '\u1E19': 'e',
    '\u1E1B': 'e',
    '\u0247': 'e',
    '\u025B': 'e',
    '\u01DD': 'e',
    '\u24D5': 'f',
    '\uFF46': 'f',
    '\u1E1F': 'f',
    '\u0192': 'f',
    '\uA77C': 'f',
    '\u24D6': 'g',
    '\uFF47': 'g',
    '\u01F5': 'g',
    '\u011D': 'g',
    '\u1E21': 'g',
    '\u011F': 'g',
    '\u0121': 'g',
    '\u01E7': 'g',
    '\u0123': 'g',
    '\u01E5': 'g',
    '\u0260': 'g',
    '\uA7A1': 'g',
    '\u1D79': 'g',
    '\uA77F': 'g',
    '\u24D7': 'h',
    '\uFF48': 'h',
    '\u0125': 'h',
    '\u1E23': 'h',
    '\u1E27': 'h',
    '\u021F': 'h',
    '\u1E25': 'h',
    '\u1E29': 'h',
    '\u1E2B': 'h',
    '\u1E96': 'h',
    '\u0127': 'h',
    '\u2C68': 'h',
    '\u2C76': 'h',
    '\u0265': 'h',
    '\u0195': 'hv',
    '\u24D8': 'i',
    '\uFF49': 'i',
    '\u00EC': 'i',
    '\u00ED': 'i',
    '\u00EE': 'i',
    '\u0129': 'i',
    '\u012B': 'i',
    '\u012D': 'i',
    '\u00EF': 'i',
    '\u1E2F': 'i',
    '\u1EC9': 'i',
    '\u01D0': 'i',
    '\u0209': 'i',
    '\u020B': 'i',
    '\u1ECB': 'i',
    '\u012F': 'i',
    '\u1E2D': 'i',
    '\u0268': 'i',
    '\u0131': 'i',
    '\u24D9': 'j',
    '\uFF4A': 'j',
    '\u0135': 'j',
    '\u01F0': 'j',
    '\u0249': 'j',
    '\u24DA': 'k',
    '\uFF4B': 'k',
    '\u1E31': 'k',
    '\u01E9': 'k',
    '\u1E33': 'k',
    '\u0137': 'k',
    '\u1E35': 'k',
    '\u0199': 'k',
    '\u2C6A': 'k',
    '\uA741': 'k',
    '\uA743': 'k',
    '\uA745': 'k',
    '\uA7A3': 'k',
    '\u24DB': 'l',
    '\uFF4C': 'l',
    '\u0140': 'l',
    '\u013A': 'l',
    '\u013E': 'l',
    '\u1E37': 'l',
    '\u1E39': 'l',
    '\u013C': 'l',
    '\u1E3D': 'l',
    '\u1E3B': 'l',
    '\u017F': 'l',
    '\u0142': 'l',
    '\u019A': 'l',
    '\u026B': 'l',
    '\u2C61': 'l',
    '\uA749': 'l',
    '\uA781': 'l',
    '\uA747': 'l',
    '\u01C9': 'lj',
    '\u24DC': 'm',
    '\uFF4D': 'm',
    '\u1E3F': 'm',
    '\u1E41': 'm',
    '\u1E43': 'm',
    '\u0271': 'm',
    '\u026F': 'm',
    '\u24DD': 'n',
    '\uFF4E': 'n',
    '\u01F9': 'n',
    '\u0144': 'n',
    '\u00F1': 'n',
    '\u1E45': 'n',
    '\u0148': 'n',
    '\u1E47': 'n',
    '\u0146': 'n',
    '\u1E4B': 'n',
    '\u1E49': 'n',
    '\u019E': 'n',
    '\u0272': 'n',
    '\u0149': 'n',
    '\uA791': 'n',
    '\uA7A5': 'n',
    '\u01CC': 'nj',
    '\u24DE': 'o',
    '\uFF4F': 'o',
    '\u00F2': 'o',
    '\u00F3': 'o',
    '\u00F4': 'o',
    '\u1ED3': 'o',
    '\u1ED1': 'o',
    '\u1ED7': 'o',
    '\u1ED5': 'o',
    '\u00F5': 'o',
    '\u1E4D': 'o',
    '\u022D': 'o',
    '\u1E4F': 'o',
    '\u014D': 'o',
    '\u1E51': 'o',
    '\u1E53': 'o',
    '\u014F': 'o',
    '\u022F': 'o',
    '\u0231': 'o',
    '\u00F6': 'o',
    '\u022B': 'o',
    '\u1ECF': 'o',
    '\u0151': 'o',
    '\u01D2': 'o',
    '\u020D': 'o',
    '\u020F': 'o',
    '\u01A1': 'o',
    '\u1EDD': 'o',
    '\u1EDB': 'o',
    '\u1EE1': 'o',
    '\u1EDF': 'o',
    '\u1EE3': 'o',
    '\u1ECD': 'o',
    '\u1ED9': 'o',
    '\u01EB': 'o',
    '\u01ED': 'o',
    '\u00F8': 'o',
    '\u01FF': 'o',
    '\u0254': 'o',
    '\uA74B': 'o',
    '\uA74D': 'o',
    '\u0275': 'o',
    '\u01A3': 'oi',
    '\u0223': 'ou',
    '\uA74F': 'oo',
    '\u24DF': 'p',
    '\uFF50': 'p',
    '\u1E55': 'p',
    '\u1E57': 'p',
    '\u01A5': 'p',
    '\u1D7D': 'p',
    '\uA751': 'p',
    '\uA753': 'p',
    '\uA755': 'p',
    '\u24E0': 'q',
    '\uFF51': 'q',
    '\u024B': 'q',
    '\uA757': 'q',
    '\uA759': 'q',
    '\u24E1': 'r',
    '\uFF52': 'r',
    '\u0155': 'r',
    '\u1E59': 'r',
    '\u0159': 'r',
    '\u0211': 'r',
    '\u0213': 'r',
    '\u1E5B': 'r',
    '\u1E5D': 'r',
    '\u0157': 'r',
    '\u1E5F': 'r',
    '\u024D': 'r',
    '\u027D': 'r',
    '\uA75B': 'r',
    '\uA7A7': 'r',
    '\uA783': 'r',
    '\u24E2': 's',
    '\uFF53': 's',
    '\u00DF': 's',
    '\u015B': 's',
    '\u1E65': 's',
    '\u015D': 's',
    '\u1E61': 's',
    '\u0161': 's',
    '\u1E67': 's',
    '\u1E63': 's',
    '\u1E69': 's',
    '\u0219': 's',
    '\u015F': 's',
    '\u023F': 's',
    '\uA7A9': 's',
    '\uA785': 's',
    '\u1E9B': 's',
    '\u24E3': 't',
    '\uFF54': 't',
    '\u1E6B': 't',
    '\u1E97': 't',
    '\u0165': 't',
    '\u1E6D': 't',
    '\u021B': 't',
    '\u0163': 't',
    '\u1E71': 't',
    '\u1E6F': 't',
    '\u0167': 't',
    '\u01AD': 't',
    '\u0288': 't',
    '\u2C66': 't',
    '\uA787': 't',
    '\uA729': 'tz',
    '\u24E4': 'u',
    '\uFF55': 'u',
    '\u00F9': 'u',
    '\u00FA': 'u',
    '\u00FB': 'u',
    '\u0169': 'u',
    '\u1E79': 'u',
    '\u016B': 'u',
    '\u1E7B': 'u',
    '\u016D': 'u',
    '\u00FC': 'u',
    '\u01DC': 'u',
    '\u01D8': 'u',
    '\u01D6': 'u',
    '\u01DA': 'u',
    '\u1EE7': 'u',
    '\u016F': 'u',
    '\u0171': 'u',
    '\u01D4': 'u',
    '\u0215': 'u',
    '\u0217': 'u',
    '\u01B0': 'u',
    '\u1EEB': 'u',
    '\u1EE9': 'u',
    '\u1EEF': 'u',
    '\u1EED': 'u',
    '\u1EF1': 'u',
    '\u1EE5': 'u',
    '\u1E73': 'u',
    '\u0173': 'u',
    '\u1E77': 'u',
    '\u1E75': 'u',
    '\u0289': 'u',
    '\u24E5': 'v',
    '\uFF56': 'v',
    '\u1E7D': 'v',
    '\u1E7F': 'v',
    '\u028B': 'v',
    '\uA75F': 'v',
    '\u028C': 'v',
    '\uA761': 'vy',
    '\u24E6': 'w',
    '\uFF57': 'w',
    '\u1E81': 'w',
    '\u1E83': 'w',
    '\u0175': 'w',
    '\u1E87': 'w',
    '\u1E85': 'w',
    '\u1E98': 'w',
    '\u1E89': 'w',
    '\u2C73': 'w',
    '\u24E7': 'x',
    '\uFF58': 'x',
    '\u1E8B': 'x',
    '\u1E8D': 'x',
    '\u24E8': 'y',
    '\uFF59': 'y',
    '\u1EF3': 'y',
    '\u00FD': 'y',
    '\u0177': 'y',
    '\u1EF9': 'y',
    '\u0233': 'y',
    '\u1E8F': 'y',
    '\u00FF': 'y',
    '\u1EF7': 'y',
    '\u1E99': 'y',
    '\u1EF5': 'y',
    '\u01B4': 'y',
    '\u024F': 'y',
    '\u1EFF': 'y',
    '\u24E9': 'z',
    '\uFF5A': 'z',
    '\u017A': 'z',
    '\u1E91': 'z',
    '\u017C': 'z',
    '\u017E': 'z',
    '\u1E93': 'z',
    '\u1E95': 'z',
    '\u01B6': 'z',
    '\u0225': 'z',
    '\u0240': 'z',
    '\u2C6C': 'z',
    '\uA763': 'z',
    '\u0386': '\u0391',
    '\u0388': '\u0395',
    '\u0389': '\u0397',
    '\u038A': '\u0399',
    '\u03AA': '\u0399',
    '\u038C': '\u039F',
    '\u038E': '\u03A5',
    '\u03AB': '\u03A5',
    '\u038F': '\u03A9',
    '\u03AC': '\u03B1',
    '\u03AD': '\u03B5',
    '\u03AE': '\u03B7',
    '\u03AF': '\u03B9',
    '\u03CA': '\u03B9',
    '\u0390': '\u03B9',
    '\u03CC': '\u03BF',
    '\u03CD': '\u03C5',
    '\u03CB': '\u03C5',
    '\u03B0': '\u03C5',
    '\u03C9': '\u03C9',
    '\u03C2': '\u03C3'
};
/**
 * @param {?} text
 * @return {?}
 */
function stripSpecialChars(text) {
    var /** @type {?} */ match = function (a) {
        return diacritics[a] || a;
    };
    return text.replace(/[^\u0000-\u007E]/g, match);
}
var ItemsList = /** @class */ (function () {
    function ItemsList() {
        this.items = [];
        this.filteredItems = [];
        this._markedIndex = -1;
        this._selected = [];
        this._multiple = false;
        this._simple = false;
    }
    Object.defineProperty(ItemsList.prototype, "value", {
        /**
         * @return {?}
         */
        get: function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemsList.prototype, "markedItem", {
        /**
         * @return {?}
         */
        get: function () {
            return this.filteredItems[this._markedIndex];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} items
     * @param {?} bindLabel
     * @param {?=} simple
     * @return {?}
     */
    ItemsList.prototype.setItems = function (items, bindLabel, simple) {
        if (simple === void 0) { simple = false; }
        this._simple = simple;
        this._bindLabel = bindLabel;
        this.items = this.mapItems(items);
        this.filteredItems = this.items.slice();
    };
    /**
     * @param {?} multiple
     * @return {?}
     */
    ItemsList.prototype.setMultiple = function (multiple) {
        this._multiple = multiple;
        this.clearSelected();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ItemsList.prototype.select = function (item) {
        if (item.selected) {
            return;
        }
        if (!this._multiple) {
            this.clearSelected();
        }
        this._selected.push(item);
        item.selected = true;
    };
    /**
     * @param {?} value
     * @param {?} bindValue
     * @return {?}
     */
    ItemsList.prototype.findItem = function (value, bindValue) {
        var _this = this;
        if (!value) {
            return null;
        }
        if (bindValue) {
            return this.items.find(function (item) { return item.value[bindValue] === value; });
        }
        var /** @type {?} */ index = this.items.findIndex(function (x) { return x.value === value; });
        return index > -1 ? this.items[index] :
            this.items.find(function (item) { return item.label === _this.resolveNested(value, _this._bindLabel); });
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ItemsList.prototype.unselect = function (item) {
        this._selected = this._selected.filter(function (x) { return x !== item; });
        item.selected = false;
    };
    /**
     * @return {?}
     */
    ItemsList.prototype.unselectLast = function () {
        if (this._selected.length === 0) {
            return;
        }
        this._selected[this._selected.length - 1].selected = false;
        this._selected.splice(this._selected.length - 1, 1);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ItemsList.prototype.addItem = function (item) {
        var /** @type {?} */ option = {
            index: this.items.length,
            label: this.resolveNested(item, this._bindLabel),
            value: item
        };
        this.items.push(option);
        this.filteredItems.push(option);
        return option;
    };
    /**
     * @return {?}
     */
    ItemsList.prototype.clearSelected = function () {
        this._selected.forEach(function (item) {
            item.selected = false;
            item.marked = false;
        });
        this._selected = [];
    };
    /**
     * @param {?} term
     * @return {?}
     */
    ItemsList.prototype.filter = function (term) {
        var /** @type {?} */ filterFuncVal = this.getDefaultFilterFunc(term);
        this.filteredItems = term ? this.items.filter(function (val) { return filterFuncVal(val); }) : this.items;
    };
    /**
     * @return {?}
     */
    ItemsList.prototype.clearFilter = function () {
        this.filteredItems = this.items.slice();
    };
    /**
     * @return {?}
     */
    ItemsList.prototype.markNextItem = function () {
        this.stepToItem(+1);
    };
    /**
     * @return {?}
     */
    ItemsList.prototype.markPreviousItem = function () {
        this.stepToItem(-1);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ItemsList.prototype.markItem = function (item) {
        this._markedIndex = this.filteredItems.indexOf(item);
    };
    /**
     * @param {?} markDefault
     * @return {?}
     */
    ItemsList.prototype.markSelectedOrDefault = function (markDefault) {
        if (this.filteredItems.length === 0) {
            return;
        }
        if (this.lastSelectedItem) {
            this._markedIndex = this.filteredItems.indexOf(this.lastSelectedItem);
        }
        else {
            this._markedIndex = markDefault ? 0 : -1;
        }
    };
    /**
     * @param {?} steps
     * @return {?}
     */
    ItemsList.prototype.getNextItemIndex = function (steps) {
        if (steps > 0) {
            return (this._markedIndex === this.filteredItems.length - 1) ? 0 : (this._markedIndex + 1);
        }
        return (this._markedIndex === 0) ? (this.filteredItems.length - 1) : (this._markedIndex - 1);
    };
    /**
     * @param {?} steps
     * @return {?}
     */
    ItemsList.prototype.stepToItem = function (steps) {
        if (this.filteredItems.length === 0) {
            return;
        }
        this._markedIndex = this.getNextItemIndex(steps);
        while (this.markedItem.disabled) {
            this.stepToItem(steps);
        }
    };
    /**
     * @param {?} term
     * @return {?}
     */
    ItemsList.prototype.getDefaultFilterFunc = function (term) {
        return function (option) {
            return stripSpecialChars(option.label || '')
                .toUpperCase()
                .indexOf(stripSpecialChars(term).toUpperCase()) > -1;
        };
    };
    Object.defineProperty(ItemsList.prototype, "lastSelectedItem", {
        /**
         * @return {?}
         */
        get: function () {
            return this._selected[this._selected.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} items
     * @return {?}
     */
    ItemsList.prototype.mapItems = function (items) {
        var _this = this;
        return items.map(function (item, index) {
            var /** @type {?} */ option = item;
            if (_this._simple) {
                option = {
                    label: /** @type {?} */ (item)
                };
            }
            return {
                index: index,
                label: _this.resolveNested(option, _this._bindLabel),
                value: option,
                disabled: !!option.disabled,
            };
        });
    };
    /**
     * @param {?} option
     * @param {?} key
     * @return {?}
     */
    ItemsList.prototype.resolveNested = function (option, key) {
        if (key.indexOf('.') === -1) {
            return option[key];
        }
        else {
            var /** @type {?} */ keys = key.split('.');
            var /** @type {?} */ value = option;
            for (var /** @type {?} */ i = 0, /** @type {?} */ len = keys.length; i < len; ++i) {
                if (value == null) {
                    return null;
                }
                value = value[keys[i]];
            }
            return value;
        }
    };
    return ItemsList;
}());
var NgOptionComponent = /** @class */ (function () {
    /**
     * @param {?} elementRef
     */
    function NgOptionComponent(elementRef) {
        this.elementRef = elementRef;
    }
    return NgOptionComponent;
}());
NgOptionComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ng-option',
                template: "<ng-content></ng-content>"
            },] },
];
/**
 * @nocollapse
 */
NgOptionComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
NgOptionComponent.propDecorators = {
    'value': [{ type: core.Input },],
};
var NG_SELECT_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return NgSelectComponent; }),
    multi: true
};
var NgSelectComponent = /** @class */ (function () {
    /**
     * @param {?} config
     * @param {?} changeDetectorRef
     * @param {?} elementRef
     * @param {?} renderer
     */
    function NgSelectComponent(config, changeDetectorRef, elementRef, renderer) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.elementRef = elementRef;
        this.renderer = renderer;
        // inputs
        this.items = [];
        this.clearable = true;
        this.markFirst = true;
        this.disableVirtualScroll = false;
        this.dropdownPosition = 'bottom';
        this.multiple = false;
        this.addTag = false;
        this.searchable = true;
        // output events
        this.blurEvent = new core.EventEmitter();
        this.focusEvent = new core.EventEmitter();
        this.changeEvent = new core.EventEmitter();
        this.openEvent = new core.EventEmitter();
        this.closeEvent = new core.EventEmitter();
        this.searchEvent = new core.EventEmitter();
        this.clearEvent = new core.EventEmitter();
        this.addEvent = new core.EventEmitter();
        this.removeEvent = new core.EventEmitter();
        this.isOpen = false;
        this.isFocused = false;
        this.isDisabled = false;
        this.itemsList = new ItemsList();
        this.viewPortItems = [];
        this.isLoading = false;
        this.filterValue = null;
        this._ngModel = null;
        this._simple = false;
        this._defaultLabel = 'label';
        this._defaultValue = 'value';
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.disposeDocumentClickListener = function () { };
        this.disposeDocumentResizeListener = function () { };
        this.clearItem = function (item) { return _this.unselect(item); };
        this.mergeGlobalConfig(config);
    }
    Object.defineProperty(NgSelectComponent.prototype, "single", {
        /**
         * @return {?}
         */
        get: function () {
            return !this.multiple;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgSelectComponent.prototype, "filtered", {
        /**
         * @return {?}
         */
        get: function () { return !!this.filterValue; },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(NgSelectComponent.prototype, "selectedItems", {
        /**
         * @return {?}
         */
        get: function () {
            return this.itemsList.value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    NgSelectComponent.prototype.ngOnChanges = function (changes) {
        if (changes.multiple) {
            this.itemsList.setMultiple(changes.multiple.currentValue);
        }
        if (changes.items) {
            this.setItems(changes.items.currentValue || []);
        }
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.ngOnInit = function () {
        this.handleDocumentClick();
        if (this._simple) {
            this.bindValue = this._defaultLabel;
        }
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.ngAfterViewInit = function () {
        if (this.ngOptions.length > 0 && this.items.length === 0) {
            this.setItemsFromNgOptions();
        }
        if (this.appendTo) {
            this.handleAppendTo();
        }
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.ngOnDestroy = function () {
        this.changeDetectorRef.detach();
        this.disposeDocumentClickListener();
        this.disposeDocumentResizeListener();
        if (this.appendTo) {
            this.elementRef.nativeElement.appendChild(this.dropdownPanel.nativeElement);
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgSelectComponent.prototype.handleKeyDown = function ($event) {
        if (KeyCode[$event.which]) {
            switch ($event.which) {
                case KeyCode.ArrowDown:
                    this.handleArrowDown($event);
                    break;
                case KeyCode.ArrowUp:
                    this.handleArrowUp($event);
                    break;
                case KeyCode.Space:
                    this.handleSpace($event);
                    break;
                case KeyCode.Enter:
                    this.handleEnter($event);
                    break;
                case KeyCode.Tab:
                    this.handleTab($event);
                    break;
                case KeyCode.Esc:
                    this.close();
                    break;
                case KeyCode.Backspace:
                    this.handleBackspace();
                    break;
            }
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgSelectComponent.prototype.handleArrowClick = function ($event) {
        $event.stopPropagation();
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgSelectComponent.prototype.handleClearClick = function ($event) {
        $event.stopPropagation();
        if (this.isValueSet) {
            this.clearModel();
        }
        this.clearSearch();
        this.focusSearchInput();
        if (this.isTypeahead) {
            this.typeahead.next(null);
        }
        this.clearEvent.emit();
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.clearModel = function () {
        if (!this.clearable) {
            return;
        }
        this.itemsList.clearSelected();
        this.notifyModelChanged();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgSelectComponent.prototype.writeValue = function (value) {
        this._ngModel = value;
        this.validateWriteValue(value);
        this.itemsList.clearSelected();
        this.selectWriteValue(value);
        this.detectChanges();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgSelectComponent.prototype.setDisabledState = function (isDisabled) {
        this.isDisabled = isDisabled;
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.toggle = function () {
        if (!this.isOpen) {
            this.open();
        }
        else {
            this.close();
        }
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.open = function () {
        if (this.isDisabled || this.isOpen) {
            return;
        }
        this.isOpen = true;
        this.itemsList.markSelectedOrDefault(this.markFirst);
        this.scrollToMarked();
        this.focusSearchInput();
        this.openEvent.emit();
        if (this.appendTo) {
            this.updateDropdownPosition();
        }
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.close = function () {
        if (!this.isOpen) {
            return;
        }
        this.isOpen = false;
        this.clearSearch();
        this.closeEvent.emit();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NgSelectComponent.prototype.toggleItem = function (item) {
        if (!item || item.disabled || this.isDisabled) {
            return;
        }
        if (this.multiple && item.selected) {
            this.unselect(item);
        }
        else {
            this.select(item);
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NgSelectComponent.prototype.select = function (item) {
        if (!item.selected) {
            this.itemsList.select(item);
            this.clearSearch();
            this.updateModel();
            this.addEvent.emit(item.value);
        }
        if (this.single) {
            this.close();
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NgSelectComponent.prototype.unselect = function (item) {
        this.itemsList.unselect(item);
        this.updateModel();
        this.removeEvent.emit(item);
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.selectTag = function () {
        var /** @type {?} */ tag = {};
        if (this.addTag instanceof Function) {
            tag = this.addTag(this.filterValue);
        }
        else {
            tag[this.bindLabel] = this.filterValue;
        }
        var /** @type {?} */ item = this.itemsList.addItem(tag);
        this.select(item);
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.showPlaceholder = function () {
        return this.placeholder && !this.isValueSet && !this.filterValue;
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.showClear = function () {
        return this.clearable && (this.isValueSet || this.filterValue) && !this.isDisabled;
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.showAddTag = function () {
        return this.addTag &&
            this.filterValue &&
            this.itemsList.filteredItems.length === 0 &&
            !this.isLoading;
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.showFilter = function () {
        return !this.isDisabled;
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.showNoItemsFound = function () {
        var /** @type {?} */ empty = this.itemsList.filteredItems.length === 0;
        return (empty && !this.isTypeahead) ||
            (empty && this.isTypeahead && this.filterValue && !this.isLoading);
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.showTypeToSearch = function () {
        var /** @type {?} */ empty = this.itemsList.filteredItems.length === 0;
        return empty && this.isTypeahead && !this.filterValue && !this.isLoading;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgSelectComponent.prototype.onFilter = function ($event) {
        if (!this.searchable) {
            return;
        }
        if (!this.isOpen) {
            this.open();
        }
        this.filterValue = $event.target.value;
        if (this.isTypeahead) {
            this.isLoading = true;
            this.typeahead.next(this.filterValue);
        }
        else {
            this.itemsList.filter(this.filterValue);
            this.itemsList.markSelectedOrDefault(this.markFirst);
        }
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.onInputFocus = function () {
        this.isFocused = true;
        this.focusEvent.emit(null);
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.onInputBlur = function () {
        this.isFocused = false;
        this.blurEvent.emit(null);
        if (!this.isOpen && !this.isDisabled) {
            this.onTouched();
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NgSelectComponent.prototype.onItemHover = function (item) {
        if (item.disabled) {
            return;
        }
        this.itemsList.markItem(item);
    };
    /**
     * @param {?} items
     * @return {?}
     */
    NgSelectComponent.prototype.setItems = function (items) {
        var /** @type {?} */ firstItem = items[0];
        this.bindLabel = this.bindLabel || this._defaultLabel;
        this._simple = firstItem && !(firstItem instanceof Object);
        this.itemsList.setItems(items, this.bindLabel, this._simple);
        if (this._ngModel && items.length > 0) {
            this.itemsList.clearSelected();
            this.selectWriteValue(this._ngModel);
        }
        if (this.isTypeahead) {
            this.isLoading = false;
            this.itemsList.markSelectedOrDefault(this.markFirst);
        }
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.setItemsFromNgOptions = function () {
        var _this = this;
        this.bindLabel = this.bindLabel || this._defaultLabel;
        this.bindValue = this.bindValue || this._defaultValue;
        var /** @type {?} */ handleNgOptions = function (options) {
            _this.items = options.map(function (option) { return ({
                value: option.value,
                label: option.elementRef.nativeElement.innerHTML
            }); });
            _this.itemsList.setItems(_this.items, _this.bindLabel);
            if (_this._ngModel) {
                _this.itemsList.clearSelected();
                _this.selectWriteValue(_this._ngModel);
            }
            _this.detectChanges();
        };
        this.ngOptions.changes.subscribe(function (options) { return handleNgOptions(options); });
        handleNgOptions(this.ngOptions);
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.handleDocumentClick = function () {
        var _this = this;
        var /** @type {?} */ handler = function ($event) {
            // prevent close if clicked on select
            if (_this.elementRef.nativeElement.contains($event.target)) {
                return;
            }
            // prevent close if clicked on dropdown menu
            var /** @type {?} */ dropdown = _this.getDropdownMenu();
            if (dropdown && dropdown.contains($event.target)) {
                return;
            }
            if (_this.isFocused) {
                _this.onInputBlur();
                _this.changeDetectorRef.markForCheck();
            }
            if (_this.isOpen) {
                _this.close();
                _this.changeDetectorRef.markForCheck();
            }
        };
        this.disposeDocumentClickListener = this.renderer.listen('document', 'click', handler);
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.handleDocumentResize = function () {
        var _this = this;
        var /** @type {?} */ handler = function () {
            if (_this.appendTo && _this.isOpen) {
                _this.updateDropdownPosition();
            }
        };
        this.disposeDocumentResizeListener = this.renderer.listen('window', 'resize', handler);
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.handleAppendTo = function () {
        if (this.appendTo === 'body') {
            document.body.appendChild(this.dropdownPanel.nativeElement);
        }
        else {
            var /** @type {?} */ parent = document.querySelector(this.appendTo);
            if (!parent) {
                throw new Error("appendTo selector " + this.appendTo + " did not found any parent element");
            }
            parent.appendChild(this.dropdownPanel.nativeElement);
        }
        this.handleDocumentResize();
        this.updateDropdownPosition();
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.updateDropdownPosition = function () {
        var /** @type {?} */ select = this.elementRef.nativeElement;
        var /** @type {?} */ dropdownPanel = this.dropdownPanel.nativeElement;
        var /** @type {?} */ bodyRect = document.body.getBoundingClientRect();
        var /** @type {?} */ selectRect = select.getBoundingClientRect();
        var /** @type {?} */ offsetTop = selectRect.top - bodyRect.top;
        var /** @type {?} */ offsetLeft = selectRect.left - bodyRect.left;
        var /** @type {?} */ topDelta = this.dropdownPosition === 'bottom' ? selectRect.height : -dropdownPanel.clientHeight;
        dropdownPanel.style.top = offsetTop + topDelta + 'px';
        dropdownPanel.style.bottom = 'auto';
        dropdownPanel.style.left = offsetLeft + 'px';
        dropdownPanel.style.width = selectRect.width + 'px';
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgSelectComponent.prototype.validateWriteValue = function (value) {
        var _this = this;
        if (!value) {
            return;
        }
        var /** @type {?} */ validateBinding = function (item) {
            if (item instanceof Object && _this.bindValue) {
                throw new Error('Binding object with bindValue is not allowed.');
            }
        };
        if (this.multiple) {
            if (!Array.isArray(value)) {
                throw new Error('Multiple select model should be array.');
            }
            value.forEach(function (item) { return validateBinding(item); });
        }
        else {
            validateBinding(value);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgSelectComponent.prototype.selectWriteValue = function (value) {
        var _this = this;
        if (!value) {
            return;
        }
        var /** @type {?} */ select = function (val) {
            var /** @type {?} */ item = _this.itemsList.findItem(val, _this.bindValue);
            if (item) {
                _this.itemsList.select(item);
            }
            else if (val instanceof Object) {
                var /** @type {?} */ newItem = _this.itemsList.addItem(val);
                _this.itemsList.select(newItem);
            }
        };
        if (this.multiple) {
            ((value)).forEach(function (item) {
                select(item);
            });
        }
        else {
            select(value);
        }
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.updateModel = function () {
        this.notifyModelChanged();
        this.changeDetectorRef.markForCheck();
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.clearSearch = function () {
        this.filterValue = null;
        this.itemsList.clearFilter();
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.focusSearchInput = function () {
        var _this = this;
        setTimeout(function () {
            _this.filterInput.nativeElement.focus();
            _this.filterInput.nativeElement.select();
        });
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.scrollToMarked = function () {
        this.dropdownList.scrollInto(this.itemsList.markedItem);
    };
    /**
     * @param {?} _
     * @return {?}
     */
    NgSelectComponent.prototype.handleTab = function (_) {
        if (this.isOpen) {
            this.close();
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgSelectComponent.prototype.handleEnter = function ($event) {
        if (this.isOpen) {
            if (this.itemsList.markedItem) {
                this.toggleItem(this.itemsList.markedItem);
            }
            else if (this.addTag) {
                this.selectTag();
            }
        }
        $event.preventDefault();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgSelectComponent.prototype.handleSpace = function ($event) {
        if (this.isOpen) {
            return;
        }
        this.open();
        $event.preventDefault();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgSelectComponent.prototype.handleArrowDown = function ($event) {
        if (!this.isOpen) {
            this.open();
        }
        else {
            this.itemsList.markNextItem();
            this.scrollToMarked();
        }
        $event.preventDefault();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgSelectComponent.prototype.handleArrowUp = function ($event) {
        this.itemsList.markPreviousItem();
        this.scrollToMarked();
        $event.preventDefault();
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.handleBackspace = function () {
        if (this.filterValue || !this.clearable || !this.isValueSet) {
            return;
        }
        if (this.multiple) {
            this.itemsList.unselectLast();
            this.updateModel();
        }
        else {
            this.clearModel();
        }
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.notifyModelChanged = function () {
        var _this = this;
        var /** @type {?} */ ngModel = this.value;
        if (!ngModel) {
            this.onChange(null);
        }
        else if (this.bindValue) {
            ngModel = Array.isArray(ngModel) ?
                ngModel.map(function (option) { return option[_this.bindValue]; }) :
                ngModel[this.bindValue];
            this.onChange(ngModel);
        }
        else {
            this.onChange(ngModel);
        }
        this._ngModel = ngModel;
        this.changeEvent.emit(this.value);
    };
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.getDropdownMenu = function () {
        if (!this.isOpen || !this.dropdownList) {
            return null;
        }
        return /** @type {?} */ (this.elementRef.nativeElement.querySelector('.ng-menu-outer'));
    };
    Object.defineProperty(NgSelectComponent.prototype, "isTypeahead", {
        /**
         * @return {?}
         */
        get: function () {
            return this.typeahead && this.typeahead.observers.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgSelectComponent.prototype.detectChanges = function () {
        if (!((this.changeDetectorRef)).destroyed) {
            this.changeDetectorRef.detectChanges();
        }
    };
    Object.defineProperty(NgSelectComponent.prototype, "value", {
        /**
         * @return {?}
         */
        get: function () {
            if (this.multiple) {
                return this.selectedItems.map(function (option) { return option.value; });
            }
            var /** @type {?} */ selectedItem = this.selectedItems[0];
            return selectedItem ? selectedItem.value : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgSelectComponent.prototype, "isValueSet", {
        /**
         * @return {?}
         */
        get: function () {
            return this.selectedItems.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} config
     * @return {?}
     */
    NgSelectComponent.prototype.mergeGlobalConfig = function (config) {
        if (!config) {
            config = new NgSelectConfig();
        }
        this.notFoundText = this.notFoundText || config.notFoundText;
        this.typeToSearchText = this.typeToSearchText || config.typeToSearchText;
        this.addTagText = this.addTagText || config.addTagText;
        this.loadingText = this.loadingText || config.loadingText;
        this.clearAllText = this.clearAllText || config.clearAllText;
        this.disableVirtualScroll = this.disableVirtualScroll || config.disableVirtualScroll;
    };
    return NgSelectComponent;
}());
NgSelectComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ng-select',
                template: "\n      <div (click)=\"searchable ? open() : toggle()\" class=\"ng-control\">\n          <div class=\"ng-value-container\">\n              <div class=\"ng-placeholder\" [hidden]=\"!showPlaceholder()\">{{placeholder}}</div>\n        \n              <div class=\"ng-value\" *ngFor=\"let item of selectedItems\">\n            \n                  <ng-template #defaultLabelTemplate>\n                      <div class=\"ng-value-wrapper default\" [class.disabled]=\"item.disabled\">\n                          <span class=\"ng-value-icon left\" (click)=\"unselect(item); $event.stopPropagation()\" aria-hidden=\"true\">\u00D7</span>\n                          <span class=\"ng-value-label\" [innerHTML]=\"item.label\"></span>\n                      </div>\n                  </ng-template>\n\n                  <ng-template\n                      [ngTemplateOutlet]=\"labelTemplate || defaultLabelTemplate\"\n                      [ngTemplateOutletContext]=\"{ item: item.value, clear: clearItem }\">\n                  </ng-template>\n              </div>\n\n              <div *ngIf=\"showFilter()\" class=\"ng-input\">\n                  <input #filterInput\n                         type=\"text\"\n                         [value]=\"filterValue\"\n                         (input)=\"onFilter($event)\"\n                         (focus)=\"onInputFocus($event)\"\n                         (blur)=\"onInputBlur($event)\"\n                         (change)=\"$event.stopPropagation()\"\n                         role=\"combobox\">\n              </div>\n          </div>\n\n          <spinner class=\"ng-spinner-zone\" *ngIf=\"isLoading\"></spinner>\n\n          <span *ngIf=\"showClear()\" (click)=\"handleClearClick($event)\" class=\"ng-clear-zone\" title=\"{{clearAllText}}\">\n              <span class=\"ng-clear\" aria-hidden=\"true\">\u00D7</span>\n          </span>\n\n          <span (click)=\"handleArrowClick($event)\" class=\"ng-arrow-zone\">\n              <span class=\"ng-arrow\"></span>\n          </span>\n      </div>\n\n      <div class=\"ng-select-dropdown-outer\" [class.top]=\"dropdownPosition === 'top'\" [class.bottom]=\"dropdownPosition === 'bottom'\" [ngStyle]=\"{'visibility': isOpen ? 'visible': 'hidden'}\" #dropdownPanel>\n          <virtual-scroll role=\"listbox\" class=\"ng-select-dropdown\" [disabled]=\"disableVirtualScroll\" [bufferAmount]=\"4\" [items]=\"itemsList.filteredItems\" (update)=\"viewPortItems = $event\">\n              <div class=\"ng-option\" role=\"option\" (click)=\"toggleItem(item)\" (mousedown)=\"$event.preventDefault()\" (mouseover)=\"onItemHover(item)\"\n                   *ngFor=\"let item of viewPortItems\"\n                   [class.disabled]=\"item.disabled\"\n                   [class.selected]=\"item.selected\"\n                   [class.marked]=\"item === itemsList.markedItem\">\n\n                  <ng-template #defaultOptionTemplate>\n                      <span class=\"ng-option-label\" [innerHTML]=\"item.label\"></span>\n                  </ng-template>\n\n                  <ng-template\n                      [ngTemplateOutlet]=\"optionTemplate || defaultOptionTemplate\"\n                      [ngTemplateOutletContext]=\"{ item: item.value, index: item.index }\">\n                  </ng-template>\n              </div>\n\n              <div class=\"ng-option marked\" role=\"option\" (click)=\"selectTag()\" *ngIf=\"showAddTag()\">\n                  <span><span class=\"ng-tag-label\">{{addTagText}}</span>\"{{filterValue}}\"</span>\n              </div>\n          </virtual-scroll>\n\n          <div class=\"ng-select-dropdown\" *ngIf=\"showNoItemsFound() && !addTag\">\n              <div class=\"ng-option disabled\">\n                  {{notFoundText}}\n              </div>\n          </div>\n\n          <div class=\"ng-select-dropdown\" *ngIf=\"showTypeToSearch()\">\n              <div class=\"ng-option disabled\">\n                  {{typeToSearchText}}\n              </div>\n          </div>\n\n          <div class=\"ng-select-dropdown\" *ngIf=\"isLoading && itemsList.filteredItems.length === 0\">\n              <div class=\"ng-option disabled\">\n                  {{loadingText}}\n              </div>\n          </div>\n      </div>\n    ",
                styles: ["\n      .ng-select {\n        position: relative;\n        display: block;\n        -webkit-box-sizing: border-box;\n        box-sizing: border-box; }\n        .ng-select div,\n        .ng-select input,\n        .ng-select span {\n          -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n        .ng-select [hidden] {\n          display: none; }\n        .ng-select.opened > .ng-control {\n          background: #fff;\n          border-color: #b3b3b3 #ccc #d9d9d9; }\n        .ng-select.opened > .ng-control .ng-arrow {\n          top: -2px;\n          border-color: transparent transparent #999;\n          border-width: 0 5px 5px; }\n          .ng-select.opened > .ng-control .ng-arrow:hover {\n            border-color: transparent transparent #666; }\n        .ng-select.opened.bottom > .ng-control {\n          border-bottom-right-radius: 0;\n          border-bottom-left-radius: 0; }\n        .ng-select.opened.top > .ng-control {\n          border-top-right-radius: 0;\n          border-top-left-radius: 0; }\n        .ng-select.focused:not(.opened) > .ng-control {\n          border-color: #007eff;\n          -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(0, 126, 255, 0.1);\n                  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(0, 126, 255, 0.1); }\n        .ng-select.disabled {\n          pointer-events: none; }\n          .ng-select.disabled > .ng-control {\n            background-color: #f9f9f9; }\n        .ng-select.searchable .ng-control .ng-value-container .ng-input {\n          opacity: 1; }\n        .ng-select .ng-control {\n          background-color: #fff;\n          border-radius: 4px;\n          border: 1px solid #ccc;\n          color: #333;\n          cursor: default;\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-align: center;\n              -ms-flex-align: center;\n                  align-items: center;\n          border-spacing: 0;\n          border-collapse: separate;\n          min-height: 36px;\n          outline: none;\n          overflow: hidden;\n          position: relative;\n          width: 100%; }\n          .ng-select .ng-control:hover {\n            -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);\n                    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06); }\n          .ng-select .ng-control .ng-value-container {\n            display: -webkit-box;\n            display: -ms-flexbox;\n            display: flex;\n            -webkit-box-flex: 1;\n                -ms-flex: 1;\n                    flex: 1;\n            -webkit-box-align: center;\n                -ms-flex-align: center;\n                    align-items: center;\n            padding-left: 10px; }\n            .ng-select .ng-control .ng-value-container .ng-placeholder {\n              color: #aaa; }\n            .ng-select .ng-control .ng-value-container .ng-input {\n              opacity: 0; }\n              .ng-select .ng-control .ng-value-container .ng-input > input {\n                min-width: 5px;\n                -webkit-box-sizing: content-box;\n                        box-sizing: content-box;\n                background: none transparent;\n                border: 0 none;\n                -webkit-box-shadow: none;\n                        box-shadow: none;\n                outline: none;\n                cursor: default;\n                width: 100%; }\n        .ng-select.ng-single.filtered .ng-control .ng-value-container .ng-value {\n          visibility: hidden; }\n        .ng-select.ng-single .ng-control .ng-value-container {\n          white-space: nowrap;\n          overflow: hidden;\n          text-overflow: ellipsis; }\n          .ng-select.ng-single .ng-control .ng-value-container .ng-value {\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis; }\n            .ng-select.ng-single .ng-control .ng-value-container .ng-value .ng-value-wrapper {\n              white-space: nowrap;\n              overflow: hidden;\n              text-overflow: ellipsis; }\n              .ng-select.ng-single .ng-control .ng-value-container .ng-value .ng-value-wrapper .ng-value-icon {\n                display: none; }\n          .ng-select.ng-single .ng-control .ng-value-container .ng-input {\n            position: absolute;\n            left: 0;\n            padding-left: 10px;\n            padding-right: 50px;\n            width: 100%; }\n        .ng-select.ng-multiple.disabled > .ng-control .ng-value-container .ng-value .ng-value-wrapper.default {\n          background-color: #f9f9f9;\n          border: 1px solid #e3e3e3; }\n          .ng-select.ng-multiple.disabled > .ng-control .ng-value-container .ng-value .ng-value-wrapper.default .ng-value-icon {\n            display: none; }\n        .ng-select.ng-multiple .ng-control .ng-value-container {\n          padding-top: 5px;\n          -ms-flex-wrap: wrap;\n              flex-wrap: wrap;\n          padding-left: 7px; }\n          .ng-select.ng-multiple .ng-control .ng-value-container .ng-placeholder {\n            position: absolute; }\n          .ng-select.ng-multiple .ng-control .ng-value-container .ng-value {\n            font-size: 0.9em;\n            padding-right: 5px;\n            padding-bottom: 5px;\n            white-space: nowrap; }\n            .ng-select.ng-multiple .ng-control .ng-value-container .ng-value .ng-value-wrapper {\n              display: -webkit-box;\n              display: -ms-flexbox;\n              display: flex; }\n              .ng-select.ng-multiple .ng-control .ng-value-container .ng-value .ng-value-wrapper.default {\n                background-color: #f5faff;\n                border-radius: 2px;\n                border: 1px solid #c2e0ff; }\n                .ng-select.ng-multiple .ng-control .ng-value-container .ng-value .ng-value-wrapper.default.disabled {\n                  background-color: #f9f9f9;\n                  border: 1px solid #e3e3e3; }\n                .ng-select.ng-multiple .ng-control .ng-value-container .ng-value .ng-value-wrapper.default .ng-value-icon:hover {\n                  background-color: #d8eafd; }\n                .ng-select.ng-multiple .ng-control .ng-value-container .ng-value .ng-value-wrapper.default .ng-value-icon.left {\n                  border-right: 1px solid #c2e0ff; }\n                .ng-select.ng-multiple .ng-control .ng-value-container .ng-value .ng-value-wrapper.default .ng-value-icon.right {\n                  border-left: 1px solid #c2e0ff; }\n              .ng-select.ng-multiple .ng-control .ng-value-container .ng-value .ng-value-wrapper.disabled .ng-value-icon {\n                display: none; }\n              .ng-select.ng-multiple .ng-control .ng-value-container .ng-value .ng-value-wrapper .ng-value-label {\n                padding: 0 5px; }\n              .ng-select.ng-multiple .ng-control .ng-value-container .ng-value .ng-value-wrapper .ng-value-icon {\n                padding: 0 5px;\n                cursor: pointer; }\n          .ng-select.ng-multiple .ng-control .ng-value-container .ng-input {\n            -webkit-box-flex: 1;\n                -ms-flex: 1;\n                    flex: 1;\n            padding-bottom: 3px;\n            padding-left: 3px; }\n          .ng-select.ng-multiple .ng-control .ng-value-container .ng-placeholder {\n            padding-bottom: 5px;\n            padding-left: 3px; }\n        .ng-select .ng-clear-zone {\n          -webkit-animation: Select-animation-fadeIn 200ms;\n          animation: Select-animation-fadeIn 200ms;\n          color: #999;\n          cursor: pointer;\n          position: relative;\n          width: 17px; }\n          .ng-select .ng-clear-zone .ng-clear {\n            display: inline-block;\n            font-size: 18px;\n            line-height: 1; }\n            .ng-select .ng-clear-zone .ng-clear:hover {\n              color: #D0021B; }\n        .ng-select .ng-spinner-zone {\n          cursor: pointer;\n          display: table-cell;\n          position: relative;\n          text-align: center;\n          vertical-align: middle;\n          width: 25px;\n          padding-right: 5px;\n          padding-top: 5px; }\n        .ng-select .ng-arrow-zone {\n          cursor: pointer;\n          display: table-cell;\n          position: relative;\n          text-align: center;\n          vertical-align: middle;\n          width: 25px;\n          padding-right: 5px; }\n          .ng-select .ng-arrow-zone .ng-arrow {\n            border-color: #999 transparent transparent;\n            border-style: solid;\n            border-width: 5px 5px 2.5px;\n            display: inline-block;\n            height: 0;\n            width: 0;\n            position: relative; }\n            .ng-select .ng-arrow-zone .ng-arrow:hover {\n              border-top-color: #666; }\n\n      .ng-select-dropdown-outer {\n        visibility: hidden;\n        background-color: #fff;\n        border: 1px solid #ccc;\n        -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);\n                box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);\n        -webkit-box-sizing: border-box;\n                box-sizing: border-box;\n        max-height: 242px;\n        position: absolute;\n        width: 100%;\n        z-index: 3;\n        -webkit-overflow-scrolling: touch; }\n        .ng-select-dropdown-outer.bottom {\n          top: 100%;\n          border-bottom-right-radius: 4px;\n          border-bottom-left-radius: 4px;\n          border-top-color: #e6e6e6;\n          margin-top: -1px; }\n        .ng-select-dropdown-outer.top {\n          bottom: 100%;\n          border-top-right-radius: 4px;\n          border-top-left-radius: 4px;\n          border-bottom-color: #e6e6e6;\n          margin-bottom: -1px; }\n        .ng-select-dropdown-outer .ng-select-dropdown {\n          display: block;\n          height: auto;\n          -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n          max-height: 240px;\n          overflow-y: auto; }\n          .ng-select-dropdown-outer .ng-select-dropdown .ng-option {\n            -webkit-box-sizing: border-box;\n                    box-sizing: border-box;\n            background-color: #fff;\n            color: #666666;\n            cursor: pointer;\n            display: block;\n            padding: 8px 10px; }\n            .ng-select-dropdown-outer .ng-select-dropdown .ng-option:last-child {\n              border-bottom-right-radius: 4px;\n              border-bottom-left-radius: 4px; }\n            .ng-select-dropdown-outer .ng-select-dropdown .ng-option.selected {\n              background-color: #f5faff;\n              color: #333; }\n              .ng-select-dropdown-outer .ng-select-dropdown .ng-option.selected .ng-option-label {\n                font-weight: 600; }\n            .ng-select-dropdown-outer .ng-select-dropdown .ng-option.marked {\n              background-color: #ebf5ff;\n              color: #333; }\n            .ng-select-dropdown-outer .ng-select-dropdown .ng-option.disabled {\n              color: #cccccc;\n              cursor: default; }\n            .ng-select-dropdown-outer .ng-select-dropdown .ng-option .ng-tag-label {\n              padding-right: 5px;\n              font-size: 80%;\n              font-weight: 400; }\n    "],
                providers: [NG_SELECT_VALUE_ACCESSOR],
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                host: {
                    'role': 'dropdown',
                    'class': 'ng-select',
                    '[class.top]': 'dropdownPosition === "top"',
                    '[class.bottom]': 'dropdownPosition === "bottom"',
                }
            },] },
];
/**
 * @nocollapse
 */
NgSelectComponent.ctorParameters = function () { return [
    { type: NgSelectConfig, decorators: [{ type: core.Optional },] },
    { type: core.ChangeDetectorRef, },
    { type: core.ElementRef, },
    { type: core.Renderer2, },
]; };
NgSelectComponent.propDecorators = {
    'optionTemplate': [{ type: core.ContentChild, args: [NgOptionTemplateDirective, { read: core.TemplateRef },] },],
    'labelTemplate': [{ type: core.ContentChild, args: [NgLabelTemplateDirective, { read: core.TemplateRef },] },],
    'dropdownList': [{ type: core.ViewChild, args: [VirtualScrollComponent,] },],
    'dropdownPanel': [{ type: core.ViewChild, args: ['dropdownPanel',] },],
    'ngOptions': [{ type: core.ContentChildren, args: [NgOptionComponent, { descendants: true },] },],
    'filterInput': [{ type: core.ViewChild, args: ['filterInput',] },],
    'items': [{ type: core.Input },],
    'bindLabel': [{ type: core.Input },],
    'bindValue': [{ type: core.Input },],
    'clearable': [{ type: core.Input },],
    'markFirst': [{ type: core.Input },],
    'disableVirtualScroll': [{ type: core.Input },],
    'placeholder': [{ type: core.Input },],
    'notFoundText': [{ type: core.Input },],
    'typeToSearchText': [{ type: core.Input },],
    'addTagText': [{ type: core.Input },],
    'loadingText': [{ type: core.Input },],
    'clearAllText': [{ type: core.Input },],
    'dropdownPosition': [{ type: core.Input },],
    'appendTo': [{ type: core.Input },],
    'typeahead': [{ type: core.Input }, { type: core.HostBinding, args: ['class.typeahead',] },],
    'multiple': [{ type: core.Input }, { type: core.HostBinding, args: ['class.ng-multiple',] },],
    'addTag': [{ type: core.Input }, { type: core.HostBinding, args: ['class.taggable',] },],
    'searchable': [{ type: core.Input }, { type: core.HostBinding, args: ['class.searchable',] },],
    'blurEvent': [{ type: core.Output, args: ['blur',] },],
    'focusEvent': [{ type: core.Output, args: ['focus',] },],
    'changeEvent': [{ type: core.Output, args: ['change',] },],
    'openEvent': [{ type: core.Output, args: ['open',] },],
    'closeEvent': [{ type: core.Output, args: ['close',] },],
    'searchEvent': [{ type: core.Output, args: ['search',] },],
    'clearEvent': [{ type: core.Output, args: ['clear',] },],
    'addEvent': [{ type: core.Output, args: ['add',] },],
    'removeEvent': [{ type: core.Output, args: ['remove',] },],
    'single': [{ type: core.HostBinding, args: ['class.ng-single',] },],
    'isOpen': [{ type: core.HostBinding, args: ['class.opened',] },],
    'isFocused': [{ type: core.HostBinding, args: ['class.focused',] },],
    'isDisabled': [{ type: core.HostBinding, args: ['class.disabled',] },],
    'filtered': [{ type: core.HostBinding, args: ['class.filtered',] },],
    'handleKeyDown': [{ type: core.HostListener, args: ['keydown', ['$event'],] },],
};
var SpinnerComponent = /** @class */ (function () {
    function SpinnerComponent() {
    }
    return SpinnerComponent;
}());
SpinnerComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'spinner',
                template: "\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n     width=\"20px\" height=\"20px\" viewBox=\"0 0 50 50\" style=\"enable-background:new 0 0 50 50;\" xml:space=\"preserve\">\n  <path fill=\"#777\" d=\"M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z\">\n    <animateTransform attributeType=\"xml\"\n      attributeName=\"transform\"\n      type=\"rotate\"\n      from=\"0 25 25\"\n      to=\"360 25 25\"\n      dur=\"0.6s\"\n      repeatCount=\"indefinite\"/>\n    </path>\n  </svg>"
            },] },
];
/**
 * @nocollapse
 */
SpinnerComponent.ctorParameters = function () { return []; };
var NgSelectModule = /** @class */ (function () {
    function NgSelectModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    NgSelectModule.forRoot = function (config) {
        return provideModule(config);
    };
    /**
     * @param {?=} config
     * @return {?}
     */
    NgSelectModule.forChild = function (config) {
        return provideModule(config);
    };
    return NgSelectModule;
}());
NgSelectModule.decorators = [
    { type: core.NgModule, args: [{
                declarations: [
                    NgSelectComponent,
                    NgOptionComponent,
                    NgOptionTemplateDirective,
                    NgLabelTemplateDirective,
                    SpinnerComponent
                ],
                imports: [
                    common.CommonModule,
                    VirtualScrollModule
                ],
                exports: [
                    NgSelectComponent,
                    NgOptionComponent,
                    NgOptionTemplateDirective,
                    NgLabelTemplateDirective
                ]
            },] },
];
/**
 * @nocollapse
 */
NgSelectModule.ctorParameters = function () { return []; };
/**
 * @param {?} config
 * @return {?}
 */
function provideModule(config) {
    return {
        ngModule: NgSelectModule,
        providers: [
            { provide: NgSelectConfig, useValue: config }
        ]
    };
}

exports.NgSelectComponent = NgSelectComponent;
exports.NgSelectModule = NgSelectModule;
exports.NgSelectConfig = NgSelectConfig;
exports.ɵf = NgOptionComponent;
exports.ɵa = provideModule;
exports.ɵc = NgLabelTemplateDirective;
exports.ɵb = NgOptionTemplateDirective;
exports.ɵg = SpinnerComponent;
exports.ɵd = VirtualScrollComponent;
exports.ɵe = VirtualScrollModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-select.umd.js.map
