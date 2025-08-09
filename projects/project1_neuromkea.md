---
layout: project
title: "A multi-modal robotic control system that interprets high-level natural language commands"
year: "2025"
tech_stack: "Python, LLM, Vision"
status: "Ongoing"
links:
  - name: "GitHub"
    url: "https://github.com/jaehyeokoh/human-robot-communication"
#   - name: "Paper"
#     url: "#"
#   - name: "Demo"
#     url: "#"
---

## Overview

This project focuses on developing natural communication interfaces for robots to interact with humans more effectively. The goal is to create a system that can understand both verbal and non-verbal human communication cues and respond appropriately.

{% include project-media.html
   type="image"
   src="image1.png"
   caption="System architecture overview showing the integration of speech recognition, computer vision, and response generation modules"
   size="large"
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