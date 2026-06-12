# Chapter 10: Approximate Inference

Here we discuss deterministic approximation schemes. These schemas are based on approximation to the posterior distribution. 

Therefore, they will not be the exact result. 

VI: variational inference / variational Bayes

## 6.1 Variational Inference

Find derivative of the variation functions. 

!!!note 
    **functional**: a mapping that takes a function as the input and returns the value of the functional as the output. e.g. $H(p) = \int p(x) \ln p(x) dx$

functional derivative: expresses how the value of the functional changes in response to infinitesimal changes to the input function.

an optimization problem in which the quantity being optimized is a functional.

Why it finds approximate solution: we restrict the range of functions over which the optimization is performed.

factorization assumption: we deliberately assume that a complicated probability distribution can be written as a product of simpler distributions


