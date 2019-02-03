export class Project {

    name: string;
    description: string;
    link: string;
    repo: string;
    tags: string[];
    isExpanded: boolean = false;
    hover: boolean = false;

    constructor(name: string, description: string, link: string, repo: string = '', tags: string[] = []) {
        this.name = name;
        this.description = description;
        this.link = link;
        this.tags = tags;
        this.repo = repo;
    }
    toggleExpanded() {
        this.isExpanded = !this.isExpanded;
        if (this.isExpanded) {this.hover = false};
    }
    toggleHover(value: boolean) {
        this.hover = value;
    }
}
