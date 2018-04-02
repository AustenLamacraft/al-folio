---
layout: post
title: Variational Information Bottleneck
categories: drafts
author: Austen Lamacraft
---

# Variational Information Bottleneck

The idea of the __information bottleneck__ was introduced by {% cite Tishby:2000aa %}, and applied to deep learning in {% cite Tishby:2015aa %}. The idea is to learn a representation ($Z$) of data using an objective function grounded in representation theory that trades off the encoding of inputs ($X$) against the prediction of outputs ($Y$).

In this post I follow {% cite Alemi:2016aa %}. The objective function is

$$
R_{IB}(\boldsymbol{\theta}) = I(Z,Y;\boldsymbol{\theta}) -\beta I(Z,X;\boldsymbol{\theta})
$$

where $I(Z,Y;\boldsymbol{\theta})$ denotes the [mutual information](https://en.wikipedia.org/wiki/Mutual_information) between the random variables $Z$ and $Y$. The first term rewards the expressiveness of $Z$ in capturing the variations of $Y$. If we view a  

Entropy regularization

## Other objectives

Confidence penalty - this generalizes the usual cross entropy.

Local entropy


## Relation to usual approach

For a classifier, the most common objective function is the cross entropy.
