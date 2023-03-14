const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`https://mlh.io/seasons/${new Date().getFullYear()}/events`);
    const $ = cheerio.load(response.data);
    let eventnames = [];
    let eventdates = [];
    let eventlocations = [];
    let eventnotes = [];
    let imageurls = [];
    let logos = [];
    $('.event-name').each((i, el)=>{
        eventnames.push($(el).text());
    })
    // console.log(eventnames[3]);

    $('.event-date').each((i, el)=>{
        eventdates.push($(el).text());
    })
    // console.log(eventdates[3]);

    $('.event-location').each((i, el)=>{
        eventlocations.push($(el).text());
    })
    // console.log(eventlocations[3]);

    $('.event-hybrid-notes').each((i, el)=>{
        eventnotes.push($(el).text());
    })
    // console.log(eventnotes[3]);

    $('.image-wrap').each((i, el)=>{
        imageurls.push($(el).find('img').attr('src'));
    })
    // console.log(imageurls[3]);

    $('.event-logo').each((i, el)=>{
        logos.push($(el).find('img').attr('src'));
    })
    // console.log(logos[3]);

    const result = eventnames.map((name, index) => ({
        [name]: {
          eventname: eventnames[index],
          eventdate: eventdates[index],
          eventlocation: eventlocations[index],
          eventnote: eventnotes[index],
          imageurl: imageurls[index],
          logo: logos[index],
        },
      }));
      
      res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
