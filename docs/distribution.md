# Distribution

## Exponential Family

The exponential family of distribution over $x$, given some parameters $\eta$, is defined to be the set of distributions of the form

```latex
\begin{equation}\label{eq:exp-fam}
p(x\mid \eta) = h(x) g(\eta) \exp\left\{\eta^T u(x)\right\}
\end{equation}
```

$\eta$: natural parameters of the distribution

### Bernoulli distribution


```latex
\begin{aligned}
p(x\mid \eta) &= \mathrm{Bern}(x\mid \mu) = \mu^x(1-\mu)^{1-x} \\
&= \exp\left\{x\ln\mu + (1-x)\ln\left(1-\mu\right)\right\} \\
&= \exp\left\{x\ln\left(\tfrac{\mu}{1-\mu}\right) + \ln\left(1-\mu\right)\right\} \\
&= (1-\mu) \exp\left\{\ln\left(\frac{\mu}{1-\mu}\right) x\right\} \\
\end{aligned}
```

Here $\eta = \ln\left(\frac{\mu}{1-\mu}\right)$, then we have


```latex
\begin{aligned}
p(x\mid \eta) &= (1-\sigma(\eta))\exp(\eta x) \\
&= \sigma(-\eta) \exp(\eta x)
\end{aligned}
```

Compare with equation \(\eqref{eq:exp-fam}\), we can see

- $u(x) = x$
- $h(x) = 1$
- $h(\eta) = \sigma(-\eta)$


