# Probability Graphical Model

A graph comprises **nodes** (also called vertices) connected by **links** (also known as edges or arcs). 

In a probabilistic graphical model, each node represents a random variable (or group of random variables), and the links express probabilistic relationships between these variables.

- Bayesian networks (directed graphical models)
- Markov random fields (undirected graphical models)
- factor graph

$$
p(x_1, \ldots, x_n) = \prod_{i=1}^n p(x_i \mid \mathrm{pa}(x_i)) = p(x_n \mid x_1, \ldots, x_{n-1}) \ldots p(x_2 \mid x_1) p(x_1)
$$

??? note "Tip"
    ## Drawing graphical models

    For this MkDocs site, the easiest code-based option is a Mermaid diagram in a Markdown code fence.

    ### Bayesian network

    ``` mermaid
    graph LR
    Cloudy((Cloudy))
    Sprinkler((Sprinkler))
    Rain((Rain))
    WetGrass((Wet grass))

    Cloudy --> Sprinkler
    Cloudy --> Rain
    Sprinkler --> WetGrass
    Rain --> WetGrass
    ```

    This represents the factorization

    $$
    p(C, S, R, W) = p(C)p(S \mid C)p(R \mid C)p(W \mid S, R).
    $$

The **absence** of links in the graph that conveys interesting information about the properties of the class of distributions that the graph represents.


