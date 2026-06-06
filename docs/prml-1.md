# Chapter 1: Introduction

## MLE & MAP

### Maximum Liklihood Probability

"I look at my data and I produce the $w$ that explains the data the best."

$$
\hat{Y}_{\mathrm{MAP}} = \arg\max \Pr(Y=y \mid D) = \arg\max \frac{\Pr(D \mid Y=y) \Pr(Y=y)}{\Pr(D)}
$$

Because we are doing argmax, we don't care about $P(D)$. (Realization)

### Maximum a Posteriori

"I also take into consideration of the prior of the $w$."

Likelihood function:

$$
p(t \mid X,w,\sigma^2) = \prod_{n=1}^N \mathcal{N}(t_n \mid w^T \phi(x_n), \sigma^2)
$$

$\phi$: design matrix. N (number of samples) x M (number of features)

Prior:

$$
p(w \mid 0, \tau^2) = \frac{1}{(2\pi \tau^2)^{\frac{M}{2}}} \exp(-\frac{\|w\|^2}{2\tau^2})
$$

Posterior: (by taking -log, we minimise thedata term + prior term)

$$
p(w \mid t) \propto 
$$

### Revisit

| Task | Loss | Requirment |
| --- | --- | --- |
| MLE | ordinary least square | Linear regression w/ gaussian noise |
| MAP | ordinary least square + $L_2$ | Ridge regression w/ 0-mean gaussian prior |

## Bias Variance Tradeoff

### Bias

expected deviation between the predicted value and the true value

### Variance

2 sources

- noise in the data: variation in the training data (usually cannot change)
- model variance: sensitivity to variation in the training data

### Decomposition


\begin{aligned}
E[(t - f_w(x))^2] &= E[(t-h(x))^2] + E[(h(x)-f_w(x))^2] + 2E[(t-h(x))(h(x)-f_w(x))] \\
&= E[(t-h(x))^2] + E[(h(x)-f_w(x))^2] \quad \text{independent and $E(\epsilon) = 0$} \\
&= \mathrm{Noise\ term} + \mathrm{Rest} \\
&= E[(t-h(x))^2] + (h(x) - E[f_w(x)])^2 + E[(E[f_w(x)] - f_w(x))^2] \\
&= \mathrm{Noise\ term} + \mathrm{Bias}^2 + \mathrm{Model\ Variance}
\end{aligned}

!!! warning "In real life"
    In real life we cannot compute $h(x)$ (real function). 

| $\lambda$ | Train error | Test error |
| --- | --- | --- |
| smaller | down | unclear |
| larger | up | unclear |
