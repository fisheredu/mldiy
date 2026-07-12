# Sample Efficient Learning of Predictors that Complement Humans

The writer is perticularly interested in "active learning". In which author claims can "minimally querying the human on selected points".

The setting of l2d is different from "teaching the human about the AI models error boundary" or "machine teaching" as l2d has no restrictions on the parameterization of their rejector.

Parameterization means assuming the rejector to have a particular simple form. e.g. $r_\theta(x)=\mathbf{1}\{g_\theta(x)>0\}$


$M \sim \mu_{M\mid X,Y}$ means that the expert prediction is generated according to a conditional distribution that may depend on both the input $X$ and the true label $Y$.

staged learning is essentially the same as 2-staged l2d.

$$
\Delta(d_1,d_2)
=
\inf_{(\mathcal H,\mathcal R)\in\mathfrak H_{d_1,d_2}}
\;
\sup_{\mu_{XYM}}
\left[
L_{\mathrm{def}}^{0-1}(\hat h,\hat r)
-
L_{\mathrm{def}}^{0-1}(h^*,r^*)
\right]
$$

measures the worst-case performance gap between staged learning and joint learning, when the classifier and rejector have fixed complexities $d_1$ and $d_2$. 

$$
\frac{1}{d(\mathcal H)+1}
\le
\Delta(d(\mathcal H),d(\mathcal R))
\le
\frac{d(\mathcal R)}{d(\mathcal H)}.
$$

- the more complex $\mathcal{H}$ is, the smaller the gap is.
- if our hypothesis class $\mathcal{H}$ is comparatively much richer than the rejector class $\mathcal{R}$, the gap between the joint and staged learning reduce
- defer to human may still be needed, even if $\Delta(d_1, d_2)$ is small