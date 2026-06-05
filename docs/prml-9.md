# Chapter 9: Mixture Models and EM

## 9.1. K-means clustering

an assignment of data points to clusters as well as a set of vector $\{\mu_k\}$.

The sume of the squares of the distance of each data points to its closest vector $\mu_k$ is a minimum.

1-of-K coding scheme

distortion measure 

$$J = \sum_{n=1}^N \sum_{k=1}^K r_{nk} ||x_n - \mu_k||^2$$

| K-means | EM | step |
|------------------|-------------------|--|
| update $r_{n,k}$ | E expectation step | take 1 if k is min |
| update $\mu_k$   | M maximization step| mean of points assigned to k |

It may converge to a local rather tha global minimum of J


K-medoids

$$J=\sum_{n,k} r_{nk} V(x_n,\mu_k)$$

Instead of allowing \mu_k to be any point in space, K-medoids restricts $\mu_k \in \{x_1,\dots,x_N\}$

More specifically, each prototype must be one of the data points assigned to the cluster.

That representative data point is called the medoid.

So unlike:

- K-means → prototype = average point
- K-medoids → prototype = actual data point

now optimization becomes a finite search problem with $O(N_k^2)$ complexity


## 9.2. Mixture of Gaussians

$$
    \gamma(z_k) = \frac{\pi_k \mathcal{N}(\mathbf{x} \mid \boldsymbol{\mu}_k, \boldsymbol{\Sigma}_k)}{\displaystyle \sum_{j=1}^{K} \pi_j \mathcal{N}(\mathbf{x} \mid \boldsymbol{\mu}_j, \boldsymbol{\Sigma}_j)}
$$

$\gamma(zk)$ is the corresponding **posterior** probability once we have observed $x$. 
As we shall see later, $\gamma(zk)$ can also be viewed as the responsibility that component $k$ takes for ‘explaining’ the observation $x$.

In the expectation step, or E step, we use the current values for the parameters to evaluate the posterior probabilities, or responsibilities $\gamma$

We then use these probabilities in the maximization step, or M step, to re-estimate the means, covariances, and mixing coefficients using the results (9.17), (9.19), and (9.22)

9.17:

$$\boldsymbol{\mu}_k = \frac{1}{N_k} \sum_{n=1}^N \gamma(z_{nk})\mathbf{x}_n$$

9.19:

$$
\boldsymbol{\Sigma}_k = \frac{1}{N_k} \sum_{n=1}^N \gamma(z_{nk})(\mathbf{x}_n - \boldsymbol{\mu}_k)(\mathbf{x}_n - \boldsymbol{\mu}_k)^\mathrm{T}
$$

9.22:

$$\pi_k = \frac{N_k}{N}$$

