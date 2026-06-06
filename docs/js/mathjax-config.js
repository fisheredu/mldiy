window.MathJax = {
  tex: {
    tags: 'ams', // enable \label and \eqref via amsmath-style tagging
    macros: {
      RR: '\\mathbb{R}'
    }
  },
  options: {
    // allow MathJax to process math in fenced code blocks if present
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea']
  }
};
