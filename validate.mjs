import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { switchPath } from './src/routes/paths.js';

const server = await createServer({server:{middlewareMode:true},appType:'custom'});
try {
  const {countries} = await server.ssrLoadModule('/src/countries/index.js');
  let checks = 0;
  for (const market of Object.values(countries)) {
    assert.equal(market.projects.length, new Set(market.projects.map(p=>p.slug)).size);
    assert(market.home.heroImage && market.contact && market.currency);
    for (const page of ['home','about','portfolio','contact']) assert(market.seo[page].title.includes(market.name));
    for (const destination of Object.values(countries)) {
      for (const page of ['about','portfolio','contact']) {
        assert.equal(switchPath('/'+market.id+'/'+page,destination),'/'+destination.id+'/'+page);
        checks++;
      }
      assert.equal(switchPath('/'+market.id+'/portfolio/missing',destination),'/'+destination.id);
      checks++;
    }
  }
  const saved = countries.usa.home.headline;
  countries.bangladesh.home.headline = 'Isolation test';
  assert.equal(countries.usa.home.headline,saved);
  console.log(`${checks} route-switch assertions passed; country schema and content isolation passed.`);
} finally { await server.close(); }
