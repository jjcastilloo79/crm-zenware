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
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
    selector: 'app-c-prioridad',
    standalone: true,
    imports: [TableModule ,ButtonModule, DatePickerModule,FormsModule , SelectModule, InputTextModule, TextareaModule],
    templateUrl: './c-prioridad.html',
})
export class CPrioridad {
    idsector: any;
    lstSector = [];
    annio: any;
    lstContactos: any[] = [];
    ingredient: any;
}
