/**
 * 在每个 HTML 页面注入落花脚本。
 * 只作用于文章页与首页；如需全站生效，把 path 判断去掉即可。
 */
hexo.extend.filter.register("after_render:html", function (str) {
  if (str.indexOf("/js/petals.js") !== -1) return str;
  if (!/<\/body>/i.test(str)) return str;

  var root = hexo.config.root || "/";
  if (root.charAt(root.length - 1) !== "/") root += "/";

  var tag = '<script src="' + root + 'js/petals.js" defer></script>';
  return str.replace(/<\/body>/i, tag + "</body>");
});
