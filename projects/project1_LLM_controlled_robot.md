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
## Overview
{% include project-media.html
   type="image"
   src="full_map.jpg"
   caption="Fig. 1. System overview. A multi-agent architecture where each agent is guided by a dedicated system prompt. The Task Router parses user instructions, assesses task difficulty, and routes subtasks to either a Simple task Agent or a Hard task agent. The Simple task Agent composes executable action sequences for the robot arm; the Hard Task Agent delegates complex subtasks to Specialized Agents (e.g., assembly, trajectory generation) that return robot-ready plans. Both agents query the Vision Agent (VLM + DINO + SAM) to localize targets and estimate position and dimensions, generating an interpolated point cloud made with SAM output. The Action Executor runs the plan, using AnyGrasp for grasping with the interpolated point cloud as input. "
   size="full"
%}

## Abstract

Recently, the performance of large language models (LLMs) has been continuously improving. There have been various attempts to apply LLMs to robotics, and foundation models trained entirely for robots are emerging. However, creating training data and training models for robots is difficult for ordinary users to access. Therefore, I introduce a project that controls a robot using off-the-shelf LLM (that a general-purpose LLM rather than a robot-specialized one : GPT). In pipeline, the LLM serves as a high-level planner that performs planning by leveraging its greatest strength, natural-language generation, while delegating the LLM’s weakness(e.g spatial coordinate calculation) to other external modules such as DINO , SAM, Anygrasp. I also present a method that mutually compensates for two drawbacks: the weakness of VLMs in outputting concrete coordinates, and the DINO model’s inability to provide natural-language state descriptions about the detected object. As a result, this project shows that the system can execute tasks ranging from simple pick-and-place commands (“grasp the ~”), to interpreting user instructions (“give me something to eat”, “grab what looks like it may fall from the desk”), and further, high level commands that require multi-step reasoning (“make a dolmen shape using what is visible on the screen”).




## Demo video (2× Speed, user input shown below)

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

## Experimental Setup
{% include project-media.html
   type="image"
   src="environment_setup.jpg"
   caption="The experiments used the hardware shown in the image and the GPT API in Python as the LLM."
   size="large"
%}

## Methods

### 1. Perception

For a robot to successfully execute a task, it must accurately determine the position, size, and geometry of target objects. However, existing vision–language models (VLMs) struggle to directly output precise spatial coordinates. Object detection models such as Grounding DINO, although capable of generating bounding boxes and object contours, cannot identify targets purely based on semantic properties (e.g., “objects that look like they might fall”) or by recognizing specialized object names (e.g., “Pocari Sweat”) and often exhibit low accuracy in such cases **(Fig. 2, 3)**. To address these complementary weaknesses, I designed a hybrid perception pipeline that integrates the semantic reasoning ability of VLMs with the spatial accuracy of object detectors and segmentation models.

<div class="media-grid-2">
  {% include project-media.html type="image" src="screw_failed.png" caption="Fig. 2  Output of Grounding DINO with the text query “screw”. 
   The model incorrectly detects unrelated objects (e.g., a pen and a can) and assigns low confidence scores to the actual screw. 
   This illustrates its limitations in accurately identifying small or specific items, especially when multiple visually similar objects are present." muted=true autoplay=true loop=true%}
  {% include project-media.html type="image" src="snack_failed.png" caption="Fig. 3  Output of Grounding DINO for the query “snack”. The model misclassifies a pen and a black box as snacks, demonstrating the weakness in semantic understanding and category precision." muted=true autoplay=true loop=true%}
</div>

### Perception - Basic Idea

The perception module leverages the complementary strengths of two models: (1) Grounding DINO’s robust bounding box generation, and (2) a vision–language model’s semantic identification ability. To validate this approach, I first generated bounding boxes for all visible objects using Grounding DINO, and then provided each cropped region with a numerical label to the VLM for classification. The use of sequential numerical labels, assigned in the order that bounding boxes were detected, prevents the VLM from being biased or confused by any pre-assigned textual category names.

As shown in **Fig.4**, the VLM correctly assigned semantic labels such as “food” or “non-food” based on appearance and packaging, even in cases where DINO alone would misidentify the target. **Fig.5** further demonstrates that the same pipeline can infer physical and contextual properties, such as identifying an object likely to fall from the desk edge, by reasoning over spatial relationships and object placement.

<div class="media-grid-2">
  {% include project-media.html type="image" src="perception_description.png" caption="Fig. 4  Illustration of the VLM’s ability to semantically classify detected objects based on appearance and context." muted=true autoplay=true loop=true%}
  {% include project-media.html type="image" src="might_fall_from_table.jpg" caption="Fig. 5  Illustration of the system’s capability to infer environmental context, such as identifying objects likely to fall from the desk." muted=true autoplay=true loop=true%}
</div>

These results confirm that the proposed combination is effective for semantic object understanding while overcoming the VLM’s weakness in direct coordinate estimation by leveraging precise bounding boxes from DINO. The complete perception pipeline is illustrated in **Fig.6.**.


{% include project-media.html
   type="image"
   src="perception_map.png"
   caption="Fig. 6  (1) : object detection with Grounding DINO, (2) : semantic classification with the VLM, (3, 4, 5) : segmentation and 3D property extraction from bounding boxes using SAM, (6, 7) : interpolate point cloud to enhance Anygrasp performance"
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