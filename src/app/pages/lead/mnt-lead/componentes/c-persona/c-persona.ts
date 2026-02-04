import { Component } from '@angular/core';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-c-persona',
    standalone: true,
    imports: [TableModule ,ButtonModule],
    templateUrl: './c-persona.html',
})
export class CPersona {
    idsector: any;
    lstSector = [];
    annio: any;
    lstContactos: any[] = [];
}
