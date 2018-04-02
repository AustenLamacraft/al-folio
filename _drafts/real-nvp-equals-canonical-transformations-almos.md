---
layout: post
title: Real NVP = Canonical Transformations (Almost)
categories: machine learning
author: Austen Lamacraft
---

How can we learn and sample from rich multivariate probability distributions? The Swiss army knife for this problem is [Markov chain Monte Carlo](https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo), which involves constructing a Markov chain with the desired distribution as its stationary state. MCMC can handle both discrete and continuous variables, but can suffer from slow relaxation times as the number of variables increases.

For distributions over _continuous_ variables, an alternative approach that has grown in popularity in recent years involves constructing a map from a a tractable multivariate distribution (usually an isotropic Gaussian) to

First example is kernel trick

e.g.

{% cite Salimans:2015aa %}

Real NVP is implemented in TensorFlow

References
----------

{% bibliography --cited %}
