---
layout: project
title: "A multi-modal robotic control system that interprets high-level natural language commands"
year: "2025"
tech_stack: "Python, LLM, Vision"
status: "Ongoing"
permalink: /projects/project1_LLM_controlled_robot/
links:
  - name: "GitHub(comming soon)"
    url: ""
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

Recently, the performance of large language models (LLMs) has been continuously improving. There have been various attempts to apply LLMs to robotics, and foundation models trained entirely for robots are emerging. However, creating training data and training models for robots is difficult for ordinary users to access. Therefore, We introduce a project that controls a robot using off-the-shelf LLM (that a general-purpose LLM rather than a robot-specialized one : GPT). In pipeline, the LLM serves as a high-level planner that performs planning by leveraging its greatest strength, natural-language generation, while delegating the LLM’s weakness(e.g spatial coordinate calculation) to other external modules such as <a href="https://github.com/IDEA-Research/GroundingDINO" target="_blank">DINO</a>, <a href="https://segment-anything.com/" target="_blank">SAM</a>, <a href="https://arxiv.org/abs/2212.08333" target="_blank">AnyGrasp</a>. We also present a method that mutually compensates for two drawbacks: the weakness of VLMs in outputting concrete coordinates, and the DINO model’s inability to detect objects using natural-language descriptions of their state (e.g., “about to fall”) instead of their category name. As a result, this project shows that the system can execute tasks ranging from simple pick-and-place commands (“grasp the ~”), to interpreting user instructions (“give me something to eat”, “grab what looks like it may fall from the desk”), and further, attempted high-level commands that require multi-step reasoning (e.g., “make a dolmen shape using what is visible on the screen”).


## Demo full video (2× Speed, user input shown below) (Eng input)

<div class="media-grid-2">
  {% include project-media.html type="video" src="about_to_fall_eng.mp4" caption="Human input : pick up the item about to fall of the table and put it on white box" muted=true autoplay=true loop=true%}
  {% include project-media.html type="video" src="non_pokari_eng.mp4" caption="Human input : i'm thirsty but i don't like pokari sweat. put something to drink on white box" muted=true autoplay=true loop=true%}
</div>

{% include project-media.html
   type="video"
   src="long_eng.mp4"
   caption="Human input : place the object that looks like it’s about to fall off the desk to the left of the white box, place the Fanta on top of the white box, and from the remaining objects place the smallest to the left of pokari sweat."
   autoplay=true
   muted=true
   loop=true
   size="medium"
%}

## Demo video (2× Speed, user input shown below) (Korean input)

<div class="media-grid-2">
  {% include project-media.html type="video" src="neuro1.mp4" caption="Human input : 흰 박스를 제외한 나머지 물건들을 작은 것부터 순서대로 하나는 흰 박스 앞에, 하나는 흰 박스 위에, 하나는 흰 박스 뒤쪽에 놔줘" muted=true autoplay=true loop=true%}
  {% include project-media.html type="video" src="neuro_beverage.mp4" caption="Human input : 먹을 수 있는 건 흰 박스 앞에, 먹을 수 없는 건 흰 박스 뒤에 놔" muted=true autoplay=true loop=true%}
</div>

<div class="media-grid-2">
  {% include project-media.html type="video" src="falling_obj_catch.mp4" caption="Human input : 곧 떨어질 것 같은 물건을 잡아" muted=true autoplay=true loop=true%}
  {% include project-media.html type="video" src="food_name.mp4" caption="Human input : 포카리 스웨트를 후레쉬 베리 위에 올려" muted=true autoplay=true loop=true%}
</div>

<div class="media-grid-2">
  {% include project-media.html type="video" src="proper_crate.mp4" caption="Human input : 음료수를 적절한 상자에 놔" muted=true autoplay=true loop=true%}
  {% include project-media.html type="video" src="food_crate.mp4" caption="Human input : 음료수를 음식 상자에 놔" muted=true autoplay=true loop=true%}
</div>

{% include project-media.html
   type="video"
   src="complex_input.mp4"
   caption="Human input : 나 목마르니 적절한 물건을 흰 상자 위에 올려 그리고 나머지 물건들을 큰것 부터 하나는 흰 상자 오른쪽에 하나는 흰 상자 앞에 놔"
   autoplay=true
   muted=true
   loop=true
   size="medium"
%}



## Introduction

Recent advances in large language models (LLMs) and vision-language models (VLMs) have expanded the potential for natural-language-driven robotic control. Research prototypes such as <a href="https://arxiv.org/pdf/2307.15818" target="_blank">RT-2</a> have shown that foundation models can directly interpret visual scenes and map them to robotic actions. However, these systems typically require extensive domain-specific training data and computational resources, which are inaccessible to most users. Furthermore, while VLMs can recognize and describe visual content, they often lack the ability to output precise spatial coordinates, and object detection models like DINO cannot provide rich natural-language descriptions of their detections.

This project addresses these gaps by demonstrating a fully functional robot control pipeline powered by an off-the-shelf, general-purpose LLM (GPT) without any robot-specific fine-tuning. The LLM is used solely as a high-level planner, delegating tasks such as spatial reasoning, segmentation, and grasp point generation to specialized external modules (Grounding DINO, SAM, AnyGrasp). A novel label-visualization and VLM-selection method bridges the gap between VLMs and object detectors, enable robust object targeting without relying on manual text prompts.

By combining these techniques, the system executes a wide range of commands (from simple pick-and-place tasks to multi-step reasoning challenges) illustrating a practical, accessible approach to robot control that leverages the strengths of existing foundation models while addressing  their weaknesses.

## Experimental Setup
{% include project-media.html
   type="image"
   src="experimental_setup.jpg"
   caption="The experiments used the hardware shown in the image and the GPT API in Python as the LLM. and used Ubuntu"
   size="large"
%}

## Methods

## 1. Perception

### 1.1 Problem definition
For a robot to successfully execute a task, it must accurately determine the position, size, and geometry of target objects. However, existing vision–language models (VLMs) struggle to directly output precise spatial coordinates. Object detection models such as Grounding DINO, although capable of generating bounding boxes and object contours, cannot identify targets purely based on semantic properties (e.g., “objects that look like they might fall”) or by recognizing specialized object names (e.g., “Pocari Sweat”) and often exhibit low accuracy in such cases **(Fig. 2, 3)**. To address these complementary weaknesses, We designed a hybrid perception pipeline that integrates the semantic reasoning ability of VLMs with the spatial accuracy of object detectors and segmentation models.

<div class="media-grid-2">
  {% include project-media.html type="image" src="screw_failed.png" caption="Fig. 2  Output of Grounding DINO with the text query “screw”. 
   The model incorrectly detects unrelated objects (e.g., a pen and a can) and assigns low confidence scores to the actual screw. 
   This illustrates its limitations in accurately identifying small or specific items, especially when multiple visually similar objects are present." muted=true autoplay=true loop=true%}
  {% include project-media.html type="image" src="snack_failed.png" caption="Fig. 3  Output of Grounding DINO for the query “snack”. The model misclassifies a pen and a black box as snacks, demonstrating the weakness in semantic understanding and category precision." muted=true autoplay=true loop=true%}
</div>

### 1.2 Basic Idea
The perception module leverages the complementary strengths of two models: (1) Grounding DINO’s robust bounding box generation, and (2) a vision–language model’s semantic identification ability. To validate this approach, We first generated bounding boxes for all visible objects using Grounding DINO, and then provided image with a box(numerical labeled) to the VLM for classification. The use of sequential numerical labels, assigned in the order that bounding boxes were detected, prevents the VLM from being biased or confused by any pre-assigned textual category names.

As shown in **Fig.4**, the VLM correctly assigned semantic labels such as “food” or “non-food” based on appearance and packaging, even in cases where DINO alone would misidentify the target. **Fig.5** further demonstrates that the same pipeline can infer physical and contextual properties, such as identifying an object likely to fall from the desk edge, by reasoning over spatial relationships and object placement.

<div class="media-grid-2">
  {% include project-media.html type="image" src="perception_description.png" caption="Fig. 4  Illustration of the VLM’s ability to semantically classify detected objects based on appearance and context." muted=true autoplay=true loop=true%}
  {% include project-media.html type="image" src="might_fall_from_table.jpg" caption=" Fig. 5  Illustration of the system’s capability to infer environmental context, such as identifying objects likely to fall from the desk." muted=true autoplay=true loop=true%}
</div>

These results confirm that the proposed combination is effective for semantic object understanding while overcoming the VLM’s weakness in direct coordinate estimation by leveraging precise bounding boxes from DINO. The complete perception pipeline is illustrated in **Fig.6.**

{% include project-media.html
   type="image"
   src="perception_map.png"
   caption="Fig. 6  (1) : object detection with Grounding DINO, (2) : semantic classification with the VLM, (3) : segmentation from bounding boxes using SAM, (4) : describe the method of extracting 3d properties from masked point cloud"
   size="large"
%}

Step 1 - 3 was explained before (**Fig4, 5**) Step 4 derives the position x,y from the centroid of back-projected masked depth points, z is defined as the z-extent (max–min), and the dimensions (L, W) are computed via PCA on the masked point cloud.

## 2. Grasp pose

### 2.1 Problem Definition (Point cloud)
Determining a valid grasp pose for a robot is a challenging task. Large Language Models (LLMs) cannot directly compute physically valid grasp poses. In this system, the LLM selects which object to grasp, and delegates the grasp pose generation to AnyGrasp.

However, AnyGrasp’s performance is highly sensitive to occlusion of the object surface in the point cloud.
When lateral surfaces of the object are not captured from the camera’s viewpoint, the resulting partial point cloud often causes AnyGrasp to generate collision-prone grasp poses, as illustrated in  **Fig.  7**.

Additionally, the absence of side-view data limits the robot’s ability to plan side grasps. Without a complete representation of the object’s lateral boundaries, AnyGrasp may fail to propose valid side approaches, as shown in **Fig. 8**.
This makes side point cloud interpolation a critical step for ensuring both collision-free and expanding the range of valid grasp poses.

<div class="media-grid-2">
  {% include project-media.html type="image" src="collision_trigger.png" caption="Fig. 7  Example of collision-prone grasp poses generated by AnyGrasp due to missing side point cloud data." muted=true autoplay=true loop=true%}
  {% include project-media.html type="image" src="lack_of_side_grasp.png" caption=" Fig. 8  Example showing how missing side point cloud data limits side grasp capability for the object" muted=true autoplay=true loop=true%}
</div>


### 2.2 Side point cloud interpolation
In this project, The robot observes scenes from a top-down viewpoint, leaving most side surfaces unobserved.
To address this limitation, **Fig. 9** introduces a simple side point cloud interpolation method: first, conduct cluster with DBSCAN, and select the largest-volume cluster, then I extruded the object’s convex hull contour (in the XY-plane) vertically to the estimated object height, effectively forming a “wall” of points around the sides.
This augmentation improves AnyGrasp’s ability to generate stable grasp poses under partial occlusions as shown in **Fig. 10 and 11**.


{% include project-media.html
   type="image"
   src="side_interpola_des.png"
   caption="Fig. 9   Diagram of the side point-cloud interpolation process"
   size="large"
%}

<div class="media-grid-2">
  {% include project-media.html type="image" src="improved_side_grasp.jpg" caption="Fig. 10  Side grasp capability improved by side point cloud interpolation." muted=true autoplay=true loop=true%}
  {% include project-media.html type="image" src="collision_detect.jpg" caption=" Fig. 11  Collision detection driven by the interpolated side point cloud" muted=true autoplay=true loop=true%}
</div>

For efficiency, We associated each object’s side point cloud with its ID and map it to world coordinates using the TCP pose recorded at capture. We stored these clouds and update their poses whenever objects move, which minimizes DINO+SAM calls and subsequent cycles reuse the cached clouds for non-target objects. At grasp time, first make a 2D box from the cached side point cloud. run DINO to get candidate boxes, choose the one closest to the side contour, and then run SAM on that area. We then compute the target’s 3D pose and update its side point cloud. Other objects keep using their cached clouds.

Another critical issue is AnyGrasp does not account for the robot’s kinematic constraints, which often results in singular configurations.
To address this, we applied an inverse kinematics (IK) check to all grasp candidates, iterating through them in descending order of their grasp score until a valid pose was found.

And we made a simple collision avoidance method for movement by analyzing the current pose, target pose, and any objects in between (see video below).

<div class="media-grid-2">
  {% include project-media.html type="video" src="colli_low.mp4" caption="collision avoidance not activated" muted=true autoplay=true loop=true%}
  {% include project-media.html type="video" src="colli_high.mp4" caption="collosion avoidance activated" muted=true autoplay=true loop=true%}
</div>

## 3. Planning

To control a robot with an LLM, the system must parse the user input, plan an ordered sequence of actions, select the correct objects, and output a machine-parsable, precise, and robust action plan. there are studies show that accuracy drops when key information is placed in the middle of a long input <a href="https://arxiv.org/pdf/2307.03172" target="_blank">[1]</a>. They also report that simply increasing input length can reduce reasoning quality <a href="https://aclanthology.org/2024.acl-long.818.pdf" target="_blank">[2]</a>. In addition, language models often exhibit an attention sink toward the first tokens, pulling focus away from later content <a href="https://arxiv.org/pdf/2410.10781v1" target="_blank">[3]</a>. These studies suggest that, in a single mixed prompt for robot planning (instruction parsing, object selection, and action planning in one place), attention may become diluted and plan reliability may decrease. Therefore, we split planning into small, role-specific prompts so each agent sees only the minimal context it needs. This design is consistent with prior work showing that modular or agentic prompting improves planning and complex reasoning compared to one big prompt <a href="https://arxiv.org/pdf/2503.12483" target="_blank">[4]</a><a href="https://arxiv.org/pdf/2310.00194" target="_blank">[5]</a>.

<div class="media-grid-2">
  {% include project-media.html type="image" src="task_decomposition.jpg" caption="Fig. 12. Modular planning pipeline." muted=true autoplay=true loop=true%}
  {% include project-media.html type="image" src="assembly_specialized.jpg" caption="Fig. 13. Illustration of the output from each moduled prompt of the assembly agent" muted=true autoplay=true loop=true%}
</div>

To avoid giving the LLM too much work at once, we made an agent that breaks the user’s request into smaller, separate tasks and classifies them by difficulty. This ensures each query sent to the LLM is more focused and easier to process, reducing mistakes and improving reliability. For every task, another agent clarifies unclear instructions, identifies the required objects, and generates a step-by-step action plan using basic robot commands (move, grip, release). Since the LLM can still make errors, we developed an agent that checks, compares, and improves the LLM’s output against the original request. Each stage is handled by a small, specialized agent with a concise, role-specific prompt (**Fig. 12**).

But some tasks, such as assembly or complex trajectory generation, are still difficult to handle with a general prompt. To address this, we made two types of agents: a simple agent and a hard agent. The simple agent handles straightforward tasks that can be completed with basic pick-and-place operations, while the hard agent handles tasks that need additional reasoning and task-specific prompt guidelines. The hard agent analyzes the user input and routes it to specialized agents equipped with these tailored prompts. As shown in **Fig. 13**, for example, the assembly-specialized prompt and its LLM output demonstrate how complex tasks can be solved in a modular, step-by-step way.

During development, we noticed that forcing the LLM to produce strictly formatted outputs (e.g., JSON) reduced performance on our planning tasks. A study<a href="https://arxiv.org/html/2408.02442v1" target="_blank">[6]</a> reports the same pattern( Strict formatting rules can hurt reasoning). So we use a simple, parseable text format (not JSON) during planning, and we observed better performance.

## Evaluation

### VLM-Dino method
{% include project-media.html
   type="image"
   src="dino_evaluation.jpg"
   caption="Fig. 14  Baseline method used for evaluation"
   size="medium"
%}
To evaluate our proposed VLM–DINO method, we implemented a baseline(**Fig. 14**). In this baseline, the VLM first selects the target object’s name. We pass that name to Grounding DINO to localize the object (bounding box), then apply SAM to segment it and compute the object’s 3D properties. The planner LLM consumes these object metadata (3D properties) together with the VLM-generated purpose of the selected object to produce the action sequence. For each instruction, we ran 10 trials per inputs(**Fig. 15**). The object layout was fixed across trials, while lighting varied naturally with sunlight. a trial is counted as success only if the selected object matches the ground-truth target, otherwise it is counted as failure.

<div class="media-grid-2">
  {% include project-media.html type="image" src="dino_eva_input.jpg" caption="Fig. 15. Inputs used in the evaluation." muted=true autoplay=true loop=true%}
  {% include project-media.html type="image" src="dino_eva_rate.jpg" caption="Fig. 16. Comparison of success rates between the baseline and the proposed method" muted=true autoplay=true loop=true%}
</div>

Grounding DINO showed low accuracy in some inputs while proposed method doesn't (**Fig. 16**). In Input 2, when the VLM produced “Fanta”, Grounding DINO assigned similar scores to a blue can and an orange can, so it couldn’t reliably detect the right target. By contrast, our method lets the VLM select the object directly, bypassing DINO, which yields higher accuracy. In Input 5, the VLM produced “black box” and “black stapler” but the scene contained two black boxes. the box near the image center had sharper edges, and Grounding DINO gave that (incorrect) box the highest score, which reduced the success rate.

This evaluation shows that bypassing Grounding DINO and letting the VLM select the object directly yields higher accuracy, especially in duplicate-object scenes and with specific product names (e.g., Fanta, Pocari Sweat).

### Side point cloud interpolation
<div class="media-grid-2">
  {% include project-media.html type="image" src="side_point_eva.jpg" caption="Fig. 17  Pointcloud input on Baseline and proposed method" muted=true autoplay=true loop=true%}
  {% include project-media.html type="image" src="side_eval_res1.jpg" caption="Fig. 18. Comparison between the baseline and the proposed method result" muted=true autoplay=true loop=true%}
</div>

To evaluate our proposed side point-cloud interpolation method, we compared the number of AnyGrasp candidate grasp points and the real-robot grasp success rate under two input settings: with interpolation and without interpolation. We tested three objects(a can, a small block, and a large block) chosen to match our gripper’s size (see **Fig. 17**). For each object, we ran 10 trials. The object layout was fixed across trials, while lighting varied naturally with sunlight. A trial was counted as success only if the physical grasp succeeded.

And result(**Fig.18**) shows index 1 (can), interpolation produced about 2x more grasp points, yet both inputs had similarly high success rates. For index 2 (large black box), the grasp-point gap was a little under 2×, and the success rates were again about the same. These two objects are large enough that top-down grasps already work well, so extra side grasp points do not change the outcome. In contrast, for index 3 (small black box), interpolation yielded about 3× more grasp points and 2× higher success. That's because the top surface is small, so vertical grasps often fail and side grasp is needed.

<div class="media-grid-2">
  {% include project-media.html type="image" src="colli_eval_input.jpg" caption="Fig. 19  Pointcloud input on Baseline and proposed method and example of grasp points" muted=true autoplay=true loop=true%}
  {% include project-media.html type="image" src="colli_eval_res.jpg" caption="Fig. 20. Comparison between the baseline and the proposed method result" muted=true autoplay=true loop=true%}
</div>

Furthermore, we evaluated AnyGrasp’s collision detection using side point-cloud inputs with and without interpolation (**Fig. 19**). For each condition, we ran 10 trials and compared the average number of grasp points, the number of collisions, and the grasp success rate. The results (**Fig. 20**) show about 3× more grasp points with interpolation, 2 collisions in the baseline (no interpolation), and 2× higher success rate in favor of interpolation.

### Total evaluation
<div class="media-grid-2">
  {% include project-media.html type="image" src="plan_eval_input.jpg" caption="Fig. 21  Inputs used in evaluation(Total evaluation)" muted=true autoplay=true loop=true%}
  {% include project-media.html type="image" src="plan_eval.jpg" caption="Fig. 22. Total evaluation result" muted=true autoplay=true loop=true%}
</div>

Finally we evaluated out project by inputs shown in **Fig. 21**. Input 1 was designed to evaluate brand-name recognition and grounding. Input 2 was used to evaluate preference-aware reasoning under negation, such as selecting a drink that is not Fanta. Input 3 was intended to evaluate multi-step reasoning and execution, involving both category classification and size-based selection. Input 4 was used to evaluate physical-scene risk assessment, namely the perception of an object likely to fall off the table, together with its execution. Finally, Input 5 was designed to evaluate global placement planning and size-ordered arrangement. And we measured the Perception Success Rate (whether the VLM correctly selects the object specified in the input), the Planning Success Rate (whether the system generates a correct action plan from the input), and the Execution Success Rate (whether the robot successfully executes the generated plan and AnyGrasp output).

The results(**Fig. 22**). For Inputs 1–3, perception and planning achieved 90–100%, while execution was 70–90%. In Input 2, the LLM once picked “Fanta” even though it was not preferred, which led to the 90% planning success. In Input 3, the VLM misclassified the black box as a chocolate bar, and the the planner mistakenly left the edible item in the remaining set, yielding 90% for both perception and planning and 70% execution. In contrast, Inputs 4 and 5 performed worse. For Input 4, after placing the largest object to the left of the white box, the object(about to fall) moved out of view. without a target re-acquisition/search policy, the LLM selected an incorrect object (60% perception, 40% execution). For Input 5, the planner sometimes selected the white box, and the perception module treated a partially cropped object as the smallest, reducing performance to 70% perception, 60% planning, and 30% execution.

## Limitation and future work

### Action modules
During this project, we confirmed that an LLM can produce long-horizon task plans (e.g., building a dolmen, pyramid, or tower) but cannot synthesize the fine, continuous, dexterous motion paths required for execution. To address this, we found the <a href="https://arxiv.org/pdf/2410.24164" target="_blank">pi_0</a> paper’s method promising and we will adopt it: a transformer VLM encodes text, images, and robot state into a context representation, and an action expert trained with flow matching generates the continuous action sequence conditioned on that context. We will keep the LLM at the planning layer (short, grounded subtask texts) and call pi_0 as a manipulation agent for execution, and we will expand the set of supported actions so that the LLM can select the proper module and feed clear step-level instructions.

### Perception
During the project, we observed that The LLM only uses the objects visible in the camera frame. When the true target is out of view, it often selects a visible non-target instead (see the video and image below).
<div class="media-grid-2">
  {% include project-media.html type="video" src="perception_limit_1.mp4" caption="input : place the Fanta to the left of white box, place the object that looks like it’s about to fall off the desk in front of the white box, and from the remaining objects place the smallest on the white box." muted=true autoplay=true loop=true%}
  {% include project-media.html type="image" src="perception_limit.png" caption="Limitation with a single-view camera. When the target “about to fall” is outside the camera’s field of view, the system considers only visible objects and chooses a distractor" muted=true autoplay=true loop=true%}
</div>

Additionally, because we interpolate side points by extruding the 2D top mask vertically, which assumes linear, vertical walls. For objects with non-linear side geometry (curved,tapered..), this leads to misestimated geometry and can produce invalid grasp poses.(**Fig. 23**)
{% include project-media.html
   type="image"
   src="incorrect_side.jpg"
   caption="Fig. 14  Example of a limitation in the side point-cloud interpolation method"
   size="medium"
%}

There are study related this problem. One study suggests making camera track best scene like human being, although it is processed by BC-RL but If we attach Imitation learned module (like we attached anygrasp to grasp obect), by 
