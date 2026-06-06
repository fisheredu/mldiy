# Distribution

## Exponential Family

The exponential family of distribution over $x$, given some parameters $\eta$, is defined to be the set of distributions of the form

\begin{equation}\label{eq:exp-fam}
p(x\mid \eta) = h(x) g(\eta) \exp\left\{\eta^T u(x)\right\}
\end{equation}

$\eta$: natural parameters of the distribution
$g(\eta)$: coefficient to ensure distribution is normalized and satisfies $g(\eta) \int_x h(x) \exp\{\eta^Tu(x)\}dx = 1$

### Bernoulli distribution

\begin{aligned}
p(x\mid \eta) &= \mathrm{Bern}(x\mid \mu) = \mu^x(1-\mu)^{1-x} \\
&= \exp\left\{x\ln\mu + (1-x)\ln\left(1-\mu\right)\right\} \\
&= \exp\left\{x\ln\left(\tfrac{\mu}{1-\mu}\right) + \ln\left(1-\mu\right)\right\} \\
&= (1-\mu) \exp\left\{\ln\left(\frac{\mu}{1-\mu}\right) x\right\} \\
\end{aligned}

Here $\eta = \ln\left(\frac{\mu}{1-\mu}\right)$, then we have


\begin{aligned}
p(x\mid \eta) &= (1-\sigma(\eta))\exp(\eta x) \\
&= \sigma(-\eta) \exp(\eta x)
\end{aligned}


Compare with equation \(\eqref{eq:exp-fam}\), we can see

- $u(x) = x$
- $h(x) = 1$
- $h(\eta) = \sigma(-\eta)$

### Multinomial Distribution

$$
p(x \mid \mu) = \prod_{k=1}^M \mu_k^{x_k} = \exp\left\{\sum_{k=1}^M x_k \ln \mu_k\right\}
$$

We can also write in \(\eqref{eq:exp-fam}\) such that $\eta = \ln \mu$ and $p(x\mid \eta) = \exp(\eta^T x)$

- $u(x) = x$
- $h(x) = 1$
- $g(\eta) = 1$

But because of the constraint $\sum_{k=1}^M \mu_k = 1$ and $\sum_{k=1}^M x_k = 1$ (since prml use one-hot representation)

Thus

\begin{equation}
\begin{aligned}
    \exp\left\{ \sum_{k=1}^{M} x_k \ln \mu_k \right\}
    &= \exp\left\{ \sum_{k=1}^{M-1} x_k \ln \mu_k
    + \left( 1 - \sum_{k=1}^{M-1} x_k \right) \ln\left( 1 - \sum_{k=1}^{M-1} \mu_k \right) \right\} \\
    &= \exp\left\{ \sum_{k=1}^{M-1} x_k \ln\left( \frac{\mu_k}{1 - \sum_{j=1}^{M-1} \mu_j} \right)
    + \ln\left( 1 - \sum_{k=1}^{M-1} \mu_k \right) \right\}.
\end{aligned}
\end{equation}


Here define $\eta_k = \ln\left( \frac{\mu_k}{1 - \sum_{j=1}^{M-1} \mu_j} \right)$ and solve for $\mu_k$ gives

\[
    \mu_k = \frac{\exp(\eta_k)}{1 + \sum_{j=1}^{M-1} \exp(\eta_j)}
\]

!!! note "Tip"
    The expression derived in PRML is

    \[
    \mu_k
    =
    \frac{\exp(\eta_k)}
    {1+\sum_{j=1}^{M-1}\exp(\eta_j)},
    \qquad k=1,\ldots,M-1,
    \]

    which may appear different from the usual softmax

    \[
    \mu_k
    =
    \frac{\exp(\eta_k)}
    {\sum_{j=1}^{M}\exp(\eta_j)},
    \qquad k=1,\ldots,M.
    \]

    The reason is that the multinomial distribution has only \(M-1\) independent parameters and $\exp(\mu_M) = \exp\ln(\frac{\mu_M}{\mu_M}) = 1$.



Thus $A(\eta) = \ln\left( 1 - \sum_{k=1}^{M-1} \mu_k \right) = \ln (1+\sum_{k=1}^{M-1} \exp(\eta_k))$.

!!! note "Tip"
    The two forms of the exponential family are equivalent:

    \[
    p(x\mid\eta)
    =
    h(x)\,g(\eta)\,\exp\{\eta^T u(x)\},
    \]

    and

    \[
    p(x\mid\eta)
    =
    h(x)\,\exp\{\eta^T u(x)-A(\eta)\}.
    \]

    with $A(\eta)=-\ln g(\eta)$.

- $u(x) = x$
- $h(x) = 1$
- $g(\eta) = \left(1 + \sum_{k=1}^{M-1} \exp(\eta_k)\right)^{-1}$