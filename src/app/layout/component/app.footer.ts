import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Zenware LATAM &copy; Created by
        <a href="https://www.linkedin.com/company/zenware-latam/posts/?feedView=all" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Zenware</a>
    </div>`
})
export class AppFooter {}
