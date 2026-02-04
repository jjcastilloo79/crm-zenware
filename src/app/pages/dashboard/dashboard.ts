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

//Chart.register(ChartDataLabels);



@Component({
    selector: 'app-dashboard',
    imports: [DividerModule, MultiSelectModule, InputNumberModule, FormsModule, DatePickerModule, SelectModule, ButtonModule, ChartModule, TableModule],
    templateUrl: './dashboard.component.html',
    standalone: true   
})
export class Dashboard {
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
    data2: any;
    options: any;
    options2: any;
    platformId = inject(PLATFORM_ID);

    constructor(private cd: ChangeDetectorRef) {
        this.nomUsuario = 'Juan Perez';
        this.nomPerfil = 'Administrador';
    }

    ngOnInit() {
        this.initChart();
        this.initChart2();
    }

    consultarData2() {}

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

            this.data = {
                labels: ['Potencial Lead', '1. Contacto', '2. Calificación', '3. Investigación', '4. Presentación', '5. Cierre', 'Cerrado'],
                datasets: [
                    {
                        label: 'Funnel Cantidad Deals',
                        backgroundColor: documentStyle.getPropertyValue('--p-cyan-400'),
                        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        data: [0, 1250000, 614000, 420000, 315000, 275000, 1696000]
                    }
                ]
            };

            this.options = {
                indexAxis: 'x',
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

    initChart2() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

            this.data2 = {
                labels: ['Potencial Lead', '1. Contacto', '2. Calificación', '3. Investigación', '4. Presentación', '5. Cierre', 'Cerrado'],
                datasets: [
                    {
                        label: 'Funnel Cantidad Deals',
                        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                        data: [5, 2, 6, 3, 3, 3, 4],
                        color: '#FFFFFF'
                    }
                ]
            };

            this.options2 = {
                indexAxis: 'y',
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
                        },
                        beginAtZero: false
                    }
                }
            };
            this.cd.markForCheck();
        }
    }
}
