---
title: "Off-grid AI: running agents on sunshine"
description: "With all the talk of power-hungry data centers, we're testing a smaller idea: useful AI on a small computer, in a cabin in the woods, powered by the sun. Here's where it stands, losses and all."
---

Every week there's another headline about AI data centers. They need gigawatts, new power plants and huge amounts of water. You could be forgiven for thinking AI only runs at that scale.

We're testing a different idea. What if a lot of useful AI could run on a small computer, in a cabin in the woods, powered by the sun?

<!-- Photo slot: swap in a real aerial or drone shot of the property, cabin and panels when available. -->
<figure>
  <img src="/src/assets/posts/off-grid-ai-cabin.svg" alt="Illustrated aerial view of the container cabin in a forest clearing, with two rows of solar panels and the battery enclosure" />
  <figcaption>The test site: a container cabin in the woods, four panels and two batteries. Illustration, not to scale.</figcaption>
</figure>

## The experiment

We have an all-electric container cabin in the woods. There's no gas, just a fridge, an electric water heater and the basics. We're only there once or twice a month. So the plan is simple: let solar slowly fill the batteries between visits, and store enough to get us through a weekend.

The next step is off-grid AI. We'll put a power-efficient computer in the cabin (we're looking at a Mac Mini) running small local AI models. Those models will power specialized agents, including sub-agents on platforms like Blocks. They do focused jobs well and have no cloud bill.

## The setup, exactly as it is

No generic kit list. This is what's installed:

- Two Anker SOLIX F3800 batteries (A1790)
- One Anker Home Power Panel (A17B1), tied into the cabin's electrics
- Four Anker PS400 panels, two per F3800, so about 800 W into each unit. That's well under what each F3800 can take.
- A 50A service

<!-- Photo slot: real photo of the two F3800s and the Home Power Panel installed, cabling visible. -->
<figure>
  <img src="/src/assets/posts/off-grid-ai-system.svg" alt="Diagram: two pairs of PS400 panels feed two F3800 batteries, which both feed the Home Power Panel and then the cabin. F3800 number two is marked as stuck on old firmware." />
  <figcaption>How the power flows. The dashed box is the battery that won't update.</figcaption>
</figure>

## The honest part: we're not there yet

We're about halfway. On paper the system should be plenty. In practice:

- Adding panels didn't add usable power.
- The Home Power Panel app showed healthy solar input, but output was roughly half of it.
- Over one week of tracking, the batteries drained even though solar input was several times what the cabin actually used.
- One F3800 won't take a firmware update over Bluetooth, and support couldn't fix it. That may mean the two units are out of sync, with only one really contributing.
- Anker's explanation for the drain is 50–60% conversion efficiency at light loads. A cabin that sits empty most of the month is almost all light load.

<!-- Photo slot: screenshot from the Anker app showing solar input vs. output for the same week. -->
<figure>
  <img src="/src/assets/posts/off-grid-ai-week.svg" alt="Bar chart of one week: solar input 12.42 kWh, grid supply 5.07 kWh, house usage 2.90 kWh. Battery charge fell from about 50 percent to about 5 percent." />
  <figcaption>One week, Aug 18–22. Far more energy went in than the cabin used, and the battery still drained.</figcaption>
</figure>

That last point is the real lesson.

> Efficiency at small scale is its own problem. A system can lose more power running nearly empty than the loads it's actually serving.

The cabin's usage pattern makes this worse. For most of the month the only thing running is the fridge. The electric water heater is the biggest spike, so we switch it off while we're away, especially in winter. That leaves the system idling at exactly the point where it's least efficient.

## Why this matters for AI

The data center debate is about scale. The same question applies at every size, though: how much of the energy goes to useful work, and how much is lost along the way?

Small models on efficient hardware can do a lot of specialized work for a fraction of the power. But off-grid AI only works if the power system underneath it is honest about its own losses. Getting the solar right comes first.

<!-- Photo slot: real photo of the Mac Mini or M1 Mac set up in the cabin, once it's installed. -->
<figure>
  <img src="/src/assets/posts/off-grid-ai-stack.svg" alt="Diagram of the planned stack: sun, four panels, two batteries, a small computer such as a Mac Mini, and local models running specialized agents and a Blocks sub-agent." />
  <figcaption>The plan: sun to panels to batteries to one small computer running local agents.</figcaption>
</figure>

## What's next

- Get the firmware sorted so both batteries work together. First try: update the stuck unit over Wi-Fi instead of Bluetooth.
- Test each F3800 on its own to confirm which one causes the gap.
- Have our electrician check the main cable, current-sensor placement and sub-panel loads, then measure again.
- Get the cabin fully on solar.
- Bring in the computer, run local agents, and track exactly how much power they use.

If you work in solar or run AI models locally, we'd love your input. We'll share the numbers as we go.
