---
layout: page
title: demos
permalink: /demos/
description: A growing collection physics demos
---

{% for demo in site.demos %}

{% if demo.redirect %}
<div class="project">
    <div class="thumbnail">
        <a href="{{ demo.redirect }}" target="_blank">
        {% if demo.image %}
        <img class="thumbnail" src="{{ demo.image | prepend: site.baseurl | prepend: site.url }}"/>
        {% else %}
        <div class="thumbnail blankbox"></div>
        {% endif %}    
        <span>
            <h1>{{ demo.title }}</h1>
            <br/>
            <p>{{ demo.description }}</p>
        </span>
        </a>
    </div>
</div>
{% else %}

<div class="project">
    <div class="thumbnail">
        <a href="{{ demo.url | prepend: site.baseurl | prepend: site.url }}">
        {% if demo.image %}
        <img class="thumbnail" src="{{ demo.image | prepend: site.baseurl | prepend: site.url }}" />
        {% else %}
        <div class="thumbnail blankbox"></div>
        {% endif %}    
        <span>
            <h1>{{ demo.title }}</h1>
            <br/>
            <p>{{ project.description }}</p>
        </span>
        </a>
    </div>
</div>

{% endif %}

{% endfor %}
