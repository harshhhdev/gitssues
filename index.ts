const puppeteer = require('puppeteer')

let repoUrl = process.argv[2]

if (repoUrl == null) {
   const err = () => { return console.log('Error! Please specify a repository and your username (username/repo)') }
   err()
}

async function getIssues(url=`https://github.com/${repoUrl}/issues`) {
   let browser = await puppeteer.launch()
   let page = await browser.newPage()

   await page.goto(url)
   let issues = await page.evaluate(() => {
      var issueNames = document.querySelectorAll('.h4')

      let randIssues = (Math.floor(Math.random() * Math.floor(issueNames.length)))

      try {
         return(`Your task is to: "${issueNames[randIssues].innerHTML}" (https://github.com/${issueNames[randIssues].getAttribute('href')})`)
      } catch (e) {
         return('Error! Invalid URL. Double check the spelling, and make sure it\'s public!')
      }
   })

      console.log(`${issues}`)

   await browser.close()
}

getIssues()
