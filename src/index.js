console.log(document)

import { getTokens } from './link/utils'

const initPanel = () => {
  const panel = document.createElement('div')
  panel.className = 'github-panel'

  document.body.appendChild(panel)

  const { organization, repository, number, action } = getTokens(document.location.href)

  const url = `https://github.com/${organization}/${repository}/${action}/${number}/reviews`

  console.log(url)

  fetch(url, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: '_method=put&authenticity_token=PASTE_TOKEN_HERE&head_sha=PASTE_TOKEN_HERE&saved_reply_id=&pull_request_review%5Bbody%5D=&path=&line=&start_line=&preview_side=&preview_start_side=&start_commit_oid=&end_commit_oid=&base_commit_oid=&comment_id=&pull_request_review%5Bevent%5D=approve',
    method: 'POST',
    credentials: 'include'
  })
}

const createButton = () => {}

initPanel()
