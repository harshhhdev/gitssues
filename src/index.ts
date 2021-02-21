import { Octokit } from '@octokit/rest'

const octokit = new Octokit({})

const GetIssue = async () => {
  octokit
    .paginate(octokit.issues.listForRepo, {
      owner: process.argv[2],
      repo: process.argv[3],
    })
    .then((issues) => {
      let issueNumbers: number[] = []

      for (let i = 0; i < issues.length; i++) {
        issueNumbers.push(issues[i].number)
      }

      const issueIndex = Math.floor(
        Math.random() * Math.floor(issueNumbers.length)
      )

      console.log(
        `📝 [#${issues[issueIndex].number}] ${issues[issueIndex].title}`
      )
      console.log(`📎 ${issues[issueIndex].html_url}`)
    })
    .catch(() =>
      console.log(
        "🛑 There was an error getting that repo! Make sure you've spelt everything correctly, and the repo is public!\n\n🔎 You can search for issues by doing gitssues <username> <repository>"
      )
    )
}

GetIssue()
