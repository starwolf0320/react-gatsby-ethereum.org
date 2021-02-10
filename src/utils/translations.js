const { consoleError } = require("./log")

const defaultStrings = require("../intl/en.json")
const languageMetadata = require("../data/translations.json")

const supportedLanguages = Object.keys(languageMetadata)

// Returns language's content version
// Used for conditional rendering of content
const getLangContentVersion = (lang) => {
  const metadata = languageMetadata[lang]
  if (!metadata) {
    consoleError(`No metadata found for language: ${lang}`)
    return
  }
  const version = metadata.version
  if (!version) {
    consoleError(`No version found for language: ${lang}`)
    return
  }
  return version
}

// Returns the en.json value
const getDefaultMessage = (key) => {
  const defaultMessage = defaultStrings[key]
  if (defaultMessage === undefined) {
    consoleError(
      `No key "${key}" in en.json. Cannot provide a default message.`
    )
  }
  return defaultMessage || ""
}

const isLangRightToLeft = (lang) => {
  return lang === "ar" || lang === "fa"
}

const translateMessageId = (id, intl) => {
  if (!id) {
    consoleError(`No id provided for translation.`)
    return ""
  }
  if (!intl || !intl.formatMessage) {
    consoleError(`Invalid/no intl provided for translation id ${id}`)
    return ""
  }
  const translation = intl.formatMessage({
    id,
    defaultMessage: getDefaultMessage(id),
  })
  if (translation === id) {
    consoleError(
      `Intl ID string "${id}" has no match. Default message of "" returned.`
    )
    return ""
  }
  return translation
}

// Must export using ES5 to import in gatsby-node.js
module.exports.languageMetadata = languageMetadata
module.exports.supportedLanguages = supportedLanguages
module.exports.getLangContentVersion = getLangContentVersion
module.exports.getDefaultMessage = getDefaultMessage
module.exports.isLangRightToLeft = isLangRightToLeft
module.exports.translateMessageId = translateMessageId
