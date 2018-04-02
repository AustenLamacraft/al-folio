---
layout: post
title: Is reinforcement learning the study of large deviations out of equilibrium?
categories: drafts
author: Austen Lamacraft
---

In contravention of [Betteridge's Law](https://en.wikipedia.org/wiki/Betteridge%27s_law_of_headlines), I'll try and argue that the answer to this question is 'yes'. Whether or not this observation is of any use -- aside from linking two voguish subjects -- is a separate question.

## Reinforcement Learning (RL)

Let's recapitulate the textbook definition of RL as a [Markov decision process](https://en.wikipedia.org/wiki/Markov_decision_process) for an agent in an environment. Our environment changes state with probabilities conditional upon the current state $s_t$ and the action $a_t$ taken by our agent

$$
P_a(s,s') = \mathbb{P}(s_{t+1}=s'|s_t=s, a_t=a).
$$

Our goal is formulated in terms of a __reward function__ $R_a(s,s')$ associated with the immediate reward received upon transition from $s$ to $s'$ while performing action $a$. Scoring in a game is a simple example of a reward. In football (soccer) a goal is awarded when the ball transitions into the back of the net. Note that in this example the initial state is important (players on the scoring team must be onside), as well the action (you can't use your hand).

The aim of the game is to maximize the expectation of the __return__

$$
R = \sum_{t=0}^\infty \gamma^t R_{a_t}(s_t, s_{t+1}),
$$

which depends on the trajectory $(s_t,a_t)$ taken, as well as a possible discount factor $\gamma$ to bias earlier rewards over later ones. Discounting is usually introduced with a constant factor for each time period, but I guess that needs to be generalized to handle a 90 minute football match, say.

The agent's actions are dictated by a __policy__ $\pi(s\|a)$ that selects -- perhaps randomly -- the action to be taken given the state of the environment

$$
\pi(a|s) = \mathbb{P}(a_t=a|s_t=s).
$$

Reinforcement learning is concerned with how best to choose the policy to maximize the expected return. The current boom in reinforcement learning, mostly attributed to DeepMind's Atari and AlphaGo successes, centres on using neural networks to learn the process end-to-end without an explicit internal model of environmental states or actions. The idea is that such an approach is suited to 'real-world' tasks where the number of environmental states is huge (or infinite) and / or hard to parameterize explicitly.

## Large deviations for nonequilibrium processes (LD)

Very roughly, large deviation theory is the study of probabilities with 'logarithmic accuracy'. The basic quantity is the __rate function__ asssociated with the limit of a family of probability distributions $P_n$ parameterized by a variable $n$

$$
I(\alpha) = -\lim_{n\to\infty} \frac{1}{n}\log P_n(A=\alpha)
$$

(I'm following the notation of a recent review {% cite Touchette:2009aa %} for physicists). In physics the most important rate function is the entropy $S$, or more correctly the entropy density $s=S/V$, associated with the thermodynamic (volume to infinity) limit of the probability distribution of a system's energy

$$
s = \lim_{V\to\infty} \frac{1}{V}\log P_V(E).
$$

'Normal' thermodynamic behaviour is associated with an entropy density that is a function of the energy density $e$

$$
s(e) = s(E/V),
$$

in which case the [inverse temperature](https://en.wikipedia.org/wiki/Thermodynamic_beta) $\beta$, defined as

$$
\beta = \frac{d\log P_V}{dE} = s'(e)
$$

depends on the relation $s(e)$ between these two __intensive__ (volume independent) quantities.

By definition rate functions describe the probability of exponentially unlikely events. Why on earth do we care? In thermodynamics there is a simple answer. Consider two systems with fixed total energy $E=E_1+E_2$. Suppose they can share energy, but are only weakly coupled so that the joint distribution of the energies approximately factorizes: $P_{12}(E_1,E_2)\sim P_1(E_1)P_2(E_2)=P_1(E_1)P(E-E_1)$. Then, by taking logs and differentiating with respect to $E_1$, we see that the most likely energy distribution occurs when $\beta_1=\beta_2$. That is: equal temperatures! This is the stastical basis of the [zeroth law of thermodynamics](https://en.wikipedia.org/wiki/Zeroth_law_of_thermodynamics). The point is that when two systems are put in contact, one of the systems may find itself moving to an exponentially unlikely configuration because this maximizes the joint likelihood.

For stochastic processes describing the evolution of a system in time, we may instead consider rate functions associated with _long times_ rather than large volumes. These are defined in terms of the probability of some random quantity that should grow with time, just as then energy grows proportionally to the volume of a thermodynamic system. Natural candidates are provided by the time integrals of some function of the state of the system. For concreteness, suppose that we have a Markov chain on states $\omega_t$ defined in terms of a transition function $\pi(\omega_{t+1}\|\omega_t)$. Given any function $f(\omega)$ on the state space, we can then consider the large deviation function for some quantity

$$
R_n = \frac{1}{n}\sum_{t=1}^n f(\omega_t).
$$

More generally, we may want to consider functions that depend on consecutive configurations: $f(\omega_t,\omega_{t+1})$. This would be necessary to keep track of the current in a system of particles, for example.

Despite having a recent [paper](https://arxiv.org/abs/1802.09576) on large deviations in dynamics, I couldn't give you a killer app. In the case of entropy, conservation of energy gave us the zeroth law. There has been some work on nonequilibrium analogs of the zeroth law: see {% cite Pradhan:2010aa %} for instance.

## A connection?

RL and LD look superficially similar. We have some form of stochastic dynamics (though we could also consider deterministic dynamics). Crucially, both involve a time integrated 'reward'. However, two differences are immediately apparent

1. In the case of RL, we have both environment ($s_t$) and agent ($a_t$) states.
2. RL is concerned with _maximizing_ the reward, whereas LD is concerned with its distribution over stochastic trajectories.

We'll return to the first point in a moment. Point 2 looks more serious. To proceed we invoke the __Gärtner-Ellis theorem__, which says (roughly) that a random variable satisfies a large deviation principle if the scaled _cumulant generating function_

$$
\lambda(k) = \lim_{n\to\infty} \frac{1}{n}\log \left\langle e^{nk A}\right\rangle
$$

exists and is differentiable for all $k\in\mathbb{R}$. In this case the rate function $I(\alpha)$ and $\lambda(k)$ are related by a Legendre transformation:

$$
I(\alpha) = \sup_k \left[k\alpha-\lambda(k)\right].
$$

Usually $\lambda(k)$ is easier to calculate. We are going to interpret $\lambda(k)$ as a free energy (density), the analog of

$$
\beta F = -\log Z,
$$

where $Z$ is the partition function

$$
Z = \sum_\epsilon  e^{-\beta \epsilon}.
$$

Now, the free energy has the alternative expression

$$
\beta F = \beta\langle E\rangle_\beta - S(\beta),
$$

where the angular brackets denote an expectation with respect to the Boltzmann distribution $P_\beta(\epsilon) = \frac{e^{-\beta \epsilon}}{Z}$, and $S(\beta)$ is the entropy of the same distribution.

In the same way, we may write

$$
\lambda(k) = k \langle A\rangle_k + s(k),
$$

where

$$
s(k) = -\frac{1}{n}\sum_\alpha P_k(\alpha)\log P_k(\alpha),
$$

is the scaled entropy. In this way we can interpret $\lambda(k)/k$ as an __entropy regularized__ version of $\langle A\rangle_k$, governed by the parameter $k$.

Applied to a stochastic process,


{% cite Fox:2015aa %}

{% cite Neu:2017aa %}


References
----------

{% bibliography --cited %}
