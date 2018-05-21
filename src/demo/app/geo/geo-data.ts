export const COUNTRIES = [
  {code: 'US', name: 'United States'},
  {code: 'CA', name: 'Canada'},
  {code: 'GB', name: 'United Kingdom'},
  {code: 'AU', name: 'Australia'},
  {code: 'DE', name: 'Germany'},
  {code: 'DK', name: 'Denmark'},
  {code: 'IE', name: 'Ireland'}
];

export const US_STATES = [
  {code: 'US-CA', name: 'California'},
  {code: 'US-NY', name: 'New York'},
  {code: 'US-WA', name: 'Washington'},
  {code: 'US-TX', name: 'Texas'},
  {code: 'US-MA', name: 'Massachusetts'},
  {code: 'US-IL', name: 'Illinois'},
  {code: 'US-OR', name: 'Oregon'},
  {code: 'US-PA', name: 'Pennsylvania'},
  {code: 'US-MD', name: 'Maryland'},
  {code: 'US-CO', name: 'Colorado'},
  {code: 'US-FL', name: 'Florida'},
  {code: 'US-VA', name: 'Virginia'},
  {code: 'US-NJ', name: 'New Jersey'},
  {code: 'US-NC', name: 'North Carolina'},
  {code: 'US-MN', name: 'Minnesota'},
  {code: 'US-MI', name: 'Michigan'},
  {code: 'US-GA', name: 'Georgia'},
  {code: 'US-WI', name: 'Wisconsin'},
  {code: 'US-AZ', name: 'Arizona'},
  {code: 'US-DC', name: 'District of Columbia'},
  {code: 'US-OH', name: 'Ohio'},
  {code: 'US-UT', name: 'Utah'},
  {code: 'US-TN', name: 'Tennessee'},
  {code: 'US-ME', name: 'Maine'},
  {code: 'US-MO', name: 'Missouri'},
  {code: 'US-ID', name: 'Idaho'},
  {code: 'US-CT', name: 'Connecticut'},
  {code: 'US-MT', name: 'Montana'},
  {code: 'US-IN', name: 'Indiana'},
  {code: 'US-LA', name: 'Louisiana'},
  {code: 'US-VT', name: 'Vermont'},
  {code: 'US-AL', name: 'Alabama'},
  {code: 'US-KS', name: 'Kansas'},
  {code: 'US-KY', name: 'Kentucky'},
  {code: 'US-AR', name: 'Arkansas'},
  {code: 'US-NE', name: 'Nebraska'},
  {code: 'US-NV', name: 'Nevada'},
  {code: 'US-NM', name: 'New Mexico'},
  {code: 'US-WY', name: 'Wyoming'},
  {code: 'US-IA', name: 'Iowa'},
  {code: 'US-AK', name: 'Alaska'},
  {code: 'US-RI', name: 'Rhode Island'},
  {code: 'US-SC', name: 'South Carolina'},
  {code: 'US-NH', name: 'New Hampshire'},
  {code: 'US-OK', name: 'Oklahoma'},
  {code: 'US-HI', name: 'Hawaii'},
  {code: 'US-WV', name: 'West Virginia'},
  {code: 'US-DE', name: 'Delaware'},
  {code: 'US-SD', name: 'South Dakota'},
  {code: 'US-ND', name: 'North Dakota'},
  {code: 'US-MS', name: 'Mississippi'}
];

export const CA_PROVINCES = [
  {code: 'CA-ON', name: 'Ontario'},
  {code: 'CA-BC', name: 'British Columbia'},
  {code: 'CA-QC', name: 'Quebec'},
  {code: 'CA-AB', name: 'Alberta'},
  {code: 'CA-NB', name: 'New Brunswick'},
  {code: 'CA-NS', name: 'Nova Scotia'},
  {code: 'CA-MB', name: 'Manitoba'},
  {code: 'CA-SK', name: 'Saskatchewan'},
  {code: 'CA-NL', name: 'Newfoundland and Labrador'},
  {code: 'CA-PE', name: 'Prince Edward Island'},
  {code: 'CA-YT', name: 'Yukon'},
  {code: 'CA-NT', name: 'Northwest Territories'},
  {code: 'CA-NU', name: 'Nunavut'}
];

/*

 */
export const DATA_US_METRO = [
  ['Metro', 'Downloads'],
  ['807 - California', 26789],
  ['501 - New York', 26565],
  ['803 - California', 17993],
  ['557 - Tennessee', 11827],
  ['506 - Massachusetts', 11695],
  ['511 - Virginia', 9849],
  ['819 - Washington', 9190],
  ['602 - Illinois', 8806],
  ['523 - Vermont', 8391],
  ['592 - Florida', 7960],
  ['855 - California', 7128],
  ['618 - Texas', 5262],
  ['753 - Arizona', 5006],
  ['613 - Minnesota', 4997],
  ['820 - Oregon', 4475],
  ['751 - Colorado', 4059],
  ['504 - Pennsylvania', 4043],
  ['862 - California', 3115],
  ['511 - District of Columbia', 3088],
  ['505 - Michigan', 2911],
  ['524 - Georgia', 2863],
  ['635 - Texas', 2702],
  ['528 - Florida', 2345],
  ['501 - New Jersey', 2339],
  ['623 - Texas', 2310],
  ['609 - Missouri', 2210],
  ['533 - Connecticut', 2111],
  ['548 - Florida', 2024],
  ['770 - Utah', 1984],
  ['534 - Florida', 1869],
  ['511 - Maryland', 1866],
  ['810 - Oregon', 1778],
  ['652 - Nebraska', 1640],
  ['508 - Pennsylvania', 1560],
  ['617 - Wisconsin', 1513],
  ['555 - New York', 1502],
  ['560 - North Carolina', 1310],
  ['825 - California', 1238],
  ['659 - Tennessee', 1194],
  ['556 - Virginia', 1136],
  ['517 - North Carolina', 1114],
  ['510 - Ohio', 1103],
  ['725 - South Dakota', 1071],
  ['512 - Maryland', 1048],
  ['669 - Wisconsin', 982],
  ['801 - Oregon', 904],
  ['521 - Rhode Island', 889],
  ['527 - Indiana', 882],
  ['539 - Florida', 880],
  ['839 - Nevada', 868],
  ['514 - New York', 843]
];

/*
 SELECT subdivision_1_name, country_name, count(*) as count
 FROM [prx-metrics:production.downloads] d
 join [prx-metrics:production.geonames] g on d.city_id=g.geoname_id
 WHERE d._PARTITIONTIME >= TIMESTAMP("2018-03-21") and d._PARTITIONTIME <= TIMESTAMP("2018-03-27")
 and feeder_podcast=93 and country_name='United States'
 group by subdivision_1_name, country_name
 order by count desc
 LIMIT 51
 */
export const DATA_US_PROVINCE = [
  ['State', 'Downloads'],
  ['California', 57831],
  ['New York', 29773],
  ['Florida', 16043],
  ['Tennessee', 13615],
  ['Massachusetts', 12335],
  ['Virginia', 12143],
  ['Texas', 11282],
  ['Washington', 9917],
  ['Illinois', 9255],
  ['Vermont', 8530],
  ['Oregon', 7385],
  ['Pennsylvania', 6298],
  ['Minnesota', 5307],
  ['Arizona', 5192],
  ['Colorado', 4389],
  ['Michigan', 3892],
  ['Missouri', 3718],
  ['North Carolina', 3600],
  ['Georgia', 3583],
  ['District of Columbia', 3088],
  ['Ohio', 2945],
  ['Maryland', 2938],
  ['New Jersey', 2889],
  ['Wisconsin', 2849],
  ['Connecticut', 2356],
  ['Utah', 1984],
  ['Nebraska', 1776],
  ['Indiana', 1729],
  ['Kentucky', 1264],
  ['Nevada', 1248],
  ['Alabama', 1184],
  ['South Carolina', 1171],
  ['South Dakota', 1074],
  ['Rhode Island', 889],
  ['Kansas', 836],
  ['Louisiana', 762],
  ['Iowa', 733],
  ['Oklahoma', 598],
  ['Hawaii', 596],
  ['Maine', 591],
  ['Arkansas', 575],
  ['New Mexico', 478],
  ['New Hampshire', 451],
  ['Idaho', 425],
  ['Mississippi', 380],
  ['Delaware', 367],
  ['Alaska', 354],
  ['Montana', 256],
  ['North Dakota', 226],
  ['Wyoming', 81],
  ['West Virginia', 75]
];


// export const DATA_US_PROVINCE = [DATA_US_PROVINCE_RAW[0]].concat(DATA_US_PROVINCE_RAW.slice(1)
//  .filter(entry => US_STATES.find(state => state.name === entry[0].toString().split(', ')[0]))
//  .map(entry => [US_STATES.find(state => state.name === entry[0].toString().split(', ')[0]).code, entry[1]]));


/*
 SELECT subdivision_1_name, country_name, count(*) as count FROM [prx-metrics:production.downloads] d
 join [prx-metrics:production.geonames] g on d.city_id=g.geoname_id
 WHERE d._PARTITIONTIME >= TIMESTAMP("2018-03-21") and d._PARTITIONTIME <= TIMESTAMP("2018-03-27")
 and feeder_podcast=93 and country_name='Canada'
 group by subdivision_1_name, country_name
 order by count desc
 */
export const DATA_CA_PROVINCE = [
  ['Province', 'Downloads'],
  ['Ontario', 11543],
  ['British Columbia', 4519],
  ['Alberta', 1455],
  ['Quebec', 1423],
  ['Nova Scotia', 315],
  ['Manitoba', 292],
  ['Saskatchewan', 271],
  ['New Brunswick', 173],
  ['Yukon', 18],
  ['Prince Edward Island', 11],
  ['Newfoundland and Labrador', 10],
  ['Nunavut', 1],
  ['Northwest Territories', 1]
];

// export const DATA_CA_PROVINCE = [DATA_CA_PROVINCE_RAW[0]].concat(DATA_CA_PROVINCE_RAW.slice(1)
//  .filter(entry => CA_PROVINCES.find(state => state.name === <string>entry[0].toString().split(', ')[0]))
//  .map(entry => [CA_PROVINCES.find(state => state.name === <string>entry[0].toString().split(', ')[0]).code, entry[1]]));

/*
 SELECT city_name, subdivision_1_name, country_name, count(*) as count FROM [prx-metrics:production.downloads] d
 join [prx-metrics:production.geonames] g on d.city_id=g.geoname_id
 WHERE d._PARTITIONTIME >= TIMESTAMP("2018-03-21")
 and d._PARTITIONTIME <= TIMESTAMP("2018-03-27")
 and feeder_podcast=93 and country_name='United States'
 group by city_name, subdivision_1_name, country_name
 order by count desc
 LIMIT 50
 */
export const DATA_US_CITY = [
  ['City', 'Downloads'],
  ['Knoxville, Tennessee', 9127],
  ['Burlington, Vermont', 7959],
  ['Archer, Florida', 7669],
  ['Astoria, New York', 6981],
  ['Santa Barbara, California', 6704],
  ['Brighton, Massachusetts', 6074],
  ['New York, New York', 6036],
  ['Brooklyn, New York', 5360],
  ['Ashburn, Virginia', 5298],
  ['San Francisco, California', 4864],
  ['Chicago, Illinois', 4571],
  ['Los Angeles, California', 4471],
  ['Seattle, Washington', 3750],
  ['Phoenix, Arizona', 3376],
  ['Santa Clara, California', 3095],
  ['Portland, Oregon', 2605],
  ['Washington, District of Columbia', 2432],
  ['Houston, Texas', 2214],
  ['Oakland, California', 2202],
  ['Denver, Colorado', 1767],
  ['Kent, Washington', 1718],
  ['Sevierville, Tennessee', 1696],
  ['St Louis, Missouri', 1651],
  ['Minneapolis, Minnesota', 1600],
  ['Omaha, Nebraska', 1591],
  ['Boardman, Oregon', 1495],
  ['Austin, Texas', 1438],
  ['Miami, Florida', 1425],
  ['Philadelphia, Pennsylvania', 1405],
  ['Boston, Massachusetts', 1401],
  ['Atlanta, Georgia', 1318],
  ['Anaheim, California', 1274],
  ['Orlando, Florida', 1250],
  ['Saint Paul, Minnesota', 1227],
  ['Hayward, California', 1157],
  ['Arlington, Virginia', 1129],
  ['Milwaukee, Wisconsin', 1036],
  ['Stockton, California', 998],
  ['Yonkers, New York', 993],
  ['Richmond, Virginia', 909],
  ['Bellevue, Washington', 829],
  ['Pittsburgh, Pennsylvania', 788],
  ['Las Vegas, Nevada', 783],
  ['McHenry, Illinois', 754],
  ['Hartford, Connecticut', 733],
  ['San Mateo, California', 718],
  ['Humble, Texas', 714],
  ['Durham, North Carolina', 671],
  ['The Bronx, New York', 668],
  ['Sacramento, California', 654]
];

/*
 SELECT city_name, subdivision_1_name, count(*) as count FROM [prx-metrics:production.downloads] d
 join [prx-metrics:production.geonames] g on d.city_id=g.geoname_id
 WHERE d._PARTITIONTIME >= TIMESTAMP("2018-03-21")
 and d._PARTITIONTIME <= TIMESTAMP("2018-03-27")
 and feeder_podcast=93 and country_name='Canada'
 group by city_name, subdivision_1_name, country_name
 order by count desc
 LIMIT 50
 */
export const DATA_CANADA_CITY = [
  ['City', 'Downloads'],
  ['Toronto,Ontario', 4856],
  ['Vancouver,British Columbia', 1702],
  ['Waterloo,Ontario', 1411],
  ['Montreal,Quebec', 1012],
  ['Maple Ridge,British Columbia', 879],
  ['Markham,Ontario', 830],
  ['Ottawa,Ontario', 808],
  ['Calgary,Alberta', 788],
  ['Burlington,Ontario', 450],
  ['Mississauga,Ontario', 445],
  ['Edmonton,Alberta', 417],
  ['Victoria,British Columbia', 383],
  ['Barrie,Ontario', 330],
  ['Scarborough,Ontario', 305],
  ['Windsor,Ontario', 212],
  ['Halifax,Nova Scotia', 206],
  ['Winnipeg,Manitoba', 199],
  ['Surrey,British Columbia', 193],
  ['Saskatoon,Saskatchewan', 167],
  ['North Vancouver,British Columbia', 155],
  ['Burnaby,British Columbia', 154],
  ['Kitchener,Ontario', 153],
  ['Brampton,Ontario', 138],
  ['London,Ontario', 129],
  ['Laval,Quebec', 108],
  ['Hamilton,Ontario', 103],
  ['Pembroke,Ontario', 100],
  ['Township of Langley,British Columbia', 99],
  ['Okotoks,Alberta', 96],
  ['Newmarket,Ontario', 96],
  ['Chilliwack,British Columbia', 90],
  ['Guelph,Ontario', 89],
  ['Kingston,Ontario', 86],
  ['Penticton,British Columbia', 85],
  ['Cranbrook,British Columbia', 71],
  ['Oshawa,Ontario', 69],
  ['Coquitlam,British Columbia', 62],
  ['Québec,Quebec', 60],
  ['Richmond,British Columbia', 60],
  ['Scoudouc,New Brunswick', 53],
  ['Deep River,Ontario', 50],
  ['Whistler,British Columbia', 47],
  ['New Westminster,British Columbia', 46],
  ['Saint John,New Brunswick', 45],
  ['York,Ontario', 42],
  ['Nanaimo,British Columbia', 42],
  ['Kelowna,British Columbia', 40],
  ['Golden,British Columbia', 39],
  ['Regina,Saskatchewan', 38],
  ['Sault Ste. Marie,Ontario', 38]
];

/*
 SELECT city_name, subdivision_1_name, country_name, count(*) as count FROM [prx-metrics:production.downloads] d
 join [prx-metrics:production.geonames] g on d.city_id=g.geoname_id
 WHERE d._PARTITIONTIME >= TIMESTAMP("2018-03-21") and d._PARTITIONTIME <= TIMESTAMP("2018-03-27")
 and feeder_podcast=93 and continent_code='NA'
 group by city_name, subdivision_1_name, country_name
 order by count desc
 LIMIT 50
 */
export const DATA_NORTH_AMERICA_CITY = [
  ['City', 'Downloads'],
  ['Knoxville, Tennessee', 9181],
  ['Burlington, Vermont', 7969],
  ['Archer, Florida', 7669],
  ['New York, New York', 7098],
  ['Astoria, New York', 6996],
  ['Santa Clara, California', 6975],
  ['Santa Barbara, California', 6730],
  ['Brooklyn, New York', 6613],
  ['Ashburn, Virginia', 6548],
  ['Los Angeles, California', 6353],
  ['Brighton, Massachusetts', 6183],
  ['San Francisco, California', 5692],
  ['Chicago, Illinois', 5398],
  ['Toronto, Ontario', 4856],
  ['Seattle, Washington', 4515],
  ['Phoenix, Arizona', 4127],
  ['Portland, Oregon', 3288],
  ['Houston, Texas', 3191],
  ['Washington, District of Columbia', 3088],
  ['San Jose, California', 3018],
  ['Oakland, California', 2791],
  ['Denver, Colorado', 2532],
  ['Minneapolis, Minnesota', 2003],
  ['Sevierville, Tennessee', 1926],
  ['Saint Paul, Minnesota', 1880],
  ['Boardman, Oregon', 1775],
  ['Kent, Washington', 1770],
  ['St Louis, Missouri', 1770],
  ['Vancouver, British Columbia', 1702],
  ['Lake Worth, Florida', 1693],
  ['Philadelphia, Pennsylvania', 1688],
  ['Boston, Massachusetts', 1639],
  ['Omaha, Nebraska', 1632],
  ['Austin, Texas', 1619],
  ['Yonkers, New York', 1609],
  ['Miami, Florida', 1466],
  ['Anaheim, California', 1452],
  ['Atlanta, Georgia', 1420],
  ['Waterloo, Ontario', 1411],
  ['Stockton, California', 1374],
  ['Hayward, California', 1360],
  ['Orlando, Florida', 1328],
  ['Arlington, Virginia', 1237],
  ['Milwaukee, Wisconsin', 1150],
  ['Pittsburgh, Pennsylvania', 1046],
  ['Sioux Falls, South Dakota', 1043],
  ['Montreal, Quebec', 1012],
  ['Humble, Texas', 995],
  ['Richmond, Virginia', 975],
  ['Bellevue, Washington', 933]
];


/*
 SELECT city_name, subdivision_1_name, country_name, count(*) as count FROM [prx-metrics:production.downloads] d
 join [prx-metrics:production.geonames] g on d.city_id=g.geoname_id
 WHERE d._PARTITIONTIME >= TIMESTAMP("2018-03-21") and d._PARTITIONTIME <= TIMESTAMP("2018-03-27")
 and feeder_podcast=93
 group by city_name, subdivision_1_name, country_name
 order by count desc
 LIMIT 50
 */
export const DATA_WORLD_CITY = [
  ['City', 'Downloads'],
  ['Knoxville, Tennessee', 9181],
  ['Burlington, Vermont', 7969],
  ['Archer, Florida', 7669],
  ['New York, New York', 7098],
  ['Astoria, New York', 6996],
  ['Santa Clara, California', 6975],
  ['Santa Barbara, California', 6730],
  ['Brooklyn, New York', 6613],
  ['Ashburn, Virginia', 6548],
  ['Los Angeles, California', 6353],
  ['Brighton, Massachusetts', 6183],
  ['San Francisco, California', 5692],
  ['Chicago, Illinois', 5398],
  ['Toronto, Ontario', 4856],
  ['Seattle, Washington', 4515],
  ['Phoenix, Arizona', 4127],
  ['London, England', 4113],
  ['Melbourne, Victoria', 3622],
  ['Portland, Oregon', 3288],
  ['Houston, Texas', 3191],
  ['Washington, District of Columbia', 3088],
  ['San Jose, California', 3018],
  ['Oakland, California', 2791],
  ['Denver, Colorado', 2532],
  ['Minneapolis, Minnesota', 2003],
  ['Sevierville, Tennessee', 1926],
  ['Saint Paul, Minnesota', 1880],
  ['Boardman, Oregon', 1775],
  ['Kent, Washington', 1770],
  ['St Louis, Missouri', 1770],
  ['Vancouver, British Columbia', 1702],
  ['Lake Worth, Florida', 1693],
  ['Philadelphia, Pennsylvania', 1688],
  ['Boston, Massachusetts', 1639],
  ['Omaha, Nebraska', 1632],
  ['Austin, Texas', 1619],
  ['Yonkers, New York', 1609],
  ['Copenhagen, Denmark', 1588],
  ['Dublin, Ireland', 1554],
  ['Birmingham, England', 1509],
  ['Miami, Florida', 1466],
  ['Anaheim, California', 1452],
  ['Atlanta, Georgia', 1420],
  ['Waterloo, Ontario', 1411],
  ['Stockton, California', 1374],
  ['Hayward, California', 1360],
  ['Orlando, Florida', 1328],
  ['Arlington, Virginia', 1237],
  ['Milwaukee, Wisconsin', 1150],
  ['Pittsburgh, Pennsylvania', 1046]
];

/*
 SELECT country_name, count(*) as count FROM [prx-metrics:production.downloads] d
 join [prx-metrics:production.geonames] g on d.city_id=g.geoname_id
 WHERE d._PARTITIONTIME >= TIMESTAMP("2018-03-21") and d._PARTITIONTIME <= TIMESTAMP("2018-03-27")
 and feeder_podcast=93
 group by country_name
 order by count desc
 LIMIT 50
 */
export const DATA_WORLD_COUNTRY = [
  ['Country', 'Downloads'],
  ['United States', 261256],
  ['United Kingdom', 20714],
  ['Canada', 20032],
  ['Australia', 16680],
  ['Germany', 2925],
  ['Denmark', 2846],
  ['Ireland', 2215],
  ['New Zealand', 2155],
  ['Sweden', 1606],
  ['Netherlands', 1353],
  ['Brazil', 1320],
  ['Japan', 1203],
  ['Mexico', 1120],
  ['Spain', 1093],
  ['Norway', 1050],
  ['France', 1003],
  ['South Africa', 930],
  ['China', 916],
  ['Belgium', 872],
  ['Switzerland', 822],
  ['India', 616],
  ['Russia', 566],
  ['Italy', 531],
  ['Iceland', 489],
  ['Taiwan', 486],
  ['Republic of Korea', 448],
  ['Hong Kong', 439],
  ['Singapore', 413],
  ['Israel', 379],
  ['Thailand', 369],
  ['Iraq', 325],
  ['Argentina', 300],
  ['Austria', 260],
  ['Philippines', 237],
  ['Malaysia', 219],
  ['United Arab Emirates', 196],
  ['Finland', 193],
  ['Vietnam', 181],
  ['Czechia', 163],
  ['Peru', 157],
  ['Chile', 152],
  ['Portugal', 145],
  ['Trinidad and Tobago', 143],
  ['Kazakhstan', 136],
  ['Ukraine', 134],
  ['Ecuador', 130],
  ['Turkey', 123],
  ['Costa Rica', 118],
  ['Indonesia', 117],
  ['Colombia', 111]
];

/*
 SELECT country_name, count(*) as count FROM [prx-metrics:production.downloads] d
 join [prx-metrics:production.geonames] g on d.city_id=g.geoname_id
 WHERE d._PARTITIONTIME >= TIMESTAMP("2018-03-21") and d._PARTITIONTIME <= TIMESTAMP("2018-03-27")
 and feeder_podcast=93 and continent_code='EU'
 group by country_name
 order by count desc
 LIMIT 50
 */
export const DATA_EUROPE_COUNTRY = [
  ['Country', 'Downloads'],
  ['United Kingdom', 20714],
  ['Germany', 2925],
  ['Denmark', 2846],
  ['Ireland', 2215],
  ['Sweden', 1606],
  ['Netherlands', 1353],
  ['Spain', 1093],
  ['Norway', 1050],
  ['France', 1003],
  ['Belgium', 872],
  ['Switzerland', 822],
  ['Russia', 566],
  ['Italy', 531],
  ['Iceland', 489],
  ['Austria', 260],
  ['Finland', 193],
  ['Czechia', 163],
  ['Portugal', 145],
  ['Ukraine', 134],
  ['Poland', 83],
  ['Hungary', 75],
  ['Republic of Lithuania', 63],
  ['Romania', 60],
  ['Luxembourg', 52],
  ['Belarus', 46],
  ['Greece', 44],
  ['Serbia', 32],
  ['Slovak Republic', 24],
  ['Slovenia', 24],
  ['Guernsey', 23],
  ['Estonia', 20],
  ['Croatia', 15],
  ['Andorra', 14],
  ['Latvia', 13],
  ['Bosnia and Herzegovina', 10],
  ['Jersey', 7],
  ['Bulgaria', 5],
  ['Republic of Moldova', 5],
  ['Macedonia', 5],
  ['Cyprus', 4],
  ['Malta', 4],
  ['Monaco', 4]
];

/*
 SELECT city_name, subdivision_1_name, country_name, count(*) as count FROM [prx-metrics:production.downloads] d
 join [prx-metrics:production.geonames] g on d.city_id=g.geoname_id
 WHERE d._PARTITIONTIME >= TIMESTAMP("2018-03-21") and d._PARTITIONTIME <= TIMESTAMP("2018-03-27")
 and feeder_podcast=93 and continent_code='EU'
 group by city_name, subdivision_1_name, country_name
 order by count desc
 LIMIT 50
 */
export const DATA_EUROPE_CITY = [
  ['City', 'Downloads'],
  ['London, England', 4113],
  ['Copenhagen, Denmark', 1588],
  ['Dublin, Ireland', 1554],
  ['Birmingham, England', 1509],
  ['Berlin, Germany', 962],
  ['Brighton, England', 792],
  ['Oslo, Norway', 583],
  ['Islington, England', 552],
  ['Glasgow, Scotland', 537],
  ['Zurich, Switzerland', 503],
  ['Brussels, Belgium', 498],
  ['Aylesbury, England', 466],
  ['Amsterdam, Netherlands', 450],
  ['Reykjavik, Iceland', 445],
  ['Hackney, United Kingdom', 440],
  ['Stockholm, Sweden', 396],
  ['Moscow, Russia', 360],
  ['Nottingham, England', 328],
  ['Manchester, England', 313],
  ['Basildon, England', 308],
  ['Aarhus, Denmark', 301],
  ['Bronshoj, Denmark', 298],
  ['Covent Garden, England', 297],
  ['Lucan, Ireland', 286],
  ['Belfast, Northern Ireland', 281],
  ['Surbiton, England', 268],
  ['Bristol, England', 264],
  ['Pasian di Prato, Italy', 263],
  ['A Coruña, Spain', 253],
  ['Vienna, Austria', 235],
  ['Liverpool, England', 233],
  ['Paris, France', 228],
  ['Arnouville, France', 212],
  ['Kingston, England', 211],
  ['Barnet, England', 203],
  ['Cambridge, England', 203],
  ['Hamburg, Germany', 198],
  ['Roehampton, England', 196],
  ['Schiphol-Rijk, Netherlands', 195],
  ['Stockport, England', 192],
  ['Murcia, Spain', 184],
  ['Potsdam, Germany', 183],
  ['Madrid, Spain', 179],
  ['Frankfurt am Main, Germany', 163],
  ['Tadley, England', 152],
  ['Prague, Czechia', 152],
  ['Hindhead, England', 151],
  ['Loughton, England', 148],
  ['Thornton Heath, England', 137],
  ['Rochester, England', 136]
];

/*
 SELECT city_name, subdivision_1_name, count(*) as count FROM [prx-metrics:production.downloads] d
 join [prx-metrics:production.geonames] g on d.city_id=g.geoname_id
 WHERE d._PARTITIONTIME >= TIMESTAMP("2018-03-21")
 and d._PARTITIONTIME <= TIMESTAMP("2018-03-27")
 and feeder_podcast=93 and country_name='United Kingdom'
 group by city_name, subdivision_1_name, country_name
 order by count desc
 LIMIT 50
 */
export const DATA_UK_CITY = [
  ['City', 'Downloads'],
  ['London, England', 4113],
  ['Birmingham, England', 1509],
  ['Brighton, England', 792],
  ['Islington, England', 552],
  ['Glasgow, Scotland', 537],
  ['Aylesbury, England', 466],
  ['Hackney, England', 440],
  ['Nottingham, England', 328],
  ['Manchester, England', 313],
  ['Basildon, England', 308],
  ['Covent Garden, England', 297],
  ['Belfast, Northern Ireland', 281],
  ['Surbiton, England', 268],
  ['Bristol, England', 264],
  ['Liverpool, England', 233],
  ['Kingston, England', 211],
  ['Cambridge, England', 203],
  ['Barnet, England', 203],
  ['Roehampton, England', 196],
  ['Stockport, England', 192],
  ['Tadley, England', 152],
  ['Hindhead, England', 151],
  ['Loughton, England', 148],
  ['Thornton Heath, England', 137],
  ['Rochester, England', 136],
  ['Cardiff, Wales', 133],
  ['Erith, England', 130],
  ['Belper, England', 116],
  ['Camberwell, England', 114],
  ['Edinburgh, Scotland', 114],
  ['Leeds, England', 109],
  ['Stourbridge, England', 107],
  ['Oxford, England', 106],
  ['Hampstead, England', 105],
  ['Stoke Newington, England', 105],
  ['Caernarfon, Wales', 104],
  ['Didcot, England', 102],
  ['Paddington, England', 98],
  ['Hammersmith, England', 95],
  ['Lewisham, England', 93],
  ['Raynes Park, England', 92],
  ['Warlingham, England', 91],
  ['Brentford, England', 86],
  ['Bradford, England', 85],
  ['Mold, Wales', 85],
  ['Coatbridge, Scotland', 84],
  ['Whitley Bay, England', 81],
  ['Twickenham, England', 80],
  ['Camden, England', 77],
  ['Hemel Hempstead, England', 71]
];

/*
 SELECT city_name, subdivision_1_name, count(*) as count FROM [prx-metrics:production.downloads] d
 join [prx-metrics:production.geonames] g on d.city_id=g.geoname_id
 WHERE d._PARTITIONTIME >= TIMESTAMP("2018-03-21")
 and d._PARTITIONTIME <= TIMESTAMP("2018-03-27")
 and feeder_podcast=93 and country_name='Australia'
 group by city_name, subdivision_1_name, country_name
 order by count desc
 LIMIT 50
 */
export const DATA_AUSTRALIA_CITY = [
  ['City', 'Downloads'],
  ['Melbourne,Victoria', 3622],
  ['Sydney,New South Wales',1045],
  ['Chullora,New South Wales',831],
  ['Perth,Western Australia',703],
  ['Malvern,Victoria',679],
  ['Brisbane,Queensland',453],
  ['Eltham,Victoria',366],
  ['Newstead,Queensland',356],
  ['Sunnybank,Queensland',329],
  ['Narangba,Queensland',327],
  ['Caulfield South,Victoria',233],
  ['Adelaide,South Australia',218],
  ['Preston,Victoria',214],
  ['Moorebank,New South Wales',198],
  ['Summer Hill,New South Wales',170],
  ['Berwick,Victoria',141],
  ['Condell Park,New South Wales',139],
  ['Northcote,Victoria',136],
  ['Kuraby,Queensland',135],
  ['Willetton,Western Australia',131],
  ['Lesmurdie,Western Australia',122],
  ['Rozelle,New South Wales',121],
  ['Erskineville,New South Wales',104],
  ['Mernda,Victoria',97],
  ['Surry Hills,New South Wales',96],
  ['Gaythorne,Queensland',93],
  ['Maroubra,New South Wales',88],
  ['Panania,New South Wales',83],
  ['Box Hill South,Victoria',79],
  ['McKinnon,Victoria',74],
  ['Airds,New South Wales',72],
  ['Greystanes,New South Wales',70],
  ['Nundah,Queensland',63],
  ['Canberra,Australian Capital Territory',63],
  ['South Yarra,Victoria',62],
  ['Highgate,Western Australia',60],
  ['Paramatta,New South Wales',59],
  ['Arrawarra,New South Wales',58],
  ['Homebush,New South Wales',57],
  ['Ashfield,New South Wales',56],
  ['Glen Iris,Victoria',55],
  ['Auburn,New South Wales',52],
  ['Barangaroo,New South Wales',52],
  ['Bankstown,New South Wales',50],
  ['Doncaster,Victoria',49],
  ['Coburg,Victoria',49],
  ['Greenacre,New South Wales',49],
  ['Ipswich,Queensland',47],
  ['Richmond,Victoria',46],
  ['St Kilda,Victoria',46]
];

/*

 */
export const DATA_GERMANY_CITY = [
  ['City', 'Downloads'],
  ['Berlin,Land Berlin', 962],
  ['Hamburg,Hamburg', 198],
  ['Potsdam,Brandenburg', 183],
  ['Frankfurt am Main,Hesse', 163],
  ['Rheine,North Rhine-Westphalia', 129],
  ['Riedstadt,Hesse', 128],
  ['Bremen,Bremen', 90],
  ['Cologne,North Rhine-Westphalia', 83],
  ['Munich,Bavaria', 76],
  ['Odelzhausen,Bavaria', 58],
  ['Dusseldorf,North Rhine-Westphalia', 58],
  ['Stuttgart,Baden-Württemberg Region', 57],
  ['Dortmund,North Rhine-Westphalia', 34],
  ['Krefeld,North Rhine-Westphalia', 32],
  ['Leipzig,Saxony', 31],
  ['Essen,North Rhine-Westphalia', 30],
  ['Hanover,Lower Saxony', 26],
  ['Falkensee,Brandenburg', 24],
  ['Karlsruhe,Baden-Württemberg Region', 24],
  ['Schwelm,North Rhine-Westphalia', 22],
  ['Teltow,Brandenburg', 20],
  ['Witten,North Rhine-Westphalia', 20],
  ['Haar,Bavaria', 19],
  ['Dresden,Saxony', 18],
  ['Ramstein-Miesenbach,Rheinland-Pfalz', 16],
  ['Bad Berka,Thuringia', 14],
  ['Bassenheim,Rheinland-Pfalz', 13],
  ['Neumünster,Schleswig-Holstein', 13],
  ['Trier,Rheinland-Pfalz', 12],
  ['Ratingen,North Rhine-Westphalia', 12],
  ['Freiburg,Baden-Württemberg Region', 12],
  ['Nuremberg,Bavaria', 11],
  ['Saarbrücken,Saarland', 11],
  ['Mannheim,Baden-Württemberg Region', 10],
  ['Bad Essen,Lower Saxony', 9],
  ['Waltrop,North Rhine-Westphalia', 9],
  ['Bonn,North Rhine-Westphalia', 9],
  ['Wiesbaden,Hesse', 8],
  ['Kiel,Schleswig-Holstein', 8],
  ['Dinslaken,North Rhine-Westphalia', 8],
  ['Kesselsdorf,Saxony', 8],
  ['Hude,Lower Saxony', 8],
  ['Brandenburg,Brandenburg', 7],
  ['Luebbenau,Brandenburg', 7],
  ['Barchfeld,Thuringia', 7],
  ['Düren,North Rhine-Westphalia', 6],
  ['Kalletal,North Rhine-Westphalia', 6],
  ['Sohlde,Lower Saxony', 6],
  ['Sindelfingen,Baden-Württemberg Region', 6],
  ['Bruehl,North Rhine-Westphalia', 6]
];

/*

 */
export const DATA_DENMARK_CITY = [
  ['City', 'Downloads'],
  ['Copenhagen,Capital Region', 1588],
  ['Aarhus,Central Jutland', 301],
  ['Bronshoj,Capital Region', 298],
  ['Frederiksberg,Capital Region', 120],
  ['Odense,South Denmark', 104],
  ['Rødovre Municipality,Capital Region', 57],
  ['Veflinge,South Denmark', 40],
  ['Kolding,South Denmark', 38],
  ['Randers,Central Jutland', 31],
  ['Farum,Capital Region', 25],
  ['Elsinore,Capital Region', 24],
  ['Kastrup,South Denmark', 23],
  ['Valby,Capital Region', 23],
  ['Hojbjerg,South Denmark', 16],
  ['Esbjerg,South Denmark', 16],
  ['Hvidovre,Capital Region', 15],
  ['Viborg,Central Jutland', 14],
  ['Taastrup,Capital Region', 12],
  ['Albertslund Municipality,Capital Region', 11],
  ['Soborg,Capital Region', 7],
  ['Skodstrup,South Denmark', 7],
  ['Aalborg,North Denmark', 7],
  ['Lyngby,Central Jutland', 6],
  ['Herning,Central Jutland', 4],
  ['Haderslev,South Denmark', 4],
  ['Tranbjerg,Central Jutland', 4],
  ['Skanderborg,Central Jutland', 3],
  ['Allerød Municipality,Capital Region', 3],
  ['Ballerup Municipality,Capital Region', 3],
  ['Bagsvaerd,Capital Region', 3],
  ['Ebeltoft,Central Jutland', 3],
  ['Risskov,Central Jutland', 3],
  ['Bogense,South Denmark', 3],
  ['Kongens Lyngby,Capital Region', 2],
  ['Humlebaek,Capital Region', 2],
  ['Vallensbæk,Capital Region', 2],
  ['Hellerup,Capital Region', 2],
  ['Ishøj,Capital Region', 2],
  ['Ikast,Central Jutland', 2],
  ['Ornhoj,Central Jutland', 2],
  ['Struer Municipality,Central Jutland', 2],
  ['Holte,South Denmark', 2],
  ['Herlev,Capital Region', 1],
  ['Skagen,North Denmark', 1],
  ['Kvaerndrup,South Denmark', 1],
  ['Kirke Hvalso,Zealand', 1],
  ['Nordborg,South Denmark', 1],
  ['Give,South Denmark', 1],
  ['Sonderso,South Denmark', 1],
  ['Fredericia,South Denmark', 1]
];

/*

 */
export const DATA_IRELAND_CITY = [
  ['City', 'Downloads'],
  ['Dublin',1554],
  ['Lucan',  286],
  ['Wicklow', 105],
  ['Greystones', 35],
  ['Cork', 19],
  ['Bray', 18],
  ['Booterstown', 13],
  ['Limerick', 13],
  ['Waterford', 12],
  ['Galway', 11],
  ['Donadea', 11],
  ['Athy', 10],
  ['Finglas', 10],
  ['Sandycove', 9],
  ['Malahide', 8],
  ['Laytown', 8],
  ['Dundalk', 7],
  ['Lusk', 6],
  ['Swords', 6],
  ['Kilkenny', 5],
  ['Naas', 5],
  ['Loughrea', 5],
  ['Monaghan', 4],
  ['Drogheda', 4],
  ['Ennis', 3],
  ['Cabinteely', 3],
  ['Mullingar', 3],
  ['Glenageary', 3],
  ['Castleknock', 3],
  ['Kinnegad', 3],
  ['Tallaght', 3],
  ['Clonmel', 2],
  ['Coolock', 2],
  ['Terenure', 2],
  ['Tralee', 2],
  ['Ballymahon', 2],
  ['Enniscorthy', 2],
  ['Slane', 2],
  ['Shannon', 2],
  ['Raheny', 2],
  ['Oranmore', 2],
  ['Ashbourne', 1],
  ['Tramore', 1],
  ['Kildare', 1],
  ['Dalkey', 1],
  ['Kildalkey', 1],
  ['Glasnevin', 1],
  ['Marino', 1],
  ['Carrickmacross', 1],
  ['Ballyjamesduff', 1]
];

/*
 SELECT country_name, count(*) as count FROM [prx-metrics:production.downloads] d
 join [prx-metrics:production.geonames] g on d.city_id=g.geoname_id
 WHERE d._PARTITIONTIME >= TIMESTAMP("2018-03-21") and d._PARTITIONTIME <= TIMESTAMP("2018-03-27")
 and feeder_podcast=93 and continent_code='NA'
 group by country_name
 order by count desc
 LIMIT 50
 */
export const DATA_NORTH_AMERICA_COUNTRY = [
  ['Country', 'Downloads'],
  ['United States', 261256],
  ['Canada', 20032],
  ['Mexico', 1120],
  ['Trinidad and Tobago', 143],
  ['Costa Rica', 118],
  ['Cuba', 74],
  ['Belize', 64],
  ['Puerto Rico', 64],
  ['Nicaragua', 63],
  ['Bahamas', 59],
  ['Jamaica', 55],
  ['Dominica Republic', 54],
  ['Cayman Islands', 39],
  ['Panama', 21],
  ['Haiti', 8],
  ['Honduras', 7],
  ['Guatemala', 7],
  ['Barbados', 6],
  ['El Salvador', 4],
  ['Curaçao', 3],
  ['Bermuda', 2],
  ['Saint Kitts and Nevis', 1],
  ['Sint Maarten', 1],
  ['Guadeloupe', 1],
  ['Saint Lucia', 1],
  ['Grenada', 1]
];

/*
 SELECT country_name, count(*) as count FROM [prx-metrics:production.downloads] d
 join [prx-metrics:production.geonames] g on d.city_id=g.geoname_id
 WHERE d._PARTITIONTIME >= TIMESTAMP("2018-03-21") and d._PARTITIONTIME <= TIMESTAMP("2018-03-27")
 and feeder_podcast=93 and continent_code='AS'
 group by country_name
 order by count desc
 LIMIT 50
 */
export const DATA_ASIA_COUNTRY = [
  ['Country', 'Downloads'],
  ['Japan', 1203],
  ['China', 916],
  ['India', 616],
  ['Taiwan', 486],
  ['Republic of Korea', 448],
  ['Hong Kong', 439],
  ['Singapore', 413],
  ['Israel', 379],
  ['Thailand', 369],
  ['Iraq', 325],
  ['Philippines', 237],
  ['Malaysia', 219],
  ['United Arab Emirates', 196],
  ['Vietnam', 181],
  ['Kazakhstan', 136],
  ['Turkey', 123],
  ['Indonesia', 117],
  ['Saudi Arabia', 99],
  ['Nepal', 59],
  ['Pakistan', 51],
  ['Bangladesh', 48],
  ['Iran', 44],
  ['Sri Lanka', 27],
  ['Kuwait', 23],
  ['Azerbaijan', 22],
  ['Cambodia', 22],
  ['Hashemite Kingdom of Jordan', 19],
  ['Myanmar [Burma]', 16],
  ['Georgia', 12],
  ['Maldives', 12],
  ['Qatar', 10],
  ['Brunei', 6],
  ['Lebanon', 5],
  ['Mongolia', 5],
  ['Uzbekistan', 3],
  ['Oman', 2],
  ['Macao', 2],
  ['Yemen', 1],
  ['Bahrain', 1]
];

/*
 SELECT country_name, count(*) as count FROM [prx-metrics:production.downloads] d
 join [prx-metrics:production.geonames] g on d.city_id=g.geoname_id
 WHERE d._PARTITIONTIME >= TIMESTAMP("2018-03-21") and d._PARTITIONTIME <= TIMESTAMP("2018-03-27")
 and feeder_podcast=93 and continent_code='SA'
 group by country_name
 order by count desc
 LIMIT 50
 */
export const DATA_SOUTH_AMERICA_COUNTRY = [
  ['Country', 'Downloads'],
  ['Brazil', 1320],
  ['Argentina', 300],
  ['Peru', 157],
  ['Chile', 152],
  ['Ecuador', 130],
  ['Colombia', 111],
  ['Venezuela', 70],
  ['Uruguay', 24],
  ['Bolivia', 12],
  ['Guyana', 8],
  ['Paraguay', 6],
  ['Suriname', 3]
];

/*
 SELECT country_name, count(*) as count FROM [prx-metrics:production.downloads] d
 join [prx-metrics:production.geonames] g on d.city_id=g.geoname_id
 WHERE d._PARTITIONTIME >= TIMESTAMP("2018-03-21") and d._PARTITIONTIME <= TIMESTAMP("2018-03-27")
 and feeder_podcast=93 and continent_code='AF'
 group by country_name
 order by count desc
 LIMIT 50
 */
export const DATA_AFRICA_COUNTRY = [
  ['Country', 'Downloads'],
  ['South Africa', 930],
  ['Egypt', 102],
  ['Morocco', 91],
  ['Uganda', 19],
  ['Nigeria', 18],
  ['Algeria', 8],
  ['Zambia', 8],
  ['Botswana', 7],
  ['Réunion', 7],
  ['Ghana', 6],
  ['Libya', 5],
  ['Kenya', 5],
  ['Senegal', 5],
  ['Namibia', 3],
  ['Ethiopia', 2],
  ['Angola', 1],
  ['Tanzania', 1],
  ['Ivory Coast', 1],
  ['Mozambique', 1],
  ['Guinea', 1],
  ['Cameroon', 1]
];

/*
 SELECT country_name, count(*) as count FROM [prx-metrics:production.downloads] d
 join [prx-metrics:production.geonames] g on d.city_id=g.geoname_id
 WHERE d._PARTITIONTIME >= TIMESTAMP("2018-03-21") and d._PARTITIONTIME <= TIMESTAMP("2018-03-27")
 and feeder_podcast=93 and continent_code='OC'
 group by country_name
 order by count desc
 LIMIT 50
 */
export const DATA_OCEANIA_COUNTRY = [
  ['Country', 'Downloads'],
  ['Australia', 16680],
  ['New Zealand', 2155],
  ['Fiji', 6],
  ['Papua New Guinea', 2],
  ['Guam', 2],
  ['American Samoa', 1],
  ['New Caledonia', 1]
];
