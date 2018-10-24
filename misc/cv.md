---
layout: cv
exclude: true
---

# Austen Lamacraft
Theoretical Physicist


<div id="webaddress">
<i class="fas fa-envelope fa-2x"></i> <a href="mailto:austen@lamacraft.io">austen@lamacraft.io</a>
|
<i class="fas fa-home fa-2x"></i><a href="http://lamacraft.io">lamacraft.io</a>
|
<i class="ai ai-google-scholar-square ai-2x"></i><a href="https://scholar.google.co.uk/citations?user=ERR4TF0AAAAJ&hl=en">Austen Lamacraft</a>
|
<i class="fab fa-github fa-2x"></i> <a href="https://github.com/AustenLamacraft">AustenLamacraft</a>
</div>

## Currently

`2014-`
__University of Cambridge__ Reader in Theoretical Physics, Department of Physics.

`2017-`
__GTN Ltd__ Advisor to startup disrupting drug discovery with a combination of Machine Learning and Quantum Mechanics.

`2018-`
__Spotify__ Independent contractor, researching machine learning models for audio.

## Recent Projects



`2017`
__TrMPS__ Quantum inspired probabilistic models in machine learning. Ongoing work at [github.com/TrMPS](https://github.com/TrMPS).


`2016`
__PyCav__ Unifying computing in the Cambridge undergraduate physics course under a single framework based on Python. See [pycav.org](http://pycav.org).

## Employment

`2012-14`
__University of Cambridge__ University Lecturer, Department of Physics


`2007-12`
__University of Virginia__ Assistant Professor, Department of Physics (Tenure 2012)

`2005-07`
__University of Oxford__ Postdoctoral Fellow, All Souls College

`2002-05`
__Princeton University__ Robert H. Dicke Fellow, Department of Physics

`2001-07`
__University of Cambridge__ Junior Reseach Fellow, Trinity College

`1998-99`
__Barclays Capital__ Derivatives Trader, Interest Rate Exotics

## Education

`1999-02`
__University of Cambridge__ PhD Theoretical Physics (Supervisor: Ben Simons)

`1997-98`
__University of Cambridge__ MMath (Part III Mathematics, Distinction)

`1994-97`
__University of Cambridge__ BA Natural Sciences (First Class Honours)


## Technical skills

* Python
* LaTeX
* Git
* TensorFlow
* Machine learning
* Numerical computing
* Technical teaching

## Grants / Awards

`2017`
Co-PI on EPSRC Critical Mass grant EP/P034616/1 (£2,023,484)

`2010`
Cottrell Scholar Award from Research Corporation for Science Advancement ($75,000)

`2009 `
NSF CAREER award ($425,000)

`2007`
Royal Society University Research Fellowship (declined), 2007

`2002`
Miller Fellowship, UC Berkeley (declined), 2002


## Publications

<section>

{% for paper in site.publications reversed %}
    {% cycle 'add rows': '<div class="row">', nil, nil %}
      <p><code class="highlighter-rouge">{{ paper.year }}</code>
      {{ paper.title }}
      <br />
      {% if paper.doi %}
			<a class="off" href="http://dx.doi.org/{{ paper.doi }}">{{ paper.ref }}</a>
			{% else %}
			<a class="off" href="https://arxiv.org/abs/{{ paper.arxiv }}">arXiv:{{ paper.arxiv }}</a>
			{% endif %}
      </p>
			<div class="bigspacer"></div>
			<div class="spacer"></div>

    {% cycle 'close rows': nil, nil, '</div>' %}
{% endfor %}

</section>
