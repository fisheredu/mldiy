(function () {
  var graphvizPromise;

  function renderGraphvizBlocks() {
    var api = window["@hpcc-js/wasm/graphviz"];
    if (!api || !api.Graphviz) return;

    graphvizPromise = graphvizPromise || api.Graphviz.load();

    document.querySelectorAll("pre.graphviz").forEach(function (pre) {
      if (pre.dataset.rendered === "true") return;

      var code = pre.querySelector("code");
      if (!code) return;

      pre.dataset.rendered = "true";

      graphvizPromise
        .then(function (graphviz) {
          return graphviz.layout(code.textContent, "svg", "dot");
        })
        .then(function (svg) {
          var wrapper = document.createElement("div");
          wrapper.className = "graphviz-rendered";
          wrapper.innerHTML = svg;
          pre.replaceWith(wrapper);
        })
        .catch(function (error) {
          pre.classList.add("graphviz-error");
          pre.textContent = "Graphviz render error:\n" + error.message;
        });
    });
  }

  function startGraphvizRenderer() {
    renderGraphvizBlocks();

    new MutationObserver(renderGraphvizBlocks).observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(renderGraphvizBlocks);
  }

  if (document.body) {
    startGraphvizRenderer();
  } else {
    document.addEventListener("DOMContentLoaded", startGraphvizRenderer);
  }
})();
