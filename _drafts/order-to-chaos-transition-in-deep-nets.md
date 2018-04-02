---
layout: post
title: Order to Chaos Transition in Deep Nets
categories: drafts
author: Austen Lamacraft
---

In this post I want to discuss a thread of work starting with {% cite Poole:2016aa %}. This paper makes the case that the expressive power of deep nets can be attributed to chaotic evolution as we pass from inputs to outputs. The view of deep nets dynamical systems has long been popular in the context of RNNs, along with the notion that computation is optimal at 'the edge of chaos' - see {% cite Bertschinger:2004aa %} for some of the history of this idea. Perhaps the main differences from earlier works on Boolean networks {% cite Derrida:1986aa %} {% cite Derrida:1986ab %} and spin glass models {% cite Derrida:1987aa %} are:

1. The inputs and outputs in the 'modern era' are real, rather than discrete.

2. The dynamics in these earlier works was autonomous (time invariant), whereas each layer of a network has its own weights and biases, giving time-dependent dynamics.

## Statement of the Problem

An $L$-layer feed-forward neural network of width $N$ (assumed constant for simplicity) is defined in terms of weight matrices $\mathbf{W}^l\in\mathbb{R}^{N\times N}$, bias vectors $\mathbb{b}^l$, and a nonlinear activation function $\phi$ that operates elementwise on vectors. Propagation through the network is then defined by

$$
\mathbb{x}^l=\phi(\mathbf{h}^l), \qquad \mathbf{h}^l=\mathbf{W}^l\mathbf{x}^{l-1}+\mathbf{b}^l.
$$

The question addressed in {% cite Poole:2016aa %} is: how do two initially close inputs $\mathbf{x}^0_{1,2}$ propagate through the system? Evidently this information is contained in the Jacobian matrix

$$
\mathbf{J} = \frac{\partial \mathbf{x}^L}{\partial \mathbf{x}^0}=\prod_{l=0}^L \mathbf{D}^l\mathbf{W}^l,
$$

where $\mathbf{D}^l$ is the diagonal matrix with entries

$$
D^l_{ij} = \phi'(\mathbf{h}^l)\delta_{ij}
$$

We assume that the elements of all the weight matrices are iid Gaussians of zero mean:

$$
\mathbb{E}\left[W^l_{ij}W^l_{ij}\right] = \sigma^2_w
$$

<figure>
<img src="/images/blog/order-chaos.png" width="400" />
<figcaption>Figure from {% cite Pennington:2018aa %} </figcaption>
</figure>


References
----------

{% bibliography --cited %}
