// $("script[type='math/tex']").replaceWith(
//   function(){
//     var tex = $(this).text();
//     return "<span class=\"inline-equation\">" +
//            katex.renderToString(tex) +
//            "</span>";
// });

// $("script[type='math/tex; mode=display']").replaceWith(
//   function(){
//     var tex = $(this).text();
//     return "<div class=\"equation\">" +
//            katex.renderToString("\\displaystyle "+tex) +
//            "</div>";
// });

// The following is from https://github.com/gettalong/kramdown/issues/292

$("script[type='math/tex'],script[type='math/tex; mode=display']").replaceWith(function() {
    var tex = $(this).html();
    // replace() here is due to CDATA wrapper (#224). KaTeX chokes on the % character,
    // which is unfortunate (and should probably be reported).
    return katex.renderToString(tex.replace(/%.*/g, ''), {displayMode: true});
});
