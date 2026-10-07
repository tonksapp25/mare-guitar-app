const {chromium}=require('C:/Users/kresi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path=require('path');
const {pathToFileURL}=require('url');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.resolve('index.html')).href);
 await page.getByRole('heading',{name:'Mali koraci. Prava pjesmica.'}).waitFor();
 fs.mkdirSync('tmp/webapp',{recursive:true});
 await page.screenshot({path:'tmp/webapp/desktop.png',fullPage:true});
 await page.getByRole('link',{name:'Otvori prvi tjedan'}).click();
 await page.getByRole('heading',{name:'Moje kartice'}).waitFor();
 if(await page.locator('.exercise-card').count()!==6)throw Error('Week 1 must contain 6 cards');
 await page.getByRole('link',{name:'Kartice',exact:true}).click();
 if(!page.url().endsWith('#tjedan-1/kartice'))throw Error('Quick link failed');
 await page.waitForFunction(()=>Math.abs(document.getElementById('kartice').getBoundingClientRect().top-20)<3);
 await page.screenshot({path:'tmp/webapp/cards.png',fullPage:false});
 for(let n=2;n<=4;n++){
  await page.goto(pathToFileURL(path.resolve('index.html')).href+'#tjedan-'+n);
  if(await page.locator('.exercise-card').count()!==6)throw Error('Missing cards week '+n);
 }
 await page.goto(pathToFileURL(path.resolve('index.html')).href+'#zvuk');
 await page.locator('audio').first().evaluate(a=>{a.load()});
 await page.waitForFunction(()=>document.querySelector('audio').readyState>=1);
 if(Math.abs(await page.locator('audio').first().evaluate(a=>a.duration)-8.3)>.01)throw Error('Audio duration wrong');
 await page.goto(pathToFileURL(path.resolve('index.html')).href+'#napredak');
 if(await page.locator('[data-skill]').count()!==11)throw Error('Missing progress skills');
 // Test in isolated browser context; no user progress is changed.
 await page.locator('[data-skill="0"]').selectOption('drugi-dan');
 if(await page.locator('[data-skill="0"]').inputValue()!=='')throw Error('Must block unconfirmed repeat');
 await page.locator('[data-date="0"]').fill('2026-10-01');
 await page.locator('[data-skill="0"]').selectOption('samostalno');
 await page.locator('[data-date="0"]').fill('2026-10-02');
 await page.locator('[data-skill="0"]').selectOption('drugi-dan');
 await page.locator('[data-note="samostalno"]').fill('Mogu odsvirati dio A.');
 await page.reload();
 if(await page.locator('[data-skill="0"]').inputValue()!=='drugi-dan')throw Error('Progress did not persist');
 if(await page.locator('[data-note="samostalno"]').inputValue()!=='Mogu odsvirati dio A.')throw Error('Note did not persist');
 await page.setViewportSize({width:390,height:844});
 await page.goto(pathToFileURL(path.resolve('index.html')).href+'#tjedan-1/kartice');
 await page.waitForFunction(()=>Math.abs(document.getElementById('kartice').getBoundingClientRect().top-20)<3);
 await page.screenshot({path:'tmp/webapp/mobile.png',fullPage:false});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1))throw Error('Mobile overflow');
 if(errors.length)throw Error(errors.join('\n'));
 console.log('PASS: file://, 4 weeks / 24 cards, quick navigation, audio, progress guard, saved notes, mobile layout.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
