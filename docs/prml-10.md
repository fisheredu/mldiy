# Chapter 10: Approximate Inference

Here we discuss deterministic approximation schemes. These schemas are based on approximation to the posterior distribution. 

Therefore, they will not be the exact result. 

VI: variational inference / variational Bayes

## 6.1 Variational Inference

Find derivative of the variation functions. 

!!!note 
    **functional**: a mapping that takes a function as the input and returns the value of the functional as the output. e.g. $H(p) = \int p(x) \ln p(x) dx$

**functional derivative**: expresses how the value of the functional changes in response to infinitesimal changes to the input function.

Today we are interested in an optimization problem in which the quantity being optimized is a **functional**.

Why it finds approximate solution: we restrict the range of functions over which the optimization is performed.

factorization assumption: we deliberately assume that a complicated probability distribution can be written as a product of simpler distributions

### What we have

a probabilistic model that specifies the joint distribution:

$$
p(X,Z)
$$

where 

- X = observed data
- Z = latent variables (or parameters in fully Bayesian setting)

### The 2 Goals

Goal 1: Approximate the posterior $p(Z\mid X)$. Given observed data, what do we believe about the latent variables? This is inference: updating beliefs about the unknowns

Goal 2: Compute the model evidence $p(X)$ How likely is the observed data under this model?
This is marginal likelihood: integrating out all unknowns. Useful for model comparison

!!! warning
    This is generative models: You have unlabeled data; you learn the underlying structure. It is not classifier

**Claim: Using more flexible approximations simply allows us to approach the true posterior distribution more closely.**

When you make your approximating distribution $q(Z)$ more flexible, you don't overfit. You just get closer to the true posterior $p(Z\mid X)$.

In variational inference, you're solving a fixed mathematical problem, not learning a generalizable pattern. You have your observed data $X$ (all of it). You have your model $p(X,Z)$

The true posterior $p(Z\mid X)$ is completely determined by these two things

Your job: approximate that fixed target as closely as possible. There's nothing to "generalize to"—you just want a good approximation

<details>
<summary>Proof</summary
```latex
\begin{equation}
\begin{aligned}
\mathcal{L}(q) = \int q(Z) \ln \left\{ \frac{p(X,Z)}{q(Z)} \right\} dZ
\end{aligned}
\end{equation}
```

The assumption we made is factorization assumption

$$
q(Z) = \prod _{i=1}^M q_i(Z_i)
$$

Starting from line 1:

\begin{equation}
\mathcal{L}(q) = \int \prod_i q_i \left\{ \ln p(\mathbf{X}, \mathbf{Z}) - \sum_i \ln q_i \right\} d\mathbf{Z}
\end{equation}

Split the curly brace into two terms:

\begin{equation}
\mathcal{L}(q) = \underbrace{\int \prod_i q_i \, \ln p(\mathbf{X}, \mathbf{Z}) \, d\mathbf{Z} }_{\text{Term A}} - \underbrace{\int \prod_i q_i \sum_i \ln q_i \, d\mathbf{Z}}_{\text{Term B}}
\end{equation}

Integrate out all variables $\mathbf{Z}_i$ with $i \neq j$ first, leaving a function of $\mathbf{Z}_j$:

\begin{equation}
\int \prod_i q_i \, \ln p(\mathbf{X}, \mathbf{Z}) \, d\mathbf{Z}
= \int q_j \left[ \int \ln p(\mathbf{X}, \mathbf{Z}) \prod_{i \neq j} q_i \, d\mathbf{Z}_i \right] d\mathbf{Z}_j
\end{equation}

Bring the integral inside the sum:

\begin{equation}
\int \prod_k q_k \sum_i \ln q_i \, d\mathbf{Z}
= \sum_i \int \prod_k q_k \, \ln q_i \, d\mathbf{Z}
\end{equation}

For each term in the sum, every factor $q_k$ with $k \neq i$ integrates to 1:

\begin{equation}
\int \prod_k q_k \, \ln q_i \, d\mathbf{Z}
= \left( \int q_i \ln q_i \, d\mathbf{Z}_i \right) \underbrace{\prod_{k \neq i} \int q_k \, d\mathbf{Z}_k}_{=\,1}
= \int q_i \ln q_i \, d\mathbf{Z}_i
\end{equation}

So Term B collapses to:

\begin{equation}
\text{Term B} = \sum_i \int q_i \ln q_i \, d\mathbf{Z}_i
= \int q_j \ln q_j \, d\mathbf{Z}_j + \sum_{i \neq j} \int q_i \ln q_i \, d\mathbf{Z}_i
\end{equation}

Since we optimize only with respect to $q_j$, the second sum is constant.

\begin{equation}\label{eq:loss}
\mathcal{L}(q) = \int q_j \left\{ \int \ln p(\mathbf{X}, \mathbf{Z}) \prod_{i \neq j} q_i \, d\mathbf{Z}_i \right\} d\mathbf{Z}_j - \int q_j \ln q_j \, d\mathbf{Z}_j + \text{const}
\end{equation}

Remember that 
\begin{equation}
D_{KL}(P \| Q) = \int P(x) \ln \frac{P(x)}{Q(x)} dx = - \int P(x) \ln Q(x) dx + \int P(x) \ln P(x) dx
\end{equation}

We can see that \(\eqref{eq:loss}\) match this, with $$P(x) = q_j(Z_j)$$ and $$Q(x) = \exp(\mathbb{E}_{i\neq j}[\ln p(X,Z)])$$
</details>

The optimal solution for $q_j$ is

\begin{equation}
q_j^* = \exp(\mathbb{E}_{i\neq j}[\ln p(X,Z)] + \mathrm{const}) = \exp\left( \int \ln p(X,Z) \prod_{i \neq j} q_j d Z_i + \mathrm{const}\right)
\end{equation}

It says that the log of the optimal solution for factor \(q_j\) is obtained simply by considering the log of the joint distribution over all hidden and visible variables and then taking the expectation with respect to all of the other factors \(\{q_i\}\) for \(i \neq j\)




