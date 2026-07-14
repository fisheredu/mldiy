# Sampling Methods

$$
\mathrm{var}[\hat{f}]=\frac{1}{L}\mathbb{E}[(f-\mathbb{E}[f])^2]
$$

- accuracy of estimator does not depend on diension of $\mathbf{z}$
- accuracy of estimator depends on $L$ but in principle small number of samples are sufficient

$y=f(z)$, $z\in U(0,1)$

$$
p(y) dy = p(z) dz
$$

$$
p(y) = p(z) \left|\frac{dz}{dy}\right| = \left|\frac{dz}{dy}\right|
$$

If transform $f$ is non-decreasing, we have $z = h(y) = f^{-1}(y)$ and $p(y) = \frac{dz}{dy}$

So 

$$
z = h(y) \equiv \int_{-\infty}^y p(\hat{y})d\hat{y}
$$

From this we can recover $p_Y(y) = p(y)$

since $h(y) = \int_{-\infty}^y p(\hat{y})d\hat{y}$ it is CDF of $p$, let's denote it as $F(y) \equiv h(y)$

!!! tip "proof"
    Note that $F_Y(y) = p(Y \leq y)$.
    
    Substitude with $Y = h^{-1}(Z)$ we have $p(Y \leq y) \Leftrightarrow p(Z \leq h(y))$. 
    
    Since $Z \sim U(0, 1)$, we have $p(Z \leq h(y)) \Leftrightarrow h(y)$. 
    
    Thus we have $F_Y(y) = h(y) \equiv \int_{-\infty}^y p(\hat{y})d\hat{y}$ and deferrentiate gives $p_Y(y) = p(y)$

??? example "11.3"
    For Cauchy distribution $y$, $y=\tan(\pi z- \pi / 2)$.


The idea is that for any one-dimensional target distribution with CDF $F$, there is a mapping

$$g:(0,1)\to \mathbb R$$

such that, if $Z\sim U(0,1)$ then $Y=g(Z)$ has the target distribution.

??? example "11.4"

    Define $\rho = y_1^2 + y_2^2 = -2 \ln r^2$, then 

    $$
    \left|
    \frac{\partial(y_1,y_2)}
    {\partial(z_1,z_2)}
    \right|
    =
    \left|
    \frac{\rho\,d\rho}
    {r\,dr}
    \right|
    =
    \frac{\rho}{r} \frac{2}{r \rho}
    =
    \frac{2}{r^2}
    =
    \frac{2}{\exp\left(\frac{-(y_1^2 + y_2^2)}{2}\right)}
    $$

    So $\left|
    \frac{\partial(z_1,z_2)}
    {\partial(y_1,y_2)}
    \right| = \frac{1}{2} \exp\left(\frac{-(y_1^2 + y_2^2)}{2}\right)$