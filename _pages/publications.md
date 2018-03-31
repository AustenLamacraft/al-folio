---
layout: page
permalink: /publications/
title: publications
description: a gallery of <a href="https://www.tcm.phy.cam.ac.uk/">publications</a>
years: [1956, 1950, 1935, 1905]
---

<ul class="paper-list">
{% for paper in site.publications reversed %}

<div class="paper">
    <div class="thumbnail">
        <a href="{{ paper.url | prepend: site.baseurl | prepend: site.url }}">
        {% if paper.image %}
        <img class="thumbnail" src="{{ paper.image | prepend: site.baseurl | prepend: site.url }}"/>
        {% else %}
        <div class="thumbnail blankbox"></div>
        {% endif %}    
        </a>
    </div>
    <a class="paper-title" href="{{ site.baseurl }}{{ paper.url }}" class="off">{{ paper.title }}</a>
</div>


{% endfor %}
</ul>
