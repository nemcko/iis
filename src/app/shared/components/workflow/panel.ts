import { Type } from '@angular/core';

/**
 * Workflow panel
 */
export class WorkflowPanel {
    public constructor(
        public component: Type<any>,
        public parent?: any,
        public data?: any,
        public idl?: string,
        public id?: string,
    ) { }
}

