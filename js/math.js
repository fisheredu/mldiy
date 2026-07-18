document.addEventListener("DOMContentLoaded", function () {
  // Utility: try to render when KaTeX/auto-render are available. Poll briefly if needed.
  var maxAttempts = 10;
  var attempt = 0;
  function tryRender() {
    attempt++;
    // Auto-render (for delimiters like $$...$$)
    if (window.renderMathInElement) {
      try {
        renderMathInElement(document.body, {
          delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "\\[", right: "\\]", display: true},
            {left: "$", right: "$", display: false},
            {left: "\\(", right: "\\)", display: false}
          ],
          throwOnError: false
        });
      } catch (e) {
        if (console && console.error) console.error('auto-render error:', e);
      }
    }

    // Fenced math blocks: look for code/pre blocks labelled math and replace them with rendered output.
    if (window.katex) {
      var selectors = [
        'pre code.language-math',
        'pre code.math',
        'pre.language-math',
        'pre.math',
        'div.highlight pre code.language-math',
        'div.highlight pre code.math'
      ];
      var mathCodeBlocks = document.querySelectorAll(selectors.join(','));
      mathCodeBlocks.forEach(function(code){
        // skip if already rendered (avoid double-render)
        if (code.dataset.katexRendered) return;
        try {
          var math = code.textContent || code.innerText || '';
          var container = document.createElement('div');
          // Use renderToString so we can set innerHTML in one go
          var html = katex.renderToString(math, {displayMode: true, throwOnError: false});
          container.innerHTML = html;
          var pre = code.closest('pre');
          if (pre && pre.parentNode) {
            pre.parentNode.replaceChild(container, pre);
          } else if (code.parentNode) {
            code.parentNode.replaceChild(container, code);
          }
          container.dataset.katexRendered = 'true';
        } catch (e) {
          if (console && console.error) console.error('KaTeX render error:', e);
        }
      });
    }

    // If neither library is ready yet, try again up to maxAttempts.
    if ((typeof window.renderMathInElement === 'undefined' || typeof window.katex === 'undefined') && attempt < maxAttempts) {
      setTimeout(tryRender, 200);
    }
  }

  tryRender();
});
