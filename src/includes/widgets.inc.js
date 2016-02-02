/**
 * Implementation of theme_link().
 * @param {Object} variables
 * @return {String}
 */
dg.theme_link = function(variables) {
  var text = variables._text ? variables._text : '';
  var path = variables._path;
  if (path == '') { path = dg.getFrontPagePath(); }
  if (typeof variables._attributes.href === 'undefined' && path) {
    var href = path;
    if (path.indexOf('http://') != -1 || path.indexOf('https://') != -1) { }
    else if (path.indexOf('/') == 0) { href = path; }
    else { href = '#' + path; }
    variables._attributes.href = href;
  }
  return '<a ' + dg.attributes(variables._attributes) + '>' + text + '</a>';
};

dg.theme_image = function(vars) {
  vars._attributes.src = vars._attributes.src ? vars._attributes.src : vars._path;
  var src = vars._attributes.src;
  if (src && src.indexOf('public://') != -1 || src.indexOf('private://') != -1) {
    vars._attributes.src = dg.imagePath(src);
  }
  vars._attributes.alt = vars._attributes.alt ? vars._attributes.alt : vars._alt;
  vars._attributes.title = vars._attributes.title ? vars._attributes.title : vars._title;
  return '<img ' + dg.attributes(vars._attributes) + '/>';
};

/**
 * Implementation of theme_item_list().
 * @param {Object} variables
 * @return {String}
 */
dg.theme_item_list = function(variables) {
  var html = '';
  var type = variables._type ? variables._type : 'ul';
  if (variables._title) { html += '<h3>' + variables._title + '</h3>'; }
  html += '<' + type + ' ' + dg.attributes(variables._attributes) + '>';
  if (variables._items && variables._items.length > 0) {
    for (var i in variables._items) {
      if (!variables._items.hasOwnProperty(i)) { continue; }
      var item = variables._items[i];
      if (typeof item === 'object') { item = dg.render(item); }
      var attrs = {};
      if (i == 0) { attrs['class'] = ['first']; }
      else if (i == variables._items.length - 1) { attrs['class'] = ['last']; }
      html += '<li ' + dg.attributes(attrs) + '>' + item + '</li>';
    }
  }
  return html += '</' + type + '>';
};

dg.theme_title = function(variables) {
  return '<h1 ' + dg.attributes(variables._attributes) + '>' + variables._title + '</h1>';
};
dg.theme_document_title = function(variables) {
  return variables._title + ' | ' + dg.config('title');
};