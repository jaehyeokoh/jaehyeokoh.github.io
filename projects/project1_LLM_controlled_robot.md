---
layout: project
title: "A multi-modal robotic control system that interprets high-level natural language commands"
year: "2025"
tech_stack: "Python, LLM, Vision"
status: "Ongoing"
permalink: /projects/project1_LLM_controlled_robot/
links:
  - name: "GitHub"
    url: "https://github.com/jaehyeokoh/human-robot-communication"
#   - name: "Paper"
#     url: "#"
#   - name: "Demo"
#     url: "#"
---

## Abstract

Recently, the performance of large language models (LLMs) has been continuously improving. There have been various attempts to apply LLMs to robotics, and foundation models trained entirely for robots are emerging. However, creating training data and training models for robots is difficult for ordinary users to access. Therefore, I introduce a project that controls a robot using off-the-shelf LLM (that a general-purpose LLM rather than a robot-specialized one : GPT). In pipeline, the LLM serves as a high-level planner that performs planning by leveraging its greatest strength, natural-language generation, while delegating the LLM’s weakness(e.g spatial coordinate calculation) to other external modules such as DINO , SAM, Anygrasp. I also present a method that mutually compensates for two drawbacks: the weakness of VLMs in outputting concrete coordinates, and the DINO model’s inability to provide natural-language state descriptions about the detected object. As a result, this project shows that the system can execute tasks ranging from simple pick-and-place commands (“grasp the ~”), to interpreting user instructions (“give me something to eat”, “grab what looks like it may fall from the desk”), and further, high level commands that require multi-step reasoning (“make a dolmen shape using what is visible on the screen”).

## Overview of system

{% include project-media.html
   type="image"
   src="full_map.jpg"
   caption="Fig1"
   size="full"
%}


## Example video (2x Speed)

<div class="media-grid-2">
  {% include project-media.html type="video" src="neuro1.mp4" caption="input : 흰 박스를 제외한 나머지 물건들을 작은 것부터 순서대로 하나는 흰 박스 앞에, 하나는 흰 박스 위에, 하나는 흰 박스 뒤쪽에 놔줘" muted=true autoplay=true loop=true%}
  {% include project-media.html type="video" src="neuro_beverage.mp4" caption="input : 먹을 수 있는 건 흰 박스 앞에, 먹을 수 없는 건 흰 박스 뒤에 놔" muted=true autoplay=true loop=true%}
</div>

<div class="media-grid-2">
  {% include project-media.html type="video" src="falling_obj_catch.mp4" caption="input : 곧 떨어질 것 같은 물건을 잡아" muted=true autoplay=true loop=true%}
  {% include project-media.html type="video" src="food_name.mp4" caption="input : 포카리 스웨트를 후레쉬 베리 위에 올려" muted=true autoplay=true loop=true%}
</div>

<div class="media-grid-2">
  {% include project-media.html type="video" src="proper_crate.mp4" caption="input : 음료수를 적절한 상자에 놔" muted=true autoplay=true loop=true%}
  {% include project-media.html type="video" src="food_crate.mp4" caption="input : 음료수를 음식 상자에 놔" muted=true autoplay=true loop=true%}
</div>

{% include project-media.html
   type="video"
   src="complex_input.mp4"
   caption="input : 나 목마르니 적절한 물건을 흰 상자 위에 올려 그리고 나머지 물건들을 큰것 부터 하나는 흰 상자 오른쪽에 하나는 흰 상자 앞에 놔"
   autoplay=true
   muted=true
   loop=true
   size="medium"
%}

## Introduction

Recent advances in large language models (LLMs) and vision-language models (VLMs) have expanded the potential for natural-language-driven robotic control. Research prototypes such as RT-2 have shown that foundation models can directly interpret visual scenes and map them to robotic actions. However, these systems typically require extensive domain-specific training data and computational resources, which are inaccessible to most users. Furthermore, while VLMs can recognize and describe visual content, they often lack the ability to output precise spatial coordinates, and object detection models like DINO cannot provide rich natural-language descriptions of their detections.

This project addresses these gaps by demonstrating a fully functional robot control pipeline powered by an off-the-shelf, general-purpose LLM (GPT) without any robot-specific fine-tuning. The LLM is used solely as a high-level planner, delegating tasks such as spatial reasoning, segmentation, and grasp point generation to specialized external modules (Grounding DINO, SAM, AnyGrasp). A novel label-visualization and VLM-selection method bridges the gap between VLMs and object detectors, enabling robust object targeting without relying on manual text prompts. In addition, point-cloud interpolation and SAM-call minimization techniques overcome occlusion and performance bottlenecks, allowing real-time execution even on mid-range hardware.

By combining these techniques, the system executes a wide range of commands — from simple pick-and-place tasks to multi-step reasoning challenges — illustrating a practical, accessible approach to robot control that leverages the strengths of existing foundation models while mitigating their weaknesses.

## Methods

### 1. Perception


{% include project-media.html
   type="image"
   src="perception_description.png"
   caption="Fig2"
   size="full"
%}

{% include project-media.html
   type="image"
   src="perception_map.png"
   caption="Fig3"
   size="full"
%}

## Research Objectives

- **Natural Language Processing**: Implement advanced NLP algorithms to understand human speech and intent
- **Computer Vision**: Develop visual recognition systems for gesture and facial expression analysis
- **Multimodal Integration**: Combine audio, visual, and contextual information for better understanding
- **Real-time Response**: Ensure low-latency communication for natural interaction flow

## Technical Approach

### 1. Speech Recognition Module

- Custom speech recognition model trained on conversational data
- Real-time audio processing using Python and ROS
- Integration with existing robot control systems

{% include project-media.html
   type="gif"
   src="speech-demo.gif"
   caption="Real-time speech recognition demonstration"
   size="medium"
%}

### 2. Visual Communication Analysis

- OpenCV-based facial expression recognition
- Hand gesture detection and classification
- Body language interpretation algorithms

{% include project-media.html
   type="video"
   src="neuro1.mp4"
   caption="Hand gesture recognition system in action"
   autoplay=true
   muted=true
   loop=true
%}

### 3. Response Generation

- Context-aware response selection
- Natural language generation for robot speech
- Coordinated verbal and physical responses

## Demo Video

{% include project-media.html
   type="youtube"
   id="dQw4w9WgXcQ"
   caption="Full system demonstration (YouTube)"
%}

## Current Progress

- ✅ Basic speech recognition implementation
- ✅ Facial expression detection prototype
- 🔄 Multimodal fusion algorithm development
- ⏳ Real-time testing on robot platform
- ⏳ User study preparation

## Challenges & Solutions

**Challenge**: Real-time processing requirements for natural interaction  
**Solution**: Optimized algorithms and parallel processing implementation

**Challenge**: Handling noisy environments and varying speech patterns  
**Solution**: Robust preprocessing and adaptive learning mechanisms

## Future Work

- Integration with physical robot platform
- Extensive user testing and feedback collection
- Publication of research findings
- Open-source release of core modules

## Related Publications

*Research paper in preparation for submission to ICRA 2025*