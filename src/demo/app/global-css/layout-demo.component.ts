import {Component} from '@angular/core';

@Component({
  selector: 'reset-demo',
  template: `
    <h2>CSS layout</h2>
    <p class="desc">A style sheet used to create a global layout</p>
    <ul class="doc">
      <li>Charcoal background color and stripes image on <code>html</code></li>
      <li>White background on <code>body</code></li>
      <li>Grey color on <code>body</code></li>
      <li>1200px max-width on <code>body</code></li>
      <li>14px Font size on <code>body</code></li>
      <li>Open Sans, sans-serif font-family on <code>body</code></li>
      <li>1.5em line-height on <code>html</code></li>
      <li>1.5rem line-height on <code>body</code></li>
      <li>White smoke background on <code>main</code></li>
      <li>Top padding on <code>main</code> to make space for header nav</li>
      <li>1060px max-width on the <code>.main section</code> with additional horizontal margin and padding</li>
    </ul>
    <p>Example layout structure:</p>
    <!-- exported from Sketch file that lives on PRX Drive -->
    <svg width="1440px" height="1024px" viewBox="0 0 1440 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" 
         xmlns:xlink="http://www.w3.org/1999/xlink" style="background: #252525;">
      <!-- Generator: Sketch 44.1 (41455) - http://www.bohemiancoding.com/sketch -->
      <title>Desktop HD</title>
      <desc>Created with Sketch.</desc>
      <defs>
        <rect id="path-1" x="0" y="0" width="1440" height="1024"></rect>
        <pattern id="pattern-2" width="12.2647059" height="12.2647059" x="-12.2647059" y="-12.2647059" patternUnits="userSpaceOnUse">
          <use xlink:href="#image-3" transform="scale(0.255514706,0.255514706)"></use>
        </pattern>
        <image id="image-3" width="48" height="48" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAY
AAABXAvmHAAAAAXNSR0IArs4c6QAAAV9JREFUaAXt2O0NgjAQBmBrt4DoDiawEHEQB1F3MK7BHKxR+2oKQfnseXCX0B/SEr3zucZIz+R57nZ+OOfuZVmeMcW
aOEyWZVdjTBHicMW3aZpekMQnOyVJcqiq6hmSUq6Ig3iIyxnf+iRH7iSc8e1SleJCWGyvZsQboBlRA7QiWgCNiB+ANkQnQBOiF6AFMQjQgBgFSEdMAkhGTAZ
IRcwCSETMBkhDRAEkIaIBUhAkgAQEGbA2AgCDL0Edax2KrO8e3JCcCsDn10CgK/HQ2I0IZ+w9KucXBfo4mGJNHA79JfSBQhzO+FtfKFS567rEb2LrC3VV/vs
e507Uf2ScSQDiil8DOJOEHeFAtAAaET8AbYhOgCZEL0ALYhCgATEKkI6YBJCMmAyQipgFkIiYDZCGiAJIQkQDpCBIAAkIMmBtBAD/OMizPe+jQBh9j+JbX+h
Tn+a1r1K437wrfvYd/wV+UgblD/bGFgAAAABJRU5ErkJggg=="></image>
        <rect id="path-4" x="120" y="0" width="1200" height="1024"></rect>
        <rect id="path-5" x="120" y="74" width="1200" height="900"></rect>
        <rect id="path-6" x="120" y="193" width="1200" height="74"></rect>
        <pattern id="pattern-7" width="89" height="89" x="31" y="-16" patternUnits="userSpaceOnUse">
          <use xlink:href="#image-8"></use>
        </pattern>
        <image id="image-8" width="89" height="89" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFkAAABZCAI
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"></image>
      </defs>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Desktop-HD">
          <g id="Rectangle-2">
            <use fill="url(#pattern-2)" fill-rule="evenodd" xlink:href="#path-1"></use>
            <rect stroke="#979797" stroke-width="1" x="0.5" y="0.5" width="1439" height="1023"></rect>
          </g>
          <text id="&lt;HTML&gt;" font-family="ArialMT, Arial" font-size="24" font-weight="normal" 
                letter-spacing="2.39999986" fill="#FFFFFF">
            <tspan x="6.1183598" y="34">&lt;HTML&gt;</tspan>
          </text>
          <g id="Rectangle">
            <use fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-4"></use>
            <rect stroke="#979797" stroke-width="0" x="120.5" y="0.5" width="1199" height="1023"></rect>
          </g>
          <g id="Rectangle-4">
            <use fill="#f0f0f0" fill-rule="evenodd" xlink:href="#path-5"></use>
            <rect stroke="#979797" stroke-width="0" x="120.5" y="74.5" width="1199" height="899"></rect>
          </g>
          <text id="&lt;MAIN&gt;-&lt;ARTICLE&gt;-&lt;Ro" font-family="ArialMT, Arial" font-size="24" 
                font-weight="normal" letter-spacing="2.4" fill="#000000">
            <tspan x="400" y="322">&lt;MAIN&gt;</tspan>
            <tspan x="400" y="349">&nbsp;&nbsp;&lt;ARTICLE&gt;</tspan>
            <tspan x="400" y="376">&nbsp;&nbsp;&nbsp;&nbsp;&lt;</tspan><tspan 
              x="452.6875" y="376" font-family="Arial-ItalicMT, Arial" font-style="italic">Routed Component</tspan>
            <tspan x="699.224219" y="376">&gt;</tspan>
            <tspan x="400" y="403">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;SECTION class=“main”&gt;</tspan>
            <tspan x="400" y="430">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;…</tspan>
            <tspan x="400" y="457">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/SECTION&gt;</tspan>
            <tspan x="400" y="484">&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</tspan><tspan 
              x="461.755469" y="484" font-family="Arial-ItalicMT, Arial" font-style="italic">Routed Component</tspan>
            <tspan x="708.292187" y="484">&gt;</tspan>
            <tspan x="400" y="511">&nbsp;&nbsp;&lt;/ARTICLE&gt;</tspan>
            <tspan x="400" y="538">&lt;/MAIN&gt;</tspan>
          </text>
          <g id="Rectangle-6">
            <use fill="#FFFFFF" fill-rule="evenodd" xlink:href="#path-6"></use>
            <rect stroke="#979797" stroke-width="0" x="120.5" y="193.5" width="1199" height="73"></rect>
          </g>
          <text id="Article-title-Status" font-family="ArialMT, Arial" font-size="26" font-weight="normal" 
                letter-spacing="2.4000001" fill="#4A4A4A">
            <tspan x="220" y="234">Article title</tspan>
            <tspan x="220" y="264" font-size="14">Status information</tspan>
          </text>
          <rect id="Rectangle-7" fill="#368AA2" x="1120" y="210" width="100" height="38"></rect>
          <text id="Action" font-family="ArialMT, Arial" font-size="14" font-weight="normal" 
                letter-spacing="2.4000001" fill="#FFFFFF">
            <tspan x="1143" y="234">Action</tspan>
          </text>
          <rect id="Rectangle-3" fill="#FFFFFF" x="120" y="0" width="1200" height="73"></rect>
          <text id="&lt;PRX-FOOTER&gt;" font-family="ArialMT, Arial" font-size="24" font-weight="normal" 
                letter-spacing="2.4" fill="#000000">
            <tspan x="400.416406" y="1012">&lt;PRX-FOOTER&gt;</tspan>
          </text>
          <rect id="Rectangle-5" fill="url(#pattern-7)" x="120" y="73" width="1200" height="120"></rect>
          <text id="Page-Title" font-family="ArialMT, Arial" font-size="40" font-weight="normal" 
                letter-spacing="2.4000001" fill="#FFFFFF">
            <tspan x="220" y="143">Page Title</tspan>
          </text>
          <text id="&lt;PRX-HERO&gt;" font-family="ArialMT, Arial" font-size="24" font-weight="normal" 
                letter-spacing="2.4000001" fill="#FFFFFF">
            <tspan x="600" y="107">&lt;PRX-HERO</tspan>
            <tspan x="762.295313" y="107">&gt;</tspan>
          </text>
          <text id="&lt;PRX-HEADER&gt;" font-family="ArialMT, Arial" font-size="24" font-weight="normal" 
                letter-spacing="2.4" fill="#000000">
            <tspan x="400.404687" y="43">&lt;PRX-HEADER&gt;</tspan>
          </text>
          <g id="ic_header_logo" transform="translate(220.000000, 18.000000)" fill-rule="nonzero">
            <path d="M90.6325,18.72 C90.6325,10.6275 85.4475,4.549 82.156,1.5035 L81.5225,2.3715 C83.719,5.9915 86.924,
12.3165 86.924,18.4315 C86.924,23.8165 83.8075,29.3675 81.287,32.9745 L82.0585,34.0165 C85.721,30.8465 90.6325,
25.3555 90.6325,18.719 L90.6325,18.72 Z M99.9765,18.72 C99.9765,10.6275 94.7905,4.549 91.4985,1.5035 L90.8655,
2.3715 C93.063,5.9915 96.2665,12.3165 96.2665,18.4315 C96.2665,23.8165 93.1515,29.3675 90.6315,32.9745 L91.4035,
34.0165 C95.065,30.8465 99.977,25.3555 99.977,18.719 L99.9765,18.72 Z" id="Shape" fill="#799EA6"></path>
            <path d="M7.4815,23.7415 L7.4815,3.2965 C2.9535,6.511 0,11.791 0,17.761 C0,23.731 2.9535,29.012 7.4815,
32.227 L7.4815,23.7415 Z M39.346,1.4975 C41.2445,1.4975 42.83,1.6325 44.0975,1.9025 C45.3615,2.17 46.5,2.655 47.5165,
3.3485 C48.654,4.135 49.5455,5.1285 50.1905,6.3215 C50.8295,7.5145 51.1455,9.2265 51.1455,11.0615 C51.1455,
13.5455 50.5805,15.845 49.4455,17.518 C48.3055,19.1915 46.744,20.1765 44.7505,21.023 L52.5015,31.2055 L60.9565,
17.7615 C60.9565,17.7615 54.6375,7.373 52.4245,4.2475 C49.2136581,1.51437354 45.1330676,0.016419537 40.9165,
0.023 C38.3915,0.023 35.99,0.55 33.815,1.498 L39.346,1.498 L39.346,1.4975 Z" id="Shape" fill="#EF8E1B"></path>
            <path d="M75.563,4.235 L67.223,17.762 L75.7305,31.139 C79.4705,27.8865 81.833,23.099 81.833,17.759 C81.833,
12.339 79.399,7.4885 75.563,4.234 L75.563,4.235 Z" id="Shape" fill="#799EA6"></path>
            <path d="M64.0665,13.887 L71.13,1.478 C68.9002541,0.513207541 66.496023,0.0169423966 64.0665,0.02 C61.66,
0.02 59.365,0.4985 57.2715,1.365 L64.0665,13.887 Z M46.7315,11.262 C46.734,10.278 46.5795,9.4045 46.263,8.6405 C45.948,
7.874 45.421,7.2275 44.693,6.7045 C44.083,6.256 43.3645,5.9405 42.533,5.7595 C41.7,5.582 40.72,5.488 39.5915,
5.4835 L34.6515,5.4645 L34.6515,18.445 L38.8415,18.46 C40.1685,18.465 41.325,18.3465 42.3175,18.09 C43.3025,
17.84 44.1475,17.373 44.8445,16.682 C45.4734774,16.0537311 45.9565581,15.2947994 46.2595,14.459 C46.5675,13.622 46.7245,
12.56 46.731,11.262 L46.7315,11.262 Z M64.0665,21.6175 L56.409,33.769 C58.8001978,34.9102841 61.4169072,
35.5007736 64.0665,35.497 C66.7811903,35.501 69.4604853,34.8810431 71.8975,33.685 L64.0665,21.6175 Z M40.612,
22.359 L34.72,22.359 L34.72,34.391 C36.7029434,35.1268476 38.8014278,35.5024176 40.9165,35.5 C43.8265,35.5 46.5725,
34.8015 48.9965,33.563 L40.6115,22.359 L40.612,22.359 Z M30.8035,3.1765 C30.2968691,3.52737781 29.8087176,
3.90421411 29.341,4.3055 C26.1207573,1.53676098 22.0128617,0.0172832291 17.766,0.024 C15.2813015,0.020682042 12.8236575,
0.539739472 10.5525,1.5475 L16.3725,1.569 C18.2695,1.5775 19.8545,1.7165 21.121,1.9925 C22.3845,2.2675 23.523,
2.755 24.536,3.4525 C25.6483481,4.22018522 26.5599383,5.24392364 27.194,6.4375 C27.832,7.6295 28.144,9.1455 28.1375,
10.9825 C28.1275,13.4625 27.54,15.545 26.5635,17.311 C26.0545,18.231 25.4155,19.127 24.6235,19.786 C23.876,
20.407 22.966,20.963 21.4125,21.571 C19.7435,22.229 17.5575,22.311 17.5575,22.311 L11.6675,22.2895 L11.6675,
34.428 C13.6215218,35.1397183 15.6853997,35.5025682 17.765,35.5 C22.0118696,35.5067613 26.1197802,
33.987278 29.34,31.2185 C29.8076901,31.6196638 30.2958439,31.996335 30.8025,32.347 L30.8025,
3.177 L30.8035,3.1765 Z" id="Shape" fill="#EF8E1B"></path>
            <path d="M21.921,16.69 C22.5504383,16.061716 23.0338747,15.3025912 23.337,14.4665 C23.6445,13.6295 23.802,
12.568 23.8085,11.2695 C23.8105,10.2845 23.6565,9.412 23.3395,8.6475 C23.0245,7.881 22.497,7.234 21.7695,
6.7115 C21.1595,6.263 20.4405,5.9475 19.6095,5.7665 C18.7765,5.5885 17.796,5.495 16.6675,5.4905 L11.681,5.4715 L11.681,
18.4515 L15.918,18.4675 C17.2445,18.4725 18.4015,18.354 19.394,18.0975 C20.379,17.8475 21.224,17.3805 21.92,
16.6895 L21.921,16.69 Z" id="Shape" fill="#EF8E1B"></path>
          </g>
          <path d="M120,73 L1320,73" id="Line" stroke="#979797" stroke-linecap="square"></path>
        </g>
      </g>
    </svg>
  `
})

export class LayoutDemoComponent {}
