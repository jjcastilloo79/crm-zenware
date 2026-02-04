import { Component} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
    selector: 'app-agenda',
    imports: [TableModule, ButtonModule, FullCalendarModule],
    templateUrl: './agenda.html',
    standalone: true
})
export class Agenda {

lstOportunidades: any[] = [];

events: any;

    constructor() {
        
    }

    ngOnInit() {
    }

    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        locale: esLocale,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        selectable: true,
        editable: true,
        events: [
            { title: 'Reunión', date: '2026-01-10' },
            { title: 'Demo Zenware', date: '2026-01-12' }
        ]
        };


}