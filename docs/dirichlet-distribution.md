# The Dirichlet Distribution

a landscape of possibility

## Beta-distribution

Problem: Probabilty of getting head after got 5 heads and 10 tails. We can think of it as a "distribution over binomials distributions".

Model: $\mathrm{Beta}(\alpha = 6, \beta = 11)$

PDF for Beta $X \sim \mathrm{Beta}(a, b)$
$$
f(x) = \frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}x^{a-1}(1-x)^{b-1} = \frac{1}{B(a,b)} x^{a-1}(1-x)^{b-1}
$$

![Beta(6,11) PDF graph](./images/beta.png)

Gamma function generalizes factorial: $\Gamma(t) = t \cdot \Gamma(t-1)$

Beta is the conjugate prior of Binomial.

## More Categories?

### Multinomial Distribution

\begin{aligned}
P(x_1,\ldots,x_K \mid N,p_1,\ldots,p_K)
&= {N \choose x_1,\ldots,x_K} \prod_{i=1}^K p_i^{x_i} \\
&= \frac{N!}{x_1! \cdots x_K!} \prod_{i=1}^K p_i^{x_i}
\end{aligned}

### Dirichlet Distribution

$$
p(P = \{p_i\} \mid \alpha_i)
=
\frac{\Gamma\left(\sum_i \alpha_i\right)}
{\prod_i \Gamma(\alpha_i)}
\prod_i p_i^{\alpha_i - 1}
$$

The scale (or concentration) $\sigma = \sum_i \alpha_i$ and the base measure $\alpha_i' = \frac{\alpha_i}{\sigma}$. $\alpha' = (\alpha_1', \ldots, \alpha_K')$ tells you the average probability vector.

Beta distribution is a Dirichlet distribution with $K=2$. Dirichlet is a distribution over Multinomials (in the simplex $\sum_{i=1}^K p_i = 1; p_i \ge 0$).

Every draw is a probability vector.

Conjugate to multi-nomial distribution.

Used in **Topic Modeling in NLP**

### Visual Representation: Probability Simplex




