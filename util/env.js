const devDomain = 'https://ech5.allcitygo.com'
const cardManageDomain = 'https://ech5.allcitygo.com' // https://sit-ech5.allcitygo.com  https://ech5.allcitygo.com
//const DefaultDomain = 'https://ech5.allcitygo.com'
const DefaultDomain = 'https://operation.allcitygo.com'

export default function getDomain(urlType) {
  let domain = devDomain
  // const env = (process.env.NODE_ENV ? 'dev' : '') || window.env || 'prod'
  // switch (env) {
  //   case 'dev':
  //     if (urlType === 'default') {
  //       domain = devDomain
  //     } else if (urlType === 'cardManageDomain') {
  //       domain = cardManageDomain
  //     }
  //     break
  //   case 'prod':
  //   default:
  if (urlType === 'default') {
    domain = DefaultDomain
  } else if (urlType === 'cardManageDomain') {
    domain = cardManageDomain
  }
  // break
  // }
  return domain
}