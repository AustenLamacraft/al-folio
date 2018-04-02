---
layout: post
title: Instabilities in Mean Field Variational Bayes
categories: drafts
author: Austen Lamacraft
---

This post is based on [Andrea Montanari's talk](https://www.newton.ac.uk/seminar/20180116090009451) at the Newton Institute today.

## A toy problem: $\mathbb{Z}_2$ Synchronization

This is described in {% cite Javanmard:2016aa %}. From the measurements of the $n \times n$ matrix $Y_{ij}$

$$
Y_{ij} = \frac{\lambda}{n}\sigma_i\sigma_j + \frac{W_{ij}}{\sqrt{n}},
$$

we want to infer the $\sigma_{i}\in\{\pm 1\}$, $i=1,\ldots n$, where $W_{i>j}\in \mathcal{N}(0,1)$, with $W_{ij}=W_{ji}$ and $W_{ii}=0$. Note that the $\sigma_i$ are only determined up to an overall sign. $\lambda$ measures the signal-to-noise: for smaller $\lambda$ it is harder to estimate the $\sigma_i$. In the large $n$ limit there is a phase transition at $\lambda=1$. For $\lambda<1$ we have $\mathbb{E}[\sigma_i]=0$, with a non-zero value appearing for $\lambda>1$. As we'll see, this corresponds to the ordering of an Ising model with couplings $Y_{ij}$, with $\lambda$ playing the role of inverse temperature. As in the case of the Ising model, we have to be careful about exactly what we mean by $\mathbb{E}[\sigma_i]\neq 0$, as we are dealing with __symmetry breaking__.

## Variational Inference

The idea behind variational inference is to maximize the __evidence lower bound__ (ELBO, or negative of the __variational free energy__)

$$
\mathcal{L}(Y,m,q) \equiv \mathbb{E}_{\sigma\sim q}\log p(\sigma,Y;m) + H(q)
$$

for some proposed $q(\sigma|Y)$. The unconstrained maximum occurs for $q(\sigma|Y)=p(\sigma|Y)$, at which
 $\mathcal{L}$ achieves $\log p(Y;m)$, the log probability of the data.

 The variational approach is suited to situations where $p(\sigma|Y)$ is intractable -- usually because it involves computing the normalization factor (or partition function). Replacing it with the 'best' $q(\sigma|Y)$ within some class of tractable distributions then allows inference to be made. Additionally, knowledge of the ELBO allows the quality of the model to be assessed.

> __Note for physicists.__ The connection to statistical mechanics goes like this. Think of $Y$ as the parameters of a stat mech model. The free energy is
$$
F = -k_\text{B}T \log Z,
$$
where $Z$ is the partition function (generally intractable). On the other hand, we also know that
$$
F = \langle E\rangle - TS,
$$
where the first term is average energy, and $S$ is the entropy. The variational approach then replaces the true distribution with some tractable distribution, and calculates the average of the energy and the entropy with respect to this distribution
$$
F_\text{var} = \langle E\rangle_\text{var} - TS_\text{var}.
$$
The fact that the variational free energy is larger than the true free energy is called the [Bogoliubov inequality](https://en.wikipedia.org/wiki/Helmholtz_free_energy#Bogoliubov_inequality). As well as approximating thermodynamic quantities like $F$, physicists are also interested in using the approximate distribution to evaluate averages and correlation functions.

Applied to our problem, we have

$$
p(\sigma,Y;m) = \prod_i p(\sigma_i;m_i) \prod_{i>j} \sqrt{\frac{N}{2\pi}}\exp\left[-\frac{N\left(Y_{ij} - \lambda \sigma_i \sigma_j/n\right)^2}{2}\right].
$$

The $\sigma_i$ are Bernoulli variables, which we parameterize in terms of their expectation

$$
p(\sigma_i=\pm 1;m_i) = \frac{1\pm m_i}{2}.
$$

## Mean Field Approximation

Computation of $p(Y;m)$ by marginalizing out $z$ is intractable -- it corresponds to computing the partition function of an Ising model with couplings $Y_{ij}$ -- so we propose the mean field distribution

$$
q(\sigma|Y) = \prod_i p(\sigma_i;m_i(Y)).
$$

The entropy is

$$
H(q) = -\sum_i \left[\frac{1 +m_i}{2} \log\left(\frac{1\ +m_i}{2}\right) + \frac{1 +m_i}{2} \log\left(\frac{1\ +m_i}{2}\right)\right],
$$




References
----------

{% bibliography --cited %}
