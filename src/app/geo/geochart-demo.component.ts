import { Component } from '@angular/core';
import * as geoData from './geo-data';

@Component({
  selector: 'app-geochart-demo',
  template: `
    <div class="sidebar">
      <div class="profile">

        <div class="info">
          <div class="logo">
            <prx-image [src]="podcastImage"></prx-image>
          </div>
          <div class="title">
            <h2>Pet Talks Daily</h2>
          </div>
        </div>

        <div class="stats">
          <div class="podstats">
            <div class="podstat">
              <p class="label">Today</p>
              <span class="trend-container trend-left">
                <span class="trend-up"></span>

              </span>
              <b class="value">633K</b>
            </div>
            <div class="podstat">
              <p class="label">7 Days</p>
              <b class="value">4706K</b>
              <span class="trend-container">
                <span class="trend-up"></span>

              </span>
            </div>
          </div>

          <div class="epstats">
            <p>Most Recent</p>
            <button class="btn-link">How fungi recognize (and infect) plants | Mennat El Ghalid</button>
            <p>
              12K Today
              —
              12K All Time
            </p>
          </div>
        </div>

      </div>

      <nav>
        <button>Downloads</button>
        <button class="active">Demographics</button>
        <button>Traffic Sources</button>
      </nav>
    </div>

    <div class="content">

      <div class="menu-bar-container">
        <div class="menu-bar">

          <div class="dropdown" [class.open]="regionOpen">
            <div class="overlay" (click)="toggleRegionOpen()"></div>
            <div class="dropdown-button">
              <button (click)="toggleRegionOpen()">{{ getRegionName(region) }}<span class="down-arrow"></span></button>
            </div>
            <div class="dropdown-content rollout right">
              <ul class="group" *ngFor="let regions of regionsList">
                <li *ngFor="let reg of regions">
                  <button class="btn-link" [class.active]="reg === region" (click)="setRegion(reg)">
                    {{ getRegionName(reg) }}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div class="dropdown" [class.open]="displayModeOpen">
            <div class="overlay" (click)="toggleDisplayModeOpen()"></div>
            <div class="dropdown-button">
              <button (click)="toggleDisplayModeOpen()">
                {{ getDisplayModeName(region, displayMode) }}<span class="down-arrow"></span></button>
            </div>
            <div class="dropdown-content rollout right">
              <ul>
                <li *ngFor="let dm of displayModeList">
                  <button class="btn-link" [class.active]="displayMode === dm" (click)="setDisplayMode(dm)">
                    {{ getDisplayModeName(region, dm) }}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div class="empty"></div>

          <div class="dropdown" [class.open]="dateRangeOpen">
            <div class="overlay" (click)="toggleDateRangeOpen()"></div>
            <div class="dropdown-button">
              <button (click)="toggleDateRangeOpen()">This week + 7 days<span class="down-arrow"></span></button>
            </div>
            <div class="dropdown-content rollout">
              <ul class="group">
                <li>
                  <button class="btn-link">
                    This week <span>Sun Mar 25 - TODAY</span>
                  </button>
                </li>
                <li>
                  <button class="btn-link">
                    Last week <span>Sun Mar 18 - Mar 24</span>
                  </button>
                </li>
                <li>
                  <button class="btn-link">
                    Last 7 days <span>Mar 24 - TODAY</span>
                  </button>
                </li>
              </ul>
              <ul class="group">
                <li>
                  <button class="btn-link active">
                    This week + 7 days <span>Sun Mar 18 - TODAY</span>
                  </button>
                </li>
              </ul>
              <ul class="group">
                <li>
                  <button class="btn-link">
                    This month <span>Mar 1 - TODAY</span>
                  </button>
                </li>
                <li>
                  <button class="btn-link">
                    Last month <span>Feb 1 - Feb 28</span>
                  </button>
                </li>
                <li>
                  <button class="btn-link">
                    Last 28 days <span>Feb 28 - TODAY</span>
                  </button>
                </li>
                <li>
                  <button class="btn-link">
                    Last 30 days <span>Feb 26 - TODAY</span>
                  </button>
                </li>
              </ul>
              <ul class="group">
                <li>
                  <button class="btn-link">
                    This month + 2 months <span>Jan 1 - TODAY</span>
                  </button>
                </li>
                <li>
                  <button class="btn-link">
                    Last 90 days <span>Dec 28 - TODAY</span>
                  </button>
                </li>
              </ul>
              <ul class="group">
                <li>
                  <button class="btn-link">
                    This year <span>Jan 1 - TODAY</span>
                  </button>
                </li>
                <li>
                  <button class="btn-link">
                    Last 365 days <span>Mar 28, 2017 - TODAY</span>
                  </button>
                </li>
              </ul>
              <ul>
                <li>
                  <button class="btn-link">
                    Other...
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div class="dropdown">
            <div class="overlay"></div>
            <div class="dropdown-button icon">
              <button aria-label="Custom Date Range" class="btn-icon icon-calendar grey-dove"></button>
            </div>

          </div>
        </div>
        <div class="summary">
          <div class="date-range">
            <div class="label">in this range</div>
            <div class="range">Mar 18, 2018 ― Mar 30, 2018 <span>(13 days)</span></div>
          </div>
        </div>
      </div>

      <geochart-map-demo [region]="region" [displayMode]="displayMode" [data]="data"></geochart-map-demo>
      <geochart-table-demo [region]="region" [displayMode]="displayMode" [data]="data"
                           (country)="setRegionByCountryName($event)"></geochart-table-demo>
    </div>
  `,
  styleUrls: ['geochart-demo.component.css']
})

export class GeoChartDemoComponent {
  podcastImage = 'https://cms.prx.org/pub/a1ad85d9d9880fd74fc32c422d92bada/0/web/series_image/18175/medium/' +
    'TED_Talks_Podcast_Thumbnail_Audio.png';

  worldOptions = {
    world: ['markers', 'regions']
  };
  continentOptions = {
    '021': ['markers', 'regions'], // North America
    '005': ['markers', 'regions'], // South America
    '150': ['markers', 'regions'], // Europe
    '142': ['markers', 'regions'], // Asia
    '009': ['markers', 'regions'], // Oceania
    '002': ['markers', 'regions'], // Africa
  };
  countryOptions = {
    US: ['markers', 'metros', 'regions'],
    CA: ['markers', 'regions']
  };
  regionsList = [['world'], ['021', '005', '150', '142', '009', '002'], geoData.COUNTRIES.map(country => country.code)];

  region = 'world';
  displayMode = 'regions';
  data = geoData.DATA_WORLD_COUNTRY;

  regionOpen = false;
  displayModeOpen = false;
  dateRangeOpen = false;

  setRegion(region: any) {
    this.region = region;
    if (this.displayModeList.length <= 1) {
      this.displayMode = 'markers';
    }
    this.setData();
  }
  setDisplayMode(mode: any) {
    this.displayMode = mode;
    this.setData();
  }

  setData() {
    // TODO: US, Canada, UK, Australia all have states/provinces. Use city_name, subdivision_1_name for name
    switch (this.region) {
      case 'world':
        switch (this.displayMode) {
          case 'regions':
            this.data = geoData.DATA_WORLD_COUNTRY;
            break;
          case 'markers':
            this.data = geoData.DATA_WORLD_CITY;
            break;
        }
        break;
      case '021': // North America
        switch (this.displayMode) {
          case 'regions':
            this.data = geoData.DATA_NORTH_AMERICA_COUNTRY;
            break;
          case 'markers':
            this.data = geoData.DATA_NORTH_AMERICA_CITY;
            break;
        }
        break;
      case '005': // South America
        switch (this.displayMode) {
          case 'regions':
            this.data = geoData.DATA_SOUTH_AMERICA_COUNTRY;
            break;
          case 'markers':
            break;
        }
        break;
      case '150': // Europe
        switch (this.displayMode) {
          case 'regions':
            this.data = geoData.DATA_EUROPE_COUNTRY;
            break;
          case 'markers':
            this.data = geoData.DATA_EUROPE_CITY;
            break;
        }
        break;
      case '142': // Asia
        switch (this.displayMode) {
          case 'regions':
            this.data = geoData.DATA_ASIA_COUNTRY;
            break;
          case 'markers':
            break;
        }
        break;
      case '009': // Oceania
        switch (this.displayMode) {
          case 'regions':
            this.data = geoData.DATA_OCEANIA_COUNTRY;
            break;
          case 'markers':
            break;
        }
        break;
      case '002': // Africa
        switch (this.displayMode) {
          case 'regions':
            this.data = geoData.DATA_AFRICA_COUNTRY;
            break;
          case 'markers':
            break;
        }
        break;
      case 'US':
        switch (this.displayMode) {
          case 'regions':
            this.data = geoData.DATA_US_PROVINCE;
            break;
          case 'markers':
            this.data = geoData.DATA_US_CITY;
            break;
          case 'metros':
            this.data = geoData.DATA_US_METRO;
            break;
        }
        break;
      case 'CA':
        switch (this.displayMode) {
          case 'regions':
            this.data = geoData.DATA_CA_PROVINCE;
            break;
          case 'markers':
            this.data = geoData.DATA_CANADA_CITY;
            break;
        }
        break;
      case 'GB':
        this.data = geoData.DATA_UK_CITY;
        break;
      case 'AU':
        this.data = geoData.DATA_AUSTRALIA_CITY;
        break;
      case 'DE':
        this.data = geoData.DATA_GERMANY_CITY;
        break;
      case 'DK':
        this.data = geoData.DATA_DENMARK_CITY;
        break;
      case 'IE':
        this.data = geoData.DATA_IRELAND_CITY;
        break;
    }
  }

  toggleRegionOpen() {
    this.regionOpen = !this.regionOpen;
  }
  toggleDisplayModeOpen() {
    this.displayModeOpen = !this.displayModeOpen;
  }
  toggleDateRangeOpen() {
    this.dateRangeOpen = !this.dateRangeOpen;
  }

  getRegionName(region: string) {
    const country = geoData.COUNTRIES.find(c => c.code === region);
    if (country) {
      return country.name;
    }
    switch (region) {
      case 'world':
        return 'World';
      case '021':
        return 'North America';
      case '005':
        return 'South America';
      case '150':
        return 'Europe';
      case '142':
        return 'Asia';
      case '009':
        return 'Oceania';
      case '002':
        return 'Africa';
      default:
        return region;
    }
  }

  setRegionByCountryName(countryName: string) {
    const country = geoData.COUNTRIES.find(c => c.name === countryName);
    if (country) {
      this.setRegion(country.code);
    }
  }

  getDisplayModeName(region: string, mode: string) {
    if (mode === 'markers') {
      return 'Cities';
    } else if (mode === 'metros' && region === 'US') {
      return 'Metros';
    } else if (mode === 'regions' && region === 'US') {
      return 'States';
    } else if (mode === 'regions' && region === 'CA') {
      return 'Provinces';
    } else if (mode === 'regions') {
      return 'Countries';
    }
  }

  get displayModeList() {
    if (this.worldOptions[this.region]) {
      return this.worldOptions[this.region];
    } else if (this.continentOptions[this.region]) {
      return this.continentOptions[this.region];
    } else if (this.countryOptions[this.region]) {
      return this.countryOptions[this.region];
    } else {
      return ['markers'];
    }
  }
}
