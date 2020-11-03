const cheerio = require('cheerio');
const request = require('request-promise');


class Orchestrator {

async initialize () {
  const listUrl = 'http://botmex.ninja/prediction/';
  let result = {}
  await request(listUrl).then(body => {

    const $ = cheerio.load(body);

  let tradeTable = $('table tbody tr:not(:first-child):not(:last-child)');
  let pastList = [];
  $(tradeTable).each(function(i1, tableLines){ 
    pastList.push({
     timestamp: Math.floor(new Date($($($(tableLines).html())[1]).text().replace(' ', 'T') + '.000Z')/1000),
     price: parseFloat($($($(tableLines).html())[2]).text()),
     trend: $($($(tableLines).html())[6]).text()
    })
  });


    const actualTrade = $('form b');
    let actualTradeData = [{
        timestamp: Math.floor(new Date($($($($('table tbody tr:last-child')).html())[1]).text().replace(' ', 'T') + '.000Z')/1000),
        price: parseFloat($($($($('table tbody tr:last-child')).html())[2]).text()),
        trend: $(actualTrade[5]).text(),
        // next_prevision: $(dataList[1]).text().replace(' $ ', ''), 
        // r_squared: $(dataList[2]).text(),
        // price_diference: $(dataList[6]).text().replace(' $ ', '').trim(),
        
    }];
    
    result = {
      result: "success",
      cache: false,
      data: [
        ...actualTradeData,
        ...pastList.reverse(),
        
      ]
    }
    console.log(result)

  }).catch(err => {
    console.log('Erro: ' + err);
  })
  return result;
}

}

module.exports = Orchestrator;