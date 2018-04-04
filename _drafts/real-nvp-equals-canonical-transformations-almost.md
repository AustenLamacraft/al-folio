---
layout: post
title: Real NVP = Canonical Transformations (Almost)
categories: machine learning
author: Austen Lamacraft
---

How can we learn and sample from rich multivariate probability distributions? The Swiss army knife for this problem is [Markov chain Monte Carlo](https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo), which involves constructing a Markov chain with the desired distribution as its stationary state. MCMC can handle both discrete and continuous variables, but can suffer from slow relaxation times as the number of variables increases.

For distributions over _continuous_ variables, an alternative approach that has grown in popularity in recent years involves constructing a deterministic invertible map $g:\mathbf{Z}\to \mathbf{X}$ from a set of latent variables $\mathbf{Z}$ with a tractable multivariate distribution (usually an isotropic Gaussian) to a set of observed variables $\mathbf{X}$. The distribution $p(\mathbf{z})$ of the latent variables implies the distribution

$$
q(\mathbf{x}) = \det\left(\frac{\partial \mathbf{z}}{\partial \mathbf{x}}\right)p(g^{-1}(\mathbf{x}))
$$

for the observed variables. Generating samples from $q(\mathbf{x})$ is a matter of generating $\mathbf{z}$ from $p(\mathbf{z})$ and then mapping to $\mathbf{x}=g(\mathbf{z})$.

To capture the data distribution requires a sufficiently flexible parameterization for $g$ for which the evaluation of the Jacobian is nevertheless tractable. This is the tricky part.

One example of a tractable Jacobian is provided by the affine map

$$
\mathbf{x} = \mathbf{A}\mathbf{z} + \mathbf{b}.
$$

Applied to a standard multivariate Gaussian $\mathbf{z}\sim \mathcal{N}(0,1)$, this gives $\mathbf{x}\sim \mathcal{N}(\mathbf{b},\mathbf{K})$, where the covariance matrix is

$$
\mathbf{K} = \mathbf{A}\mathbf{A}^T.
$$

This is the __kernel trick__ widely used in [variational autoencoders](https://en.wikipedia.org/wiki/Hamiltonian_mechanics). Of course, the downside is that the distribution $q(\mathbf{x})$ is just a Gaussian.

One route to more complicated distributions is provided by __real NVP__, {% cite Dinh:2016aa %} --  _real-valued non-volume preserving_ -- transformations. This involves partitioning the inputs into two groups $\mathbf{z}=\mathbf{z}_1 \cup \mathbf{z}_2$, with corresponding outputs $\mathbf{x}=\mathbf{x}_1 \cup \mathbf{x}_2$

$$
\begin{aligned}
\mathbf{x}_1 = \mathbf{z}_1\\
\mathbf{x}_2 = \mathbf{z}_2 \odot e^{s(\mathbf{z}_2)} + t(\mathbf{z}_2).
\end{aligned}
$$

In practice the mappings $s$ and $t$ will be parameterized by neural networks.

It's straightforward to check that the Jacobian matrix is triangular, which means that the computation of the determinant is trivial, and yields

$$
\log\left|\det\left(\frac{\partial \mathbf{x}}{\partial \mathbf{z}}\right)\right|=\sum_i s(\mathbf{z}_1)_i.
$$

The $\mathbf{x}_1$ variables can be updated in the next step, and more complicated mappings can be formed by composition, with the log-Jacobian being given by the sum of contributions for each map.

Real NVP is [already implemented in TensorFlow!](https://www.tensorflow.org/versions/master/api_docs/python/tf/contrib/distributions/bijectors/RealNVP)

## Canonical Transformations

It turns out that real NVP formulation is closely related to [canonical transformations](https://en.wikipedia.org/wiki/Canonical_transformation) in classical mechanics. Recall [Hamilton's equations](https://en.wikipedia.org/wiki/Hamiltonian_mechanics) for the motion of a system described by a point $(\mathbf{q}(t), \mathbf{p}(t))$ in phase space

$$
\begin{aligned}
\dot{\mathbf{q}} = \frac{\partial H}{\partial \mathbf{p}}\\
\dot{\mathbf{p}} = -\frac{\partial H}{\partial \mathbf{q}},
\end{aligned}
$$

where $H(\mathbf{q}, \mathbf{p})$ is the __Hamiltonian__. One can view the time evolution as a one-parameter family of diffeomorphisms from the present into the future. These maps have the property that they preserve the canonical form

$$
\omega = \sum_{i=1}^N dp^i\wedge dq^i.
$$

Such maps are called [canonical transformations](https://en.wikipedia.org/wiki/Canonical_transformation), or [symplectomorphisms](https://en.wikipedia.org/wiki/Symplectomorphism). Note that $\overbrace{\omega \wedge \omega \cdots \omega}^{N\text{ times}}$ is the volume form, so being canonical is more than being volume preserving (if $N>1$).

When numerically integrating Hamilton's equations it is desirable to use a scheme that retains the symplectic property. This is because one can regard the discrete values $(\mathbf{q}_i, \mathbf{p}_i)$ arising during integration as samples from the exact time evolution of a __shadow Hamiltonian__ (nothing sinister, just hard to find explicitly). Simulating a slighly different Hamiltonian exactly means that values of quantities that should be conserved (the energy, at least) tend to fluctuate around the exact value instead of wandering off.

Integration schemes that preserve the symplectic property are called [symplectic integrators](https://en.wikipedia.org/wiki/Symplectic_integrator). The simplest example is provided by the [symplectic Euler](https://en.wikipedia.org/wiki/Semi-implicit_Euler_method) method with timestep $\tau$

$$
\begin{aligned}
p_{n+1} = p_n - \tau \nabla_q H(p_{n+1}, q_n)\\
q_{n+1} = q_n + \tau \nabla_p H(p_{n+1}, q_n).
\end{aligned}
$$

As written this is an __implicit__ scheme, meaning that the values at time $n+1$ appear on the right hand side. However, if the Hamiltonian has separable form

$$
H(\mathbf{q}, \mathbf{p}) = T(\mathbf{p}) + V(\mathbf{q}),
$$

this becomes an __explicit__ scheme

$$
p_{n+1} = p_n - \tau \nabla_q V(q_n)
$$

$$
q_{n+1} = q_n + \tau \nabla_p T(p_{n+1}).
$$

At this point the similarity to real NVP comes into view. We have the correspondence

$$
\mathbf{q}_n \sim \mathbf{z}_1,\qquad \mathbf{p}_n \sim \mathbf{z}_2
$$

$$
\mathbf{q}_{n+1} \sim \mathbf{x}_1,\qquad \mathbf{p}_{n+1} \sim \mathbf{x}_2\\
$$

The difference between the two schemes is the scaling function $e^{s()}$, which is the reason for the scheme being non-volume preserving rather than symplectic. Without the scaling, the method goes by the name NICE {% cite Dinh:2014aa %}.



"NICE: Non-linear Independent Components Estimation."
      Laurent Dinh, David Krueger, Yoshua Bengio. ICLR. 2015.
      https://arxiv.org/abs/1410.8516

## Generative Modelling as a Control Problem

When we simulate an autonomous (time-independent) system, the maps applied are the same at each time step. Our goal is different -- we care only about the distribution we end up with -- so there is no need for the $T(\mathbf{p})$ and $V(\mathbf{q})$ to be the same at each step. This has the flavour of a control problem: how to best sculpt one distribution into another?

{% cite Salimans:2015aa %}

Further reading

[4]: "Normalizing Flows Tutorial, Part 2: Modern Normalizing Flows."
      Eric Jang. Blog post. January 2018.
      http://blog.evjang.com/2018/01/nf2.html

References
----------

{% bibliography --cited --file blog %}
