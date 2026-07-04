# Universal Model Routing for Efficient LLM Inference

> 📄 **Paper:** [Universal Model Routing for Efficient LLM Inference (arXiv:2502.08773)](https://arxiv.org/pdf/2502.08773)


Assume $(x, y) \sim \mathbb{P}$, where x is the prompt and y is the correct answers

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

!!! note
    $\gamma^{(m)}_{\mathrm{kNN}}(x) = \frac{1}{k} \sum _{i \in NN(x, k)} \ell(x^{(i)}, y^{(i)}, p^{(m)})$ where $NN(x, k)$ denotes the k-th nearest neighbor**s** of (the embeddings of) $x$ in $S_{tr}$

## Dynamic LLMs Pool

Static routing estimates model-specific loss: $\gamma^{(m)}(x)$

This only works for a fixed LLM pool. If a new LLM appears, the router has no output for it. **UniRoute instead estimates: $\gamma(x,h)$**, meaning: expected loss of model \(h\) on prompt \(x\).

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
\text{set of all possible sets of LLMs (superset)}
$$

During training, you observe one set of models: $\mathcal H_{\text{tr}}=\{h_{\text{tr}}^{(1)},\dots,h_{\text{tr}}^{(M)}\}$

During evaluation/testing, you may need to route among another set: $\mathcal H_{\text{te}} = \{h_{\text{te}}^{(1)},\dots,h_{\text{te}}^{(N)}\}$

We assume $\mathcal{H}_{\text{tr}} \sim \mathfrak{H}$, where $\mathfrak{H}$ is a _meta-distribution_ over $\mathbb{H}$

!!! note
    meta-distribution means a distribution over model pools, not over prompt or single model.

If:
$\mathcal H_{\text{tr}}=\mathcal H_{\text{te}}$
then it is the normal/static routing problem.

But they want to allow:
$\mathcal H_{\text{tr}}\ne \mathcal H_{\text{te}}$
Even more extreme:
$\mathcal H_{\text{tr}}\cap \mathcal H_{\text{te}}=\emptyset$

Now the router becomes:

$$
r(\cdot,\mathcal H):\mathcal X \to [|{\color{red}\mathcal H}|]
$$
This means the router takes two things:
$$
r(x, {\color{red}\mathcal H})
$$
where:

* x is the input prompt
* ${\color{red}\mathcal H}$ is the current candidate set of LLMs

Then it returns an index:
$$
r(x,\mathcal H)=m
$$
meaning: For prompt x, among the models in $\mathcal H$, choose the m-th model.

The dynamic routing rule is:

$$
r(x,\mathcal H_{\text{te}})
=
\arg\min_{h\in\mathcal H_{\text{te}}}
\left[
\gamma(x,h)+\lambda c(h)
\right]
$$

### Target Objective

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


### Optimal Dynamic Pool Routing

“Under a mild regularity condition on $\mathbb{P}$” is a technical assumption needed to justify converting the constrained optimization problem into a **Lagrangian form**.

LLM candidat set $\mathcal{H} \in \mathbb{H}$, lagrange multiplier $\lambda_{\mathfrak{H}} \ge 0$

$$
r^*(x,\mathcal{H})
=
\arg\min_{m \in [|\mathcal{H}|]}
\left[
\mathbb{E}_{y \mid x}
\left[
\ell(x,y,h^{(m)})
\right]
+
\lambda_{\mathfrak{H}} \cdot c(h^{(m)})
\right]
$$

#### Assume 0-1 Loss

$$
r^*(x,\mathcal{H})
=
\arg\min_{m \in [|\mathcal{H}|]}
\left[
\mathbb{P}[y \neq h^{(m)}(x) \mid x]
+
\lambda_{\mathfrak{H}} \cdot c(h^{(m)})
\right]
$$

## Main Idea

Represent both prompts and LLMs as vectors:

$$
\Phi(x)\in\mathbb R^K
$$

$$
\Psi(h)\in\mathbb R^K
$$

Then estimate loss by dot product:

$$
\gamma_{\text{uni}}(x,h)
=
\Phi(x)^\top \Psi(h)
$$

where:

- \(\Phi(x)\): what kind of prompt \(x\) is
- \(\Psi(h)\): what kind of prompts model \(h\) is good/bad at

## LLM Feature Vector

Use a small validation set:

$$S_{\text{val}}=\{(x^{(j)},y^{(j)})\}_{j=1}^{N_{\text{val}}}$$

Run model $h$ on each validation prompt and record whether it is wrong:

$$\left(\mathbf 1(y^{(j)}\ne h(x^{(j)}))\right)_{j\in[N_{\text{val}}]}$$

Example:

$$[\text{wrong},\text{correct},\text{correct},\text{wrong}]\rightarrow[1,0,0,1]$$

More generally:

$$\Psi(h)=F\left(\left(\mathbf 1(y^{(j)}\ne h(x^{(j)}))\right)_{j\in[N_{\text{val}}]}\right)$$

## Why This Handles New LLMs

For a new model $h_{\text{new}}$:

1. Run it on $S_{\text{val}}$
2. Compute $\Psi(h_{\text{new}})$
3. Use the same routing rule:

$$\gamma(x,h_{\text{new}})=\Phi(x)^\top \Psi(h_{\text{new}})$$

So no router retraining is needed.

## Cluster-Based UniRoute

Instead of using every validation example directly, group prompts into $K$ clusters.

### Step 1: Cluster training prompts

Use prompt embeddings $\phi(x)$ and run K-means to get $K$ clusters.

Each prompt gets cluster membership:

$$
\Phi_{\text{clust}}(x)\in\{0,1\}^K
$$

Example:

$$
\Phi_{\text{clust}}(x)=[0,1,0]
$$

means prompt $x$ belongs to cluster 2.

### Step 2: Compute per-cluster LLM errors

For cluster $k$:

$$
C_k=\{(x,y)\in S_{\text{val}}:\Phi_{\text{clust},k}(x)=1\}
$$

For model $h$:

$$
\Psi_{\text{clust},k}(h)=\frac{1}{|C_k|}\sum_{(x,y)\in C_k}\mathbf 1(y\ne h(x))
$$

So $\Psi_{\text{clust}}(h)$ is the vector of average errors across clusters.

## Cluster-Based Estimator

$$
\gamma_{\text{clust}}(x,h)=\Phi_{\text{clust}}(x)^\top\Psi_{\text{clust}}(h)
$$

If:

$$
\Phi_{\text{clust}}(x)=[0,1,0],\qquad \Psi_{\text{clust}}(h)=[0.2,0.6,0.1]
$$

then:

$$
\gamma_{\text{clust}}(x,h)=0.6
$$

Meaning: model $h$'s estimated error on this prompt is its average error on cluster 2.

## Learned Cluster Map

Instead of hard cluster assignment:

$$
\Phi_{\text{clust}}(x)\in\{0,1\}^K
$$

the paper can learn a soft assignment:

$$
\Phi_{\text{clust}}(x;\theta)\in[0,1]^K
$$

Example:

$$
\Phi_{\text{clust}}(x;\theta)=[0.1,0.7,0.2]
$$

This means the prompt partly belongs to multiple clusters.

## Experiment Logic

There are two splits.

### LLM split

$$
\mathcal H_{\text{tr}}\quad\text{and}\quad\mathcal H_{\text{te}}
$$

This tests generalization to unseen LLMs.

### Example split

$$
S_{\text{tr}},S_{\text{val}},S_{\text{test}}
$$

$S_{\text{tr}}$ trains the router or clusters, $S_{\text{val}}$ computes LLM feature vectors $\Psi(h)$, and $S_{\text{test}}$ is used for final evaluation.

Validation and test examples are different, but validation and testing use the same test-time LLM pool $\mathcal H_{\text{te}}$, because the router must compute feature vectors for the same LLMs it will route among.

## Experiments

Val examples and test examples are different

Val LLM pool and test LLM pool are same $\mathcal{H}_{te}$

### Baseline

For the oracle baseline, they cheat a little for comparison. They assume the router already knows both training and testing LLMs during training.

So instead of training on only: $\mathcal H_{\text{tr}}$, the oracle trains using: $\mathcal H_{\text{tr}} \cup \mathcal H_{\text{te}}$

That means it has outputs for both seen and unseen LLMs. This is not allowed in the real dynamic setting, because test LLMs are supposed to be unseen. But it gives an upper bound: “how good could this baseline be if it had access to the test LLMs during training?”


