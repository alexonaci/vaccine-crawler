const fetch = require('node-fetch');
const open = require('open');

setInterval(() => {
  fetch("https://programare.vaccinare-covid.gov.ro/scheduling/api/centres?page=0&size=20&sort=,", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-GB,en;q=0.9,ro-RO;q=0.8,ro;q=0.7,en-US;q=0.6",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "__utma=166663336.1591922312.1608886086.1608886086.1608886086.1; __utmz=166663336.1608886086.1.1.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); _ga_M62YWKC42M=GS1.1.1614342354.2.1.1614342821.0; SESSION=NzYyOGQ4OTctZTQ3OS00MDc5LTg3ZTMtYzAwYjRkZDM3ODYz; _gid=GA1.2.1866585526.1615443878; _ga=GA1.1.1286402150.1615449150; _gat_gtag_UA_115306741_15=1; _ga_JZ40WVXFJF=GS1.1.1615453156.3.1.1615453369.0"
  },
  "referrer": "https://programare.vaccinare-covid.gov.ro/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"countyID\":12,\"localityID\":null,\"name\":null,\"identificationCode\":\"1930309020100\",\"masterPersonnelCategoryID\":-4,\"personnelCategoryID\":32,\"recipientID\":5459333}",
  "method": "POST",
  "mode": "cors"
}).then(res => res.json())
.then(response => {
    let foundPlace = false;
    if ('content' in response && response.content.length) {
      response.content.forEach(center => {
        if ('availableSlots' in center && center.availableSlots !== 0) {
          console.log(`FOUND PLACE ${center.name}`);
          foundPlace = true;
          open('https://programare.vaccinare-covid.gov.ro/scheduling/api/centres?page=0&size=20&sort=,');
        }
      });
      if (!foundPlace) {
        console.log('Nu sunt locuri disponibile');
      }
    }
});
}, 3000);
