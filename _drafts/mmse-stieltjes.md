---
layout: post
title: MMSE and the Stieltjes Transform
categories: drafts
author: Austen Lamacraft
---


From [this paper](https://arxiv.org/abs/1710.04580) I just learnt the following interesting connection between mutual information and the Stieltjes transform.

We're concerned with a noisy channel with additive Gaussian noise. The random input vector $\mathbf{X}\sim \mathcal{N}(0,I)$ is mapped to an output

$$
\widetilde{\mathbf{X}}(s) = \sqrt{s}\mathbf{X} + \mathbf{W},
$$

where $\mathbf{W}\sim \mathcal{N}(0,\mathbf{K})$ is additive noise with some covariance matrix $\mathbf{K}$.

The __minimum mean square error__ (MMSE) is defined as
