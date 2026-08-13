# TotalBiz Support AI Life Hacks Template

## Purpose

This package contains the reusable composition assets behind the final **TotalBiz Support AI Life Hack 1** post. The template is designed for vertical social video at **1080 × 1920 pixels**. A tutorial recording plays inside the illustrated phone, while the title, three-step instructions, presenter portrait, and TotalBiz Support logo remain fixed around it.

> **Reusable structure:** replace the tutorial recording and text, then retain the phone mock-up, portrait, logo, colour system, and layout positions for a consistent series.

## Package contents

| Path | What it is | How to reuse it |
| --- | --- | --- |
| `assets/phone_in_hand_green_screen.png` | The photorealistic phone-in-hand composition plate. The phone display is green so a new recording can be placed inside it. | Keep this image unchanged. It is the foundation for the series look. |
| `assets/presenter_portrait.png` | The supplied circular presenter portrait. | Keep in the top-centre header position, aligned to the cyan accent line. |
| `assets/totalbiz_logo_dark_blended.png` | The dark-background-ready TotalBiz Support logo treatment. | Keep in the top-right area against the navy background. |
| `examples/example_tutorial_recording.mp4` | The original example tutorial recording used for Life Hack 1. | Replace this with a new vertical screen recording for the next Life Hack. |
| `render/lifehack_filter_template.txt` | The composition layout and styling source. It includes placement of the phone display, portrait, logo, title, step panel, colours, and text. | Change the text strings and, if needed, the step-panel copy for each new post. |

## What to change for a new Life Hack

Create a new vertical recording, then decide the short title and three steps before rendering. The most readable approach uses a short label, a two-line headline, and three concise actions.

| Content field | Current Life Hack 1 example | Suggested future format |
| --- | --- | --- |
| Series label | `AI LIFE HACK 1` | `AI LIFE HACK 2` |
| Headline line 1 | `FACT-CHECK A` | 2–4 short words |
| Headline line 2 | `SOCIAL POST` | 2–4 short words |
| Subtitle | `Before you share it.` | One short supporting sentence |
| Step 1 | `Take a screenshot` | A direct verb-led action |
| Step 2 | `Share it with Google Gemini` | A direct verb-led action |
| Step 3 | `Type Fact check` | A direct verb-led action |

The template works best when each step is limited to two short lines. Avoid long sentences, because mobile viewers need to understand the action in a brief glance.

## Rendering workflow

The final posts were assembled as a layered video composition. The tutorial recording is cropped and fitted inside the phone display, then the original phone bezel and hand are placed over it. The title, step panel, portrait, logo, and safety note are added as text and graphics above the background.

To create a new post, place the new recording in the `examples` folder and update the first input reference in the render command. Then update the text values in `render/lifehack_filter_template.txt` for the new title and three steps. The existing final video is a working visual reference for safe text scale and placements.

The key visual positions are shown below.

| Element | Intended position | Keep or change? |
| --- | --- | --- |
| Presenter portrait | Top centre, aligned vertically with the cyan divider | Keep fixed |
| TotalBiz Support logo | Top right, blended into the navy background | Keep fixed |
| AI Life Hack label | Upper left | Update its number |
| Headline and subtitle | Upper left, below the label | Update every post |
| Step panel | Left side, above the phone fingers | Update text only |
| Tutorial recording | Inside the phone display | Replace every post |
| Trust reminder | Lower left | Keep as a series-level reminder |

## Practical note

This is a **source-asset and layout template**, rather than a drag-and-drop Canva project. The editable layout source is included so the same visual system can be rendered consistently. If you send a new screen recording and the three steps for a future Life Hack, the template can be reused directly with the same presentation style.

## Life Hack 2 Content Worksheet

Use this small brief when preparing the next post.

```text
Series number:
Headline line 1:
Headline line 2:
Subtitle:
Step 1:
Step 2:
Step 3:
Tutorial recording filename:
Optional caption focus:
```

## Reference

The rendered example for the final Life Hack 1 design is available separately as `TotalBiz_Support_AI_Life_Hack_1_PORTRAIT_ALIGNED.mp4`.
