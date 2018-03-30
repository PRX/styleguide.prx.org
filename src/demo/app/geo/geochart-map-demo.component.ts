import { Component, ElementRef, Input, OnInit, OnChanges, ViewChild } from '@angular/core';

declare const google: any;

@Component({
  moduleId: module.id,
  selector: 'geochart-map-demo',
  template: `
    <div #geo></div>
  `
})

export class GeoChartMapDemoComponent implements OnInit, OnChanges {
  private static googleLoaded: boolean;
  @ViewChild('geo') el: ElementRef;
  @Input() region: string;
  @Input() displayMode: string;
  @Input() data: any[][];
  colors = ['#D6EAEA', '#C2DEE1', '#AED2D8', '#9AC6CF', '#86BAC6',
    '#72AEBD', '#5EA2B4', '#4A96AB', '#368AA2', '#317C92',
    '#2C6E82', '#276072', '#225262', '#1D4452', '#183642'];

  ngOnInit() {
    if (!GeoChartMapDemoComponent.googleLoaded) {
      GeoChartMapDemoComponent.googleLoaded = true;
      google.charts.load('current', {
        packages: ['geochart'],
        mapsApiKey: 'AIzaSyCe-WnwaXeTdQO4ZfwxTCMuz0lmk0YJGWk'
      });
      google.charts.setOnLoadCallback(this.drawMap.bind(this));
    }
  }

  ngOnChanges() {
    if (GeoChartMapDemoComponent.googleLoaded && this.data) {
      this.drawMap();
    }
  }

  drawMap() {
    const options = {
      displayMode: this.displayMode,
      colorAxis: {colors: this.colors}
    };

    if (this.region !== 'world') {
      options['region'] = this.region;
    }

    // TODO: add resolution as param
    if ((this.region === 'US' || this.region === 'CA') &&
      this.displayMode === 'regions') {
      options['resolution'] = 'provinces';
    }
    if (this.region === 'US' && this.displayMode === 'metros') {
      options.displayMode = 'regions';
      options['resolution'] = 'metros';
      this.data = this.data.map(entry => ['US-' + entry[0].split(' - ')[0], entry[1]]);
    }

    const chart = new google.visualization.GeoChart(this.el.nativeElement);
    chart.draw(google.visualization.arrayToDataTable(this.data), options);
  }
}