import puppeteer from 'puppeteer'
;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    defaultViewport: {
      width: 1280,
      height: 1024,
    },
  })
  const page = await browser.newPage()

  await page.goto('https://www.instagram.com/p/CpTow_UMvJG/', {
    waitUntil: 'networkidle0',
  })

  await new Promise((r) => setTimeout(r, 1500))
  const imgSelector = await page.$$('article > div > div:first-child img')

  const imgs = await Promise.all(
    imgSelector?.map(async (el) => await el.evaluate((e) => e.src))
  )

  console.log(imgs)

  await browser.close()
})()
