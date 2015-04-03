var jQuery = require('jquery');
// Generated by CoffeeScript 1.6.3
/*
jquery.qeditor
==============

This is a simple WYSIWYG editor with jQuery.

## Author:

    Jason Lee <huacnlee@gmail.com>

## Requirements:

    [jQuery](http://jquery.com)
    (Font-Awesome)[http://fortawesome.github.io/Font-Awesome/] - Toolbar icons

## Usage:

    $("textarea").qeditor();

and then you need filt the html tags,attributes in you content page.
In Rails application, you can use like this:

    <%= sanitize(@post.body,:tags => %w(strong b i u strike ol ul li address blockquote pre code br div p), :attributes => %w(src)) %>
*/

var QEDITOR_ALLOW_TAGS_ON_PASTE, QEDITOR_DISABLE_ATTRIBUTES_ON_PASTE, QEDITOR_TOOLBAR_HTML;

QEDITOR_TOOLBAR_HTML = "<div class=\"qeditor_toolbar\">\n  <a href=\"#\" onclick=\"return QEditor.action(this,'bold');\" class=\"qe-bold\"><span class=\"icon-bold\" title=\"Bold\"></span></a> \n  <a href=\"#\" onclick=\"return QEditor.action(this,'italic');\" class=\"qe-italic\"><span class=\"icon-italic\" title=\"Italic\"></span></a> \n  <a href=\"#\" onclick=\"return QEditor.action(this,'underline');\" class=\"qe-underline\"><span class=\"icon-underline\" title=\"Underline\"></span></a> \n  <a href=\"#\" onclick=\"return QEditor.action(this,'strikethrough');\" class=\"qe-strikethrough\"><span class=\"icon-strikethrough\" title=\"Strike-through\"></span></a>		 \n  <span class=\"vline\"></span>\n  <span class=\"qe-icon qe-heading\">\n    <ul class=\"qe-menu\">\n      <li><a href=\"#\" data-name=\"h1\" class=\"qe-h1\">Heading 1</a></li>\n      <li><a href=\"#\" data-name=\"h2\" class=\"qe-h2\">Heading 2</a></li>\n      <li><a href=\"#\" data-name=\"h3\" class=\"qe-h3\">Heading 3</a></li>\n      <li><a href=\"#\" data-name=\"h4\" class=\"qe-h4\">Heading 4</a></li>\n      <li><a href=\"#\" data-name=\"h5\" class=\"qe-h5\">Heading 5</a></li>\n      <li><a href=\"#\" data-name=\"h6\" class=\"qe-h6\">Heading 6</a></li>\n      <li class=\"qe-hline\"></li>\n      <li><a href=\"#\" data-name=\"p\" class=\"qe-p\">Paragraph</a></li>\n    </ul>\n    <span class=\"icon icon-font\"></span>\n  </span>\n  <span class=\"vline\"></span>\n  <a href=\"#\" onclick=\"return QEditor.action(this,'insertorderedlist');\" class=\"qe-ol\"><span class=\"icon-list-ol\" title=\"Insert Ordered-list\"></span></a> \n  <a href=\"#\" onclick=\"return QEditor.action(this,'insertunorderedlist');\" class=\"qe-ul\"><span class=\"icon-list-ul\" title=\"Insert Unordered-list\"></span></a> \n  <a href=\"#\" onclick=\"return QEditor.action(this,'indent')\" class=\"qe-indent\"><span class=\"icon-indent-right\" title=\"Indent\"></span></a> \n  <a href=\"#\" onclick=\"return QEditor.action(this,'outdent')\" class=\"qe-outdent\"><span class=\"icon-indent-left\" title=\"Outdent\"></span></a> \n  <span class=\"vline\"></span> \n  <a href=\"#\" onclick=\"return QEditor.action(this,'insertHorizontalRule');\" class=\"qe-hr\"><span class=\"icon-minus\" title=\"Insert Horizontal Rule\"></span></a> \n  <a href=\"#\" onclick=\"return QEditor.action(this,'formatBlock','blockquote');\" class=\"qe-blockquote\"><span class=\"icon-quote-left\" title=\"Blockquote\"></span></a> \n  <a href=\"#\" onclick=\"return QEditor.action(this,'formatBlock','pre');\" class=\"qe-pre\"><span class=\"icon-code\" title=\"Pre\"></span></a> \n  <a href=\"#\" onclick=\"return QEditor.action(this,'createLink');\" class=\"qe-link\"><span class=\"icon-link\" title=\"Create Link\" title=\"Create Link\"></span></a> \n  <a href=\"#\" onclick=\"return QEditor.action(this,'insertimage');\" class=\"qe-image\"><span class=\"icon-picture\" title=\"Insert Image\"></span></a> \n  <a href=\"#\" onclick=\"return QEditor.toggleFullScreen(this);\" class=\"qe-fullscreen pull-right\"><span class=\"icon-fullscreen\" title=\"Toggle Fullscreen\"></span></a> \n</div>";

QEDITOR_ALLOW_TAGS_ON_PASTE = "div,p,ul,ol,li,hr,br,b,strong,i,em,img,h2,h3,h4,h5,h6,h7";

QEDITOR_DISABLE_ATTRIBUTES_ON_PASTE = ["style", "class", "id", "name", "width", "height"];

window.QEditor = {
  action: function(el, a, p) {
    var editor;
    editor = $(".qeditor_preview", $(el).parent().parent());
    editor.find(".qeditor_placeholder").remove();
    editor.focus();
    if (p === null) {
      p = false;
    }
    if (a === "createLink") {
      p = prompt("Type URL:");
      if (p.trim().length === 0) {
        return false;
      }
    } else if (a === "insertimage") {
      p = prompt("Image URL:");
      if (p.trim().length === 0) {
        return false;
      }
    }
    document.execCommand(a, false, p);
    editor.change();
    return false;
  },
  prompt: function(title) {
    var val;
    val = prompt(title);
    if (val) {
      return val;
    } else {
      return false;
    }
  },
  toggleFullScreen: function(el) {
    var border;
    border = $(el).parent().parent();
    if (border.data("qe-fullscreen") === "1") {
      QEditor.exitFullScreen();
    } else {
      QEditor.enterFullScreen(border);
    }
    return false;
  },
  enterFullScreen: function(border) {
    border.data("qe-fullscreen", "1").addClass("qeditor_fullscreen");
    border.find(".qeditor_preview").focus();
    return border.find(".qe-fullscreen span").attr("class", "icon-resize-small");
  },
  exitFullScreen: function() {
    return $(".qeditor_border").removeClass("qeditor_fullscreen").data("qe-fullscreen", "0").find(".qe-fullscreen span").attr("class", "icon-fullscreen");
  },
  getCurrentContainerNode: function() {
    var containerNode, node;
    if (window.getSelection) {
      node = window.getSelection().anchorNode;
      containerNode = node.nodeType === 3 ? node.parentNode : node;
    }
    return containerNode;
  },
  version: function() {
    return "0.1.1";
  }
};

(function($) {
  return $.fn.qeditor = function(options) {
    return this.each(function() {
      var currentVal, editor, obj, placeholder, qe_heading, toolbar;
      obj = $(this);
      obj.addClass("qeditor");
      editor = $('<div class="qeditor_preview clearfix" contentEditable="true"></div>');
      placeholder = $('<div class="qeditor_placeholder"></div>');
      $(document).keyup(function(e) {
        if (e.keyCode === 27) {
          return QEditor.exitFullScreen();
        }
      });
      document.execCommand('defaultParagraphSeparator', false, 'p');
      currentVal = obj.val();
      editor.html(currentVal);
      editor.addClass(obj.attr("class"));
      obj.after(editor);
      placeholder.text(obj.attr("placeholder"));
      editor.attr("placeholder", obj.attr("placeholder"));
      editor.append(placeholder);
      editor.focusin(function() {
        return $(this).find(".qeditor_placeholder").remove();
      });
      editor.blur(function() {
        var t;
        t = $(this);
        if (t.html().length === 0 || t.html() === "<br>" || t.html() === "<p></p>") {
          return $(this).html('<div class="qeditor_placeholder">' + $(this).attr("placeholder") + '</div>');
        }
      });
      editor.change(function() {
        var pobj, t;
        pobj = $(this);
        t = pobj.parent().find('.qeditor');
        return t.val(pobj.html());
      });
      editor.on("paste", function() {
        var txt;
        txt = $(this);
        return setTimeout(function() {
          var attrName, els, _i, _len;
          els = txt.find("*");
          for (_i = 0, _len = QEDITOR_DISABLE_ATTRIBUTES_ON_PASTE.length; _i < _len; _i++) {
            attrName = QEDITOR_DISABLE_ATTRIBUTES_ON_PASTE[_i];
            els.removeAttr(attrName);
          }
          els.find(":not(" + QEDITOR_ALLOW_TAGS_ON_PASTE + ")").contents().unwrap();
          txt.change();
          return true;
        }, 100);
      });
      editor.keyup(function(e) {
        return $(this).change();
      });
      editor.on("click", function(e) {
        return e.stopPropagation();
      });
      editor.keydown(function(e) {
        var node, nodeName;
        node = QEditor.getCurrentContainerNode();
        nodeName = "";
        if (node && node.nodeName) {
          nodeName = node.nodeName.toLowerCase();
        }
        if (e.keyCode === 13 && !(e.shiftKey || e.ctrlKey)) {
          if (nodeName === "blockquote" || nodeName === "pre") {
            e.stopPropagation();
            document.execCommand('InsertParagraph', false);
            document.execCommand("formatBlock", false, "p");
            document.execCommand('outdent', false);
            return false;
          }
        }
      });
      obj.hide();
      obj.wrap('<div class="qeditor_border"></div>');
      obj.after(editor);
      toolbar = $(QEDITOR_TOOLBAR_HTML);
      qe_heading = toolbar.find(".qe-heading");
      qe_heading.mouseenter(function() {
        $(this).addClass("hover");
        return $(this).find(".qe-menu").show();
      });
      qe_heading.mouseleave(function() {
        $(this).removeClass("hover");
        return $(this).find(".qe-menu").hide();
      });
      toolbar.find(".qe-heading .qe-menu a").click(function() {
        var link;
        link = $(this);
        link.parent().parent().hide();
        QEditor.action(this, "formatBlock", link.data("name"));
        return false;
      });
      return editor.before(toolbar);
    });
  };
})(jQuery);
