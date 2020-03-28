import { Marked } from 'marked-ts';

export function registerMarkdownExtensionRules() {
    //shouldDisplay();
    sorting();
    mdDirectives();
}

// a tag to specify if a piece of content should be created into a business object or skipped
const regexpDisplay = /== DISPLAY ==/;
// const shouldDisplay = () => {
//     Marked.setBlockRule(regexpDisplay, function (execArr) {
        
//     });
// }

// sorting order for non-date content. Would use this on a project listing or content items, but not on a blog post. 
const sortOrder = /(SORT ORDER:[\s\S]*)/;
const sorting = () => {
    Marked.setBlockRule(sortOrder, function (execArr) {
        const digit = parseInt(execArr && execArr[0]);
        if (digit) {
            return `<div class="content-sort-rder" data-content="${digit}"></div>`;
        }
        const msg = `[Error: failed to parse a number for sort order]`;
        return mdParseError(msg);
    });
}

const customChannels = /^@@@ *(\w+)\n([\s\S]+?)\n@@@/;
const mdDirectives = () => {
    Marked.setBlockRule(customChannels, function (execArr) {
        const channel: string = execArr && execArr[1];
        const content: string = execArr && execArr[2];
    
        switch(channel) {
            case 'TITLE': { // should this be BLOG_TITLE??
                return `<h1 class="content-title" data-content="${content}">${content}</h1>`;
            }
            case 'PROJECT_TITLE': {
                return `<h2 class="content-project-title" data-content="${content}">${content}</h2>`;
            }
            case 'CONTENT_TITLE': { // this could use a better name. SITE_CONTENT_TITLE?
                return `<h2 class="content-title" data-content="${content}">${content}</h2>`;
            }
            // should I make an invisible tag for some sort of metaTitle or identifier?
            // I think that I need this, and this need is fueling having different 
            // identifiers for every content type. General site content: should display it's title?
            case 'DESCRIPTION': {
                return `<p class="content-description" data-content="${content}">${content}</p>`;
            }
            case 'TAGS': {
                const tagList: string[] = [];
                content.split(', ').forEach(tag => tagList.push(
                    `<div class="content-tag" data-content="${tag}">${tag}</div>`
                ));
                const tagsHTML = tagList.join('\n')
                return `<div class="content-tags" data-content="${content}">${tagsHTML}</div>`;
            }
            case 'PUBLISH_DATE': {
                const dateISO_8601 = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i
                if (content.match(dateISO_8601)) {
                    let dateInt = Date.parse(content)
                    return `<div class="content-publish-date" data-content="${dateInt}">${new Date(dateInt).toLocaleTimeString()}</div>`
                }
                const msg = `[Error: date "${content}" does not parse]`
                return mdParseError(msg);
            }
            case 'REPO': {
                const msg = `[Error: repo url ${content} does not parse]`;
                return prettyLink(content, msg, "Repo: ");
            }
            case 'LIVE_APP': {
                const msg = `[Error: live app url ${content} does not parse]`;
                return prettyLink(content, msg, "Live App: ");
            }
            case 'DISPLAY': {
                if (content) {
                    return `<div class="content-should-display" data-content="true"></div>`;
                } else {
                    return `<div class="content-should-display" data-content="false"></div>`;
                }
            }
            default: {
                const msg = `[Error: a channel "${channel}" for an embedded code is not recognized]`;
                return mdParseError(msg);
            }
        }
    });
}

const prettyLink = (content: string, errorMessage: string, prependText?: string, linkText?: string) => {
    if (content.match(regexpUrl)) {
        prependText = prependText ? prependText : "";
        const prettyUrl = content.includes("http") ? content.split('//')[1] : content;
        const tag = `
        <div class="content-pretty-link">
            ${prependText}<a href="${content}" data-content="${content}">${linkText || prettyUrl}</a>

        </div>`;
        return tag;
    }
    return mdParseError(errorMessage);
}

const mdParseError = (errorMessage: string): string => {
    return '<div class="ERROR" style="color: red">' + errorMessage + '</div>';
}

const regexpUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
