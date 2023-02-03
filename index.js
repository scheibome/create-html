function buildStylesheets (sheets, async) {
  var output = ''
  if (!sheets) return output

  if (typeof sheets === 'string') {
    sheets = [sheets]
  }

  sheets.forEach(function (sheet) {
    output += !async
      ? `<link rel="stylesheet" href="${sheet}">\n`
      : `<link rel="stylesheet" href="${sheet}" media="none" onload="if(media!=='all')media='all'">\n`
  })

  return output
}

function buildScripts (scripts, async, module) {
  var output = ''
  if (!scripts) return output

  var moduleTag = (module) ? ' type="module"' : ''

  if (typeof scripts === 'string') {
    scripts = [scripts]
  }

  scripts.forEach(function (script) {
    output += !async
      ? `<script src="${script}"${moduleTag}></script>\n`
      : `<script src="${script}"${moduleTag} async></script>\n`
  })

  return output
}

module.exports = function (opts) {
  var title = opts.title ? `<title>${opts.title}</title>` : ''
  var shouldScriptBeIncludedInHead = opts.scriptAsync || !opts.scriptModule
  var headScript = (opts.script && shouldScriptBeIncludedInHead) ? buildScripts(opts.script, opts.scriptAsync, opts.scriptModule) : ''
  var bodyScript = (opts.script && !shouldScriptBeIncludedInHead) ? buildScripts(opts.script, opts.scriptAsync, opts.scriptModule) : ''
  var favicon = opts.favicon ? `<link rel="icon" href="${opts.favicon}">` : ''
  var css = buildStylesheets(opts.css, opts.cssAsync)
  var lang = opts.lang || 'en'
  var dir = opts.dir || 'ltr'
  var head = opts.head || ''
  var body = opts.body || ''

  return `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
${title}
<meta charset="utf-8">
${favicon}
${head}
${css}
${headScript}
</head>
<body>
${body}
${bodyScript}
</body>
</html>
`
}
