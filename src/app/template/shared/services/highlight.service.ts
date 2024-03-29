import { Injectable, Inject  } from '@angular/core';

// import 'clipboard';

import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';

declare var Prism: any;

@Injectable({
    providedIn: 'root'
})
export class HighlightService {

    highlightAll() {
        Prism.highlightAll();
    }

}
