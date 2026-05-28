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

# Chapter 10: Approximate Inference

Here we discuss deterministic approximation schemes. These schemas are based on approximation to the posterior distribution.

Therefore, they will not be the exact result. 

VI: variational inference / variational Bayes

## 6.1 Variational Inference

Find derivative of the variation functions. 

functional: a mapping that takes a function as the input and returns the value of the functional as the output. e.g. $H(p) = \int p(x) \ln p(x) dx$

functional derivative

an optimization problem in which the quantity being optimized is a functional.

factorization assumption: we deliberately assume that a complicated probability distribution can be written as a product of simpler distributions


