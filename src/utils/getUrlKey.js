export default function getUrlKey (name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [undefined, ''])[1].replace(/\+/g, '%20')) || null
}
