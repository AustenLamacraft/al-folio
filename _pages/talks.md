---
layout: page
permalink: /talks/
title: talks
description: recent talks about my research
---

<ul class="paper-list">
{% for talk in site.talks reversed %}

<div class="paper">
    <div class="thumbnail">
        <a href="{{ talk.url | prepend: site.baseurl | prepend: site.url }}">
        {% if talk.image %}
        <img class="thumbnail" src="{{ talk.image | prepend: site.baseurl | prepend: site.url }}"/>
        {% else %}
        <div class="thumbnail blankbox"></div>
        {% endif %}    
        </a>
    </div>
    <a class="paper-title" href="{{ site.baseurl }}{{ talk.url }}" class="off">{{ talk.title }}</a>
</div>


{% endfor %}
</ul>
