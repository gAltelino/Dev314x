export class AdvancedSearchModel {
    constructor(
        public q: string,
        public language?: string,
        public user?: string,
        public size?: string,
        public stars?: number,
        public topic?: string
    ) {}
}
