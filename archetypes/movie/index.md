---
number: 0
slug: "{{ .number }}"
title: "{{ .title }}"
date: "{{ .Date }}"
categories: ["영화"]
types: ["blog"]

# 0. metadata
name: ""
director: []
year: 0
length: 0
genres: []
country: []
rating: 0

# 1. 초안 여부: true면 hugo server에만 노출, 실제 빌드 시 제외
draft: true

# 2. 태그 (optional)
tags: []
# 3. 목차 표시 여부
toc: false
# 4. 댓글 표시 여부
comments: false
# 5. 대표 이미지 (page bundle)
#cover:
#  src: ""
#  alt: ""
#  caption: ""
---