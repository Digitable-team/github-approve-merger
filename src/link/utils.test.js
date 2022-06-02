import { getTokens } from './utils'

describe('getTokens', () => {
  it('should parse tokens of link as object', () => {
    // Arrange
    const url = 'https://github.com/Digitable-team/github-approve-merger/pull/514/reviews'
    const expected = {
      organization: 'Digitable-team',
      repository: 'web',
      action: 'pull',
      number: '514',
      subaction: 'reviews'
    }

    // Actual
    const actual = getTokens(url)

    // Assert
    expect(actual).toStrictEqual(expected)
  })

  it('should parse tokens of partial link as object', () => {
    // Arrange
    const url = 'https://github.com/Digitable-team/github-approve-merger/pull/514'
    const expected = {
      organization: 'Digitable-team',
      repository: 'web',
      action: 'pull',
      number: '514',
      subaction: ''
    }

    // Actual
    const actual = getTokens(url)

    // Assert
    expect(actual).toStrictEqual(expected)
  })

  it('should throw exception when link is empty, undefined or null', () => {
    // Arrange
    const urls = ['', undefined, null]
    const expected = new Error('Link should not be empty')

    // Actual
    urls.map(url => {
      // Assert
      expect(() => {
        getTokens(url)
      }).toThrow(expected)
    })
  })

  it('should throw exception when link is not pull request', () => {
    // Arrange
    const urls = [
      'https://github.com/Digitable-team/github-approve-merger/issues/514',
      'https://github.com/Digitable-team/github-approve-merger',
      'https://github.com',
      'https://github.com/Digitable-team/github-approve-merger/projects/pulls',
      'https://github.com/Digitable-team/pulls/issues/pulls'
    ]
    const expected = new Error('Link is not pull request')

    // Actual
    urls.map(url => {
      // Assert
      expect(() => {
        getTokens(url)
      }).toThrow(expected)
    })
  })
})
