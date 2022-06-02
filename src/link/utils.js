const EMPTY_LINK_ERROR = 'Link should not be empty'
const NOT_PULL_REQUEST_ERROR = 'Link is not pull request'
const PROTOCOL_REGULAR = /(http|https):\/\/github.com/
const VALID_ACTION_NAME = 'pull'

const isAction = (container, target) => container.action === target

const getTokenizedLink = link => {
  return link
    .replace(PROTOCOL_REGULAR, '')
    .split('/')
    .filter(token => token.length)
}

const parseTokens = tokens => {
  const [organization, repository, action, number, subaction = ''] = tokens

  return { organization, repository, action, number, subaction }
}

const withPayloadError = callback => {
  return link => {
    if (!link) {
      throw new Error(EMPTY_LINK_ERROR)
    }

    return callback(link)
  }
}

const withPullRequestToken = container => {
  if (isAction(container, VALID_ACTION_NAME)) {
    return container
  }

  throw new Error(NOT_PULL_REQUEST_ERROR)
}

export const getTokens = withPayloadError(url => {
  const link = getTokenizedLink(url)
  const container = parseTokens(link)

  return withPullRequestToken(container)
})
