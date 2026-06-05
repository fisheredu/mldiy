Derivative

$\frac{\partial}{\partial \mu}(x^T\mu)=x$

Derivative of Gaussian w.r.t. mean $\mu$:

$$\nabla_{\boldsymbol{\mu}} p(\mathbf{x} | \boldsymbol{\mu}, \boldsymbol{\Sigma}) = p(\mathbf{x} | \boldsymbol{\mu}, \boldsymbol{\Sigma}) \Big( \boldsymbol{\Sigma}^{-1} (\mathbf{x} - \boldsymbol{\mu}) \Big)$$

Proof:

Collary 1. $\nabla_z(z^TAz) = (A+A^T)z$ 

Proof of C.1: https://www.cs.ubc.ca/~schmidtm/Courses/340-F16/linearQuadraticGradients.pdf

Then $\nabla_\mu((x-\mu)^T\Sigma^{-1}\mu) = 2\Sigma^{-1}(x-\mu)$

So $\nabla_{\boldsymbol{\mu}} p(\mathbf{x} | \boldsymbol{\mu}, \boldsymbol{\Sigma}) = \nabla_{\boldsymbol{\mu}} C\cdot \exp(-\frac{1}{2}(x-\mu)^T\Sigma^{-1}\mu) = -\mathcal{N}(x\mid \mu,\Sigma)\Sigma^{-1}(x-\mu)$
