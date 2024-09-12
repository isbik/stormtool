export const cleanOptionFromCookie = (key: string) => {
  const setCookie = (name: string, value: string, inputOptions = {}) => {
    const options: any = {
      path: '/',
      ...inputOptions,
    }

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString()
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    for (const optionKey in options) {
      if (Object.prototype.hasOwnProperty.call(options, optionKey)) {
        updatedCookie += `; ${optionKey}`
        const optionValue = options[optionKey]
        if (optionValue !== true) {
          updatedCookie += `=${optionValue}`
        }
      }
    }

    document.cookie = updatedCookie
  }

  setCookie(key, '', { 'max-age': -1 })
}
