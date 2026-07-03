

https://arxiv.org/pdf/2502.08773

\[
\begin{aligned}
\min_{r:\mathcal X \to [M]}
\quad
& \sum_{m \in [M]}
\mathbb E_{(x,y)}
\left[
\mathbf 1(r(x)=m)\cdot \ell(x,y,h^{(m)})
\right] \\
\text{s.t.}
\quad
& \sum_{m \in [M]}
\mathbb E_{(x,y)}
\left[
\mathbf 1(r(x)=m)\cdot c^{(m)}
\right]
\le B .
\end{aligned}
\]

That is, we try to minimize the expected loss over routed LLM, while keeping the expected query cost under budget $B$.

## Routering Strategies

For a fixed set of LLM $\{p^{(m)}\}_{m \in [M]}$

we learn a router that routes via

\begin{equation}
r(x) = \arg\min_{m\in [M]} [\gamma^{(m)}(x) + \lambda c^{(m)}]
\end{equation}

$\lambda$ is hyperparameter

<ul>
    <li> randomly assigns prompts to the various models</li>
    <li> estimate the expected loss of model m on prompt x. \(\gamma^{(m)}_{\mathrm{lin}}(x)\) </li>
    <li> k-NN estimater \(\gamma^{(m)}_{\mathrm{kNN}}(x)\) </li>
</ul>

## Dynamic LLMs Pool

$$
\mathcal H_{\text{all}}
=
\{
\text{GPT-4}, \text{Claude}, \text{Gemini}, \text{Llama}, \text{Mistral}, \dots
\}
$$

$$
\mathbb H
=
\text{set of all possible sets of LLMs}
$$

During training, you observe one set of models:

$$
\mathcal H_{\text{tr}}
=
\{h_{\text{tr}}^{(1)},\dots,h_{\text{tr}}^{(M)}\}
$$

During evaluation/testing, you may need to route among another set:

$$
\mathcal H_{\text{te}}
=
\{h_{\text{te}}^{(1)},\dots,h_{\text{te}}^{(N)}\}
$$

If:
$\mathcal H_{\text{tr}}=\mathcal H_{\text{te}}$
then it is the normal/static routing problem.

But they want to allow:
$\mathcal H_{\text{tr}}\ne \mathcal H_{\text{te}}$
Even more extreme:
$\mathcal H_{\text{tr}}\cap \mathcal H_{\text{te}}=\emptyset$

Now the router becomes:

$$
r(\cdot,\mathcal H):\mathcal X \to [|\mathcal H|]
$$
This means the router takes two things:
$$
r(x,\mathcal H)
$$
where:

* x is the input prompt
* $\mathcal H$ is the current candidate set of LLMs

Then it returns an index:
$$
r(x,\mathcal H)=m
$$
meaning: For prompt x, among the models in $\mathcal H$, choose the m-th model.

### Target

$$
\min_{r\in\mathcal R}
\mathbb E
\left[
\sum_{m\in[|\mathcal H|]}
\mathbf 1(r(x,\mathcal H)=m)
\cdot
\ell(x,y,h^{(m)})
\right]
$$

subject to:
$$
\mathbb E
\left[
\sum_{m\in[|\mathcal H|]}
\mathbf 1(r(x,\mathcal H)=m)
\cdot
c(h^{(m)})
\right]
\le B
$$

Choose a dynamic router r that minimizes expected loss, while keeping expected cost under budget B.

The **expectation** is over: $(x,y,\mathcal H)$

So randomness comes from both:

1. the prompt-answer pair (x,y)
2. the available LLM set $\mathcal H$

