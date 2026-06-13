<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Variational Inference — study note</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js"></script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&display=swap" rel="stylesheet">

<style>
  :root{
    --paper:#F8F9FB;
    --paper-2:#FFFFFF;
    --ink:#20242B;
    --muted:#5A6472;
    --rule:#E3E6EC;
    --p:#3A4FB8;      /* true posterior  p(Z|X) */
    --p-soft:#EAEDFA;
    --q:#C2603A;      /* approximation   q(Z)    */
    --q-soft:#F8ECE5;
    --fixed:#2E7D6B;  /* the fixed evidence log p(X) */
    --serif:"Source Serif 4", Georgia, serif;
    --sans:"IBM Plex Sans", system-ui, sans-serif;
    --mono:"IBM Plex Mono", ui-monospace, monospace;
  }

  *{box-sizing:border-box;}
  html{ -webkit-text-size-adjust:100%; }
  body{
    margin:0;
    background:var(--paper);
    color:var(--ink);
    font-family:var(--serif);
    font-size:18px;
    line-height:1.62;
    letter-spacing:.001em;
  }

  .wrap{
    max-width:760px;
    margin:0 auto;
    padding:72px 28px 120px;
  }

  /* ---- masthead ---- */
  .eyebrow{
    font-family:var(--sans);
    font-size:12px;
    font-weight:600;
    letter-spacing:.18em;
    text-transform:uppercase;
    color:var(--muted);
    margin:0 0 14px;
  }
  h1{
    font-family:var(--serif);
    font-weight:600;
    font-size:clamp(34px, 6vw, 46px);
    line-height:1.08;
    letter-spacing:-.01em;
    margin:0 0 16px;
  }
  .standfirst{
    font-size:18px;
    color:var(--muted);
    margin:0;
    max-width:58ch;
  }
  .masthead-rule{
    height:2px;
    background:var(--ink);
    border:0;
    margin:34px 0 0;
  }

  /* ---- signature: the decomposition bar ---- */
  .sig{
    margin:40px 0 8px;
    background:var(--paper-2);
    border:1px solid var(--rule);
    border-radius:10px;
    padding:26px 26px 22px;
  }
  .sig-title{
    font-family:var(--sans);
    font-size:12px;
    font-weight:600;
    letter-spacing:.14em;
    text-transform:uppercase;
    color:var(--muted);
    margin:0 0 18px;
  }
  .bar{
    display:flex;
    height:54px;
    border-radius:7px;
    overflow:hidden;
    font-family:var(--sans);
    font-weight:600;
    color:#fff;
    user-select:none;
  }
  .bar .elbo{
    background:var(--p);
    display:flex;align-items:center;justify-content:center;
    transition:flex-basis .12s ease;
    white-space:nowrap;
    min-width:0;
  }
  .bar .kl{
    background:var(--q);
    display:flex;align-items:center;justify-content:center;
    transition:flex-basis .12s ease;
    white-space:nowrap;
    min-width:0;
  }
  .bar span{ font-size:13px; padding:0 6px; overflow:hidden; text-overflow:ellipsis; }
  .bracket{
    display:flex;justify-content:space-between;align-items:center;
    margin-top:10px;
    font-family:var(--sans);
    font-size:12.5px;
    color:var(--muted);
  }
  .bracket .total{
    width:100%;
    text-align:center;
    border-top:1px solid var(--rule);
    padding-top:8px;
    margin-top:2px;
  }
  .slider-row{
    display:flex;align-items:center;gap:12px;
    margin-top:18px;
    font-family:var(--sans);font-size:13px;color:var(--muted);
  }
  .slider-row input[type=range]{ flex:1; accent-color:var(--p); }
  .sig-caption{
    font-size:15px;
    color:var(--muted);
    margin:16px 0 0;
    line-height:1.5;
  }

  /* ---- sections ---- */
  section{ margin-top:52px; }
  .num{
    font-family:var(--mono);
    font-size:13px;
    color:var(--q);
    font-weight:500;
  }
  h2{
    font-family:var(--serif);
    font-weight:600;
    font-size:26px;
    letter-spacing:-.01em;
    margin:6px 0 18px;
    line-height:1.18;
  }
  h3{
    font-family:var(--sans);
    font-weight:600;
    font-size:15px;
    letter-spacing:.01em;
    margin:28px 0 8px;
  }
  p{ margin:0 0 16px; }
  strong{ font-weight:600; }
  .term-p{ color:var(--p); font-weight:600; }
  .term-q{ color:var(--q); font-weight:600; }

  .lead{ font-size:19px; }

  /* equation block */
  .eq{
    background:var(--paper-2);
    border:1px solid var(--rule);
    border-left:3px solid var(--p);
    border-radius:8px;
    padding:18px 20px;
    margin:20px 0;
    overflow-x:auto;
  }
  .eq.q{ border-left-color:var(--q); }

  /* callout */
  .note{
    background:var(--q-soft);
    border-radius:8px;
    padding:16px 20px;
    margin:22px 0;
    font-size:16.5px;
  }
  .note .label{
    font-family:var(--sans);
    font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;
    color:var(--q);
    display:block;margin-bottom:6px;
  }
  .note.key{ background:var(--p-soft); }
  .note.key .label{ color:var(--p); }

  /* table */
  .tbl{ margin:22px 0; border:1px solid var(--rule); border-radius:8px; overflow:hidden; }
  table{ width:100%; border-collapse:collapse; font-size:15.5px; }
  thead th{
    font-family:var(--sans);font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    text-align:left;color:var(--muted);
    background:var(--paper-2);
    padding:12px 16px;border-bottom:1px solid var(--rule);
  }
  tbody td{ padding:13px 16px; border-bottom:1px solid var(--rule); vertical-align:top; }
  tbody tr:last-child td{ border-bottom:0; }
  tbody td:first-child{ font-family:var(--mono); font-size:14px; white-space:nowrap; }

  ul.clean{ margin:0 0 16px; padding-left:1.1em; }
  ul.clean li{ margin-bottom:9px; }

  footer{
    margin-top:64px;padding-top:22px;border-top:1px solid var(--rule);
    font-family:var(--sans);font-size:13px;color:var(--muted);
  }

  @media (max-width:560px){
    body{ font-size:17px; }
    .wrap{ padding:48px 20px 90px; }
    h2{ font-size:23px; }
  }
  @media (prefers-reduced-motion:reduce){
    .bar .elbo, .bar .kl{ transition:none; }
  }
</style>
</head>
<body>
<div class="wrap">

  <p class="eyebrow">Study note · approximate inference</p>
  <h1>Variational Inference</h1>
  <p class="standfirst">Turning an intractable posterior into an optimisation problem — what you have, what you want, and why the ELBO is the object everything turns on.</p>
  <hr class="masthead-rule">

  <!-- SIGNATURE -->
  <div class="sig">
    <p class="sig-title">The decomposition everything hangs on</p>
    <div class="bar" id="bar">
      <div class="elbo" id="elbo" style="flex-basis:62%"><span>ELBO &nbsp;𝓛(q)</span></div>
      <div class="kl" id="kl" style="flex-basis:38%"><span>KL(q ‖ p)</span></div>
    </div>
    <div class="bracket"><div class="total">total = ln p(X) — fixed, independent of q</div></div>
    <div class="slider-row">
      <span>improve q&nbsp;→</span>
      <input type="range" id="slider" min="40" max="100" value="62" aria-label="quality of approximation q">
      <span id="pct">62%</span>
    </div>
    <p class="sig-caption">The total length never changes. Pushing the <span class="term-p">ELBO</span> up is the same move as shrinking the <span class="term-q">KL gap</span> to the true posterior — you optimise the half you <em>can</em> compute, and the half you <em>can't</em> shrinks for free. At the optimum the gap closes and the ELBO equals the evidence exactly.</p>
  </div>

  <!-- 1 -->
  <section>
    <p class="num">01</p>
    <h2>What you have, and what you want</h2>
    <p class="lead">A probabilistic model gives you the <strong>joint</strong> distribution. You <em>have</em> it in the literal sense that you can write it down and evaluate it for any inputs:</p>
    <div class="eq">$$p(X,Z\mid\theta)=\underbrace{p(X\mid Z,\theta)}_{\text{likelihood}}\;\underbrace{p(Z\mid\theta)}_{\text{prior}}$$</div>
    <p>You never specify the joint as one monolithic formula — you build it from simpler pieces that encode a <em>story</em> of how the data was generated. For a Gaussian mixture: pick a cluster from the mixing weights, then draw the point from that cluster's Gaussian.</p>
    <p>What you <em>want</em> is the <span class="term-p">posterior</span> — the reverse direction, "given the data, what were the hidden variables?":</p>
    <div class="eq">$$p(Z\mid X)=\frac{p(X,Z)}{p(X)},\qquad p(X)=\int p(X,Z)\,dZ$$</div>
    <div class="note">
      <span class="label">The whole difficulty in one line</span>
      The numerator is the joint you already have. The denominator — the <strong>evidence</strong> <span style="font-family:var(--mono)">p(X)</span> — is an integral over <em>all</em> configurations of Z, and it is almost always intractable. You have everything except the normaliser.
    </div>
  </section>

  <!-- 2 -->
  <section>
    <p class="num">02</p>
    <h2>Latent variables, and where parameters live</h2>
    <p>Z collects everything unobserved. Whether the parameters θ count as "unobserved" is a modelling choice:</p>
    <ul class="clean">
      <li><strong>Frequentist / EM view.</strong> θ is a fixed unknown constant you estimate. Only the missing data is random. The model is written <span style="font-family:var(--mono)">p(X, Z | θ)</span> — θ sits outside, as something conditioned on.</li>
      <li><strong>Fully Bayesian view.</strong> θ is itself random: give it a prior and <strong>absorb it into Z</strong>. Now <span style="font-family:var(--mono)">Z = {latent data, θ}</span> and the joint is just <span style="font-family:var(--mono)">p(X, Z)</span>. There is no special case for "how to handle unknown parameters" — they are inferred like anything else.</li>
    </ul>
    <p>Same machinery either way; the only question is whether θ lives inside the latent vector or outside it as a conditioning parameter.</p>
  </section>

  <!-- 3 -->
  <section>
    <p class="num">03</p>
    <h2>The decomposition</h2>
    <p>Introduce <em>any</em> distribution <span class="term-q">q(Z)</span> over the latents. The log evidence splits exactly into two terms:</p>
    <div class="eq">$$\ln p(X)=\underbrace{\mathcal{L}(q)}_{\text{ELBO}}+\underbrace{\mathrm{KL}\!\big(q(Z)\,\Vert\,p(Z\mid X)\big)}_{\ge 0}$$</div>
    <p>where the evidence lower bound is</p>
    <div class="eq q">$$\mathcal{L}(q)=\int q(Z)\,\ln\frac{p(X,Z)}{q(Z)}\,dZ=\mathbb{E}_q[\ln p(X,Z)]-\mathbb{E}_q[\ln q(Z)].$$</div>
    <p>Because the left side <span style="font-family:var(--mono)">ln p(X)</span> is a fixed number, raising <span class="term-p">𝓛(q)</span> must lower the <span class="term-q">KL term</span> by the same amount. That is the entire strategy — and the bar at the top of this note is a picture of exactly this equation.</p>
  </section>

  <!-- 4 -->
  <section>
    <p class="num">04</p>
    <h2>Why the ELBO is special</h2>
    <p>The ELBO is <em>not</em> itself a KL divergence — it is <strong>(log evidence) minus a KL</strong>. The KL hiding inside it, <span style="font-family:var(--mono)">KL(q ‖ p(Z|X))</span>, is precisely the quantity you'd love to minimise: the distance from your approximation to the true posterior. So why not minimise it directly?</p>
    <div class="note">
      <span class="label">Because you can't compute it</span>
      That KL contains <span style="font-family:var(--mono)">p(Z|X) = p(X,Z)/p(X)</span>, which needs the intractable evidence <span style="font-family:var(--mono)">p(X)</span> — the exact thing you were trying to avoid.
    </div>
    <p>The ELBO, by contrast, uses only the <strong>joint</strong> <span style="font-family:var(--mono)">p(X,Z)</span> and your chosen <span style="font-family:var(--mono)">q</span>. No <span style="font-family:var(--mono)">p(X)</span>, no true posterior — fully computable.</p>
    <div class="note key">
      <span class="label">The trick that makes the field work</span>
      Since <span style="font-family:var(--mono)">ln p(X)</span> is constant in q, <strong>maximising the ELBO is identical to minimising the KL to the true posterior</strong>. You minimise the quantity you can't touch by maximising the one you can.
    </div>
    <p>Two more properties earn it the name:</p>
    <ul class="clean">
      <li><strong>It bounds the evidence.</strong> Since KL ≥ 0, always <span style="font-family:var(--mono)">𝓛(q) ≤ ln p(X)</span>. Useful as an estimate of the evidence for model comparison.</li>
      <li><strong>The bound is tight at the answer.</strong> When <span style="font-family:var(--mono)">q = p(Z|X)</span>, the KL is zero and <span style="font-family:var(--mono)">𝓛(q) = ln p(X)</span> exactly.</li>
    </ul>
  </section>

  <!-- 5 -->
  <section>
    <p class="num">05</p>
    <h2>No over-fitting, no test set</h2>
    <p>A more flexible <span class="term-q">q</span> can't over-fit here. In ordinary supervised learning "more flexible" risks fitting noise in the training data and failing on held-out data — that's the bias–variance trade-off. None of that applies, because:</p>
    <ul class="clean">
      <li>The target is the <strong>true posterior</strong> <span style="font-family:var(--mono)">p(Z|X)</span> — a fixed mathematical object, fully determined by your model and data.</li>
      <li>There is no noisy sample to over-fit and nothing to "generalise to," so there is no train/test split.</li>
    </ul>
    <p>It's closer to numerical approximation: adding more terms to approximate π just gets you nearer the true value. More flexibility → closer to the fixed target, full stop. The only cost is computational, not statistical. (Over-fitting can still appear one level up — if the <em>model</em> itself is too complex for the data — but that's separate from the inference step.)</p>
  </section>

  <!-- 6 -->
  <section>
    <p class="num">06</p>
    <h2>Mean-field: optimising one factor at a time</h2>
    <p>The mean-field assumption is that <span class="term-q">q</span> factorises over disjoint groups of latents:</p>
    <div class="eq q">$$q(Z)=\prod_i q_i(Z_i).$$</div>
    <p>Substituting this into the ELBO and isolating a single factor <span style="font-family:var(--mono)">q_j</span> (holding the rest fixed) gives the result the textbook calls (10.6):</p>
    <div class="eq">$$\mathcal{L}(q)=\int q_j\,\ln\tilde{p}(X,Z_j)\,dZ_j-\int q_j\ln q_j\,dZ_j+\text{const},$$</div>
    <p>which is just the negative KL between <span style="font-family:var(--mono)">q_j</span> and an effective distribution <span style="font-family:var(--mono)">p̃</span>. A KL is minimised when its two arguments match, so the optimal factor is:</p>
    <div class="eq q">$$\ln q_j^\star(Z_j)=\mathbb{E}_{i\neq j}\big[\ln p(X,Z)\big]+\text{const}.$$</div>
    <div class="note">
      <span class="label">Reading the update</span>
      To update one factor, take the expected log-joint <strong>averaged over all the other factors</strong>. Cycle through the factors and you have a coordinate-ascent algorithm on the ELBO.
    </div>
    <h3>"Fixed" ≠ "integrates to 1"</h3>
    <p>Holding <span style="font-family:var(--mono)">q_{i≠j}</span> fixed freezes their <em>functional form</em>. Normalisation (<span style="font-family:var(--mono)">∫q = 1</span>) is only a constraint every candidate must satisfy — it leaves the <em>shape</em> entirely free. Optimising over <span style="font-family:var(--mono)">q_j</span> is calculus of variations: searching over all valid distribution shapes for the best one, not tuning a single number.</p>
  </section>

  <!-- 7 -->
  <section>
    <p class="num">07</p>
    <h2>The two "const" terms</h2>
    <p>"+ const" appears twice and means something slightly different each time — but both are the same idea: <em>a quantity that doesn't depend on the thing currently being optimised.</em></p>
    <div class="tbl">
      <table>
        <thead><tr><th>where</th><th>what it is</th><th>constant w.r.t.</th></tr></thead>
        <tbody>
          <tr><td>eq (10.6)</td><td>minus the summed entropies of the other factors, <span style="font-family:var(--mono)">−Σ<sub>i≠j</sub> ∫ q<sub>i</sub> ln q<sub>i</sub></span></td><td>q<sub>j</sub></td></tr>
          <tr><td>update eq</td><td>the log-normaliser of <span style="font-family:var(--mono)">q<sub>j</sub>★</span></td><td>Z<sub>j</sub></td></tr>
        </tbody>
      </table>
    </div>
    <h3>Why normalising doesn't "change" the answer</h3>
    <p>Dividing an unnormalised <span style="font-family:var(--mono)">p̃</span> by its normaliser <span style="font-family:var(--mono)">C</span> rescales the whole curve uniformly — it moves no peak and changes no width. Crucially, every <em>relative</em> probability is untouched, because the <span style="font-family:var(--mono)">C</span> cancels:</p>
    <div class="eq">$$\frac{q^\star(a)}{q^\star(b)}=\frac{\tilde p(a)/C}{\tilde p(b)/C}=\frac{\tilde p(a)}{\tilde p(b)}.$$</div>
    <p>That ratio <em>is</em> the distribution's shape — all the meaningful content. The expectation hands you the shape; the const is just the ingredient that turns that shape into a legal density that integrates to 1. Recognise the form (e.g. "this is a Gaussian in Z<sub>j</sub>") and the normaliser comes for free.</p>
  </section>

  <!-- glossary -->
  <section>
    <p class="num">08</p>
    <h2>Quick reference</h2>
    <div class="tbl">
      <table>
        <thead><tr><th>symbol</th><th>meaning</th></tr></thead>
        <tbody>
          <tr><td>X</td><td>observed data</td></tr>
          <tr><td>Z</td><td>latent variables (and parameters too, in the fully Bayesian view)</td></tr>
          <tr><td>θ</td><td>parameters (when kept outside Z)</td></tr>
          <tr><td>p(X, Z)</td><td>the joint — you have this, you can evaluate it</td></tr>
          <tr><td>p(Z | X)</td><td>the posterior — you want this, it's intractable</td></tr>
          <tr><td>p(X)</td><td>the evidence / marginal likelihood — the hard normaliser</td></tr>
          <tr><td>q(Z)</td><td>your tractable approximation to the posterior</td></tr>
          <tr><td>𝓛(q)</td><td>the ELBO — the computable lower bound you maximise</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <footer>
    Variational inference · personal study note · based on Bishop, <em>Pattern Recognition and Machine Learning</em>, ch. 10 (approximate inference).
  </footer>

</div>

<script>
  // render math
  window.addEventListener("DOMContentLoaded", function(){
    if (window.renderMathInElement){
      renderMathInElement(document.body, {
        delimiters:[
          {left:"$$",right:"$$",display:true},
          {left:"$",right:"$",display:false}
        ],
        throwOnError:false
      });
    }
  });

  // signature interaction: ELBO <-> KL tradeoff, total fixed
  (function(){
    var slider = document.getElementById("slider");
    var elbo = document.getElementById("elbo");
    var kl = document.getElementById("kl");
    var pct = document.getElementById("pct");
    if(!slider) return;
    function update(){
      var v = +slider.value;
      elbo.style.flexBasis = v + "%";
      kl.style.flexBasis = (100 - v) + "%";
      pct.textContent = v + "%";
      // hide labels when a segment gets too thin
      elbo.querySelector("span").style.opacity = v < 48 ? 0 : 1;
      kl.querySelector("span").style.opacity = v > 90 ? 0 : 1;
    }
    slider.addEventListener("input", update);
    update();
  })();
</script>
</body>
</html>