export class mdContentMetadata {
    public properties: metadataSlice[];

    constructor() {
        this.properties = [];
    }
}

export class metadataSlice {
    // add name or identifier here
    public name: string;
    public path: string;
    public items: string[];

    constructor(obj?: any) {
        this.defaultInitializer();
        if (obj) this.objectInitializer(obj);
    }

    private objectInitializer(obj: any): void {
        Object.entries(obj).forEach( (property: [string, string]) => {
            const propName = property[0];
            const propValue = property[1];
            if (this.hasOwnProperty(propName)) {
                this[propName] = propValue;
            }
        })
    }

    private defaultInitializer(): void {
        this.name = "";
        this.path = "";
        this.items = [];
    }

    isValid(): boolean {
        const hasName = this.name != undefined &&
                        this.name != null &&
                        this.name.length > 0;
        
        const hasPath = this.path != undefined &&
                        this.path != null &&
                        this.path.length > 0;

        const itemSafe = this.items != undefined &&
                            this.items != null;
            
        const isValid = hasName && hasPath && itemSafe;

        if (!isValid) console.log("Metadata slice is invalid", this);
        return isValid;
    }

    private hasOwnProperty(prop: string): boolean {
        return Object.keys(this).includes(prop);
    }
}
