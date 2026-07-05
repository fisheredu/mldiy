# Probability Graphical Model

A graph comprises **nodes** (also called vertices) connected by **links** (also known as edges or arcs). 

In a probabilistic graphical model, each node represents a random variable (or group of random variables), and the links express probabilistic relationships between these variables.

- Bayesian networks (directed graphical models)
- Markov random fields (undirected graphical models)
- factor graph

$$
p(1)
$$


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
