# Learning to defer

## Consistent Estimators for Learning to Defer to an Expert (2020)

[Link](https://proceedings.mlr.press/v119/mozannar20b/mozannar20b.pdf)

A natural system loss functionL for the system consisting of the classifier in conjunction with the expert:

\begin{equation}
\begin{aligned}
L(h,r) = 
\mathbb{E}_{(x,y)\sim P,\; m\sim M\mid(x,y)}
\Big[
l(x,y,h(x))\,\mathbb{I}_{r(x)=0}
+
l_{\mathrm{exp}}(x,y,m)\,\mathbb{I}_{r(x)=1}
\Big]
\end{aligned}
\end{equation}

We learn 2 separate functions $h$ and $r$.

Consistency is used to prove that a proposed surrogate loss is a good candidate. Optimize consistent loss function can approximate the minimizers of the original loss.

\begin{equation}\label{eq:surrogate}
\begin{aligned}
    &\tilde{L}_{CE}(g_1, \cdots, g_{K+1}, x, c(1), \cdots, c(K+1)) \\
    &= - \sum_{i=1}^{K+1} \left( \max_{j \in [K+1]} c(j) - c(i) \right)
    \log \left( \frac{\exp(g_i(x))}{\sum_k \exp(g_k(x))} \right)
\end{aligned}
\end{equation}

Equation \(\eqref{eq:surrogate}\) is a general surrogate loss for cost-sensitive learning. If cost are configured to match expert deferral setting (costs are the misclassification error with the target), the general loss in \(\eqref{eq:surrogate}\) can become \(\eqref{eq:surr-01loss}\)

\begin{equation}\label{eq:surr-01loss}
\begin{aligned}
&L_{CE}(h, r, x, y, m) \\ 
&= - \log \left( \frac{\exp(g_y(x))}{\sum_{y' \in \mathcal{Y} \cup \perp} \exp(g_{y'}(x))} \right) - \mathbb{1}_{m=y} \log \left( \frac{\exp(g_\perp(x))}{\sum_{y' \in \mathcal{Y} \cup \perp} \exp(g_{y'}(x))} \right)
\end{aligned}
\end{equation}

$c$ is the cost, $g$ is the confidence

The smaller $c(i)$ is, the better choice $i$ is

The minimizer of the surrogate loss above are defined point-wise for all $x\in\mathcal{X}$

!!!note
    minimizer of a loss function is the value of parameters that makes the loss as small as possible. $\theta^* = \arg\min_{\theta} L(\theta)$

\[
\begin{aligned}
h^B(x) &= \arg\max_{y \in \mathcal{Y}} \eta_y(x), \\
r^B(x) &= \mathbb{I}_{\max_{y \in \mathcal{Y}} \eta_y(x) \leq \mathbb{P}(Y=M \mid X=x)}.
\end{aligned}
\]



