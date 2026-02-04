import { ChangeDetectorRef, Component, inject, PLATFORM_ID } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { TableModule } from 'primeng/table';

Chart.register(ChartDataLabels);



@Component({
    selector: 'app-balance',
    imports: [DividerModule, MultiSelectModule, InputNumberModule, FormsModule, DatePickerModule, SelectModule, ButtonModule, ChartModule, TableModule],
    templateUrl: './balance.html',
    standalone: true
})
export class Balance {
    [x: string]: any;
    nomUsuario: any;
    nomPerfil: any;
    selectedEstados: any;
    events: any[] | undefined;
    lstQ: any[] | undefined;
    selectedQ: any;
    porcierre: number | undefined;
    lstDesMontos: any[] | undefined;
    idmonto: any;
    annio: any;
    idtipoprod: any;
    lstEnti: any[] | undefined;
    tipoentidad: any;
    Clientes: any[] | undefined;
    idcliente: any;
    lstTipoProducto: any[] | undefined;
    Vendedor: any[] | undefined;
    idvendedor: any;
    Preventa: any[] | undefined;
    idpreventa: any;
    listaTareas: any[] = [];

    data: any;
    options: any;
    platformId = inject(PLATFORM_ID);

    constructor(private cd: ChangeDetectorRef) {
        this.nomUsuario = 'Juan Perez';
        this.nomPerfil = 'Administrador';
    }

    ngOnInit() {
        this.initChart();
    }

    consultarData2() {}

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

            this.data = {
                labels: [
                    '01-01',
                    '02-01',
                    '03-01',
                    '04-01',
                    '05-01',
                    '06-01',
                    '07-01',
                    '08-01',
                    '09-01',
                    '10-01',
                    '11-01',
                    '12-01',
                    '13-01',
                    '14-01',
                    '15-01',
                    '16-01',
                    '17-01',
                    '18-01',
                    '19-01',
                    '20-01',
                    '21-01',
                    '22-01',
                    '23-01',
                    '24-01',
                    '25-01',
                    '26-01',
                    '27-01',
                    '28-01',
                    '29-01',
                    '30-01',
                    '31-01'
                ],
                datasets: [
                    {
                        label: 'Actividades Diarias',
                        backgroundColor: documentStyle.getPropertyValue('--p-cyan-600'),
                        borderColor: documentStyle.getPropertyValue('--p-cyan-600'),
                        data: [5, 2, 6, 3, 3, 3, 4, 8, 3, 3, 3, 4, 2, 9, 3, 3, 4, 2, 6, 3, 3, 3, 4, 6, 3, 3, 3, 4, 2, 1, 3]
                    }
                ]
            };

            this.options = {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                            font: {
                                weight: 500
                            }
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };
            this.cd.markForCheck();
        }
    }
}
