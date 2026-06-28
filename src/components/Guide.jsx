import { Surface } from "@heroui/react";

export default function Guide() {
  return (
    <>
      <h2>Application Guide</h2>
      <Surface className="flex w-full flex-col gap-2 rounded-2xl p-4">
        <h3>About the app </h3>
        <p>
          Living far from home as a university student means there is nobody
          around to remind me when my eating habits become questionable.{" "}
          <span className="font-tangerine! text-2xl">The Weekly Roast</span>{" "}
          emails me an LLM generated message that critiques the meals I cooked
          and ordered during the week.
        </p>
				<p>This app is created by Ralfazza Rajariandhana, visit <a href="https://ralfazza.com" className="font-mono text-blue-500">ralfazza.com</a> for more fun projects.</p>
      </Surface>
      <Surface className="flex w-full flex-col gap-2 rounded-2xl p-4">
        <h3>How to use</h3>
        <p>
          Entry what you have eaten and drink throughout the week. At the end of
          the week, go to the roast page. There you can either choose which
          entries to roast from (this week or the previous week). Hit the Roast
          button, wait for a few seconds while the server is generating the
          roast and ... voila! Hopefully the harsh critique will put some sense
          on your mind and make you more health concious about your food.
        </p>
      </Surface>
      <Surface className="flex w-full flex-col gap-2 rounded-2xl p-4">
        <h3>Future Plans</h3>
        <ul>
					<li>1. Auto food detection. No longer need to input the food manually, just take a picture and the app will fill the form themselves.</li>
					<li>2. Save the roast as an image that you can share on your social media.</li>
					<li>3. Give a personality to the roast.</li>
					<li>4. Animations to make the app more responsive.</li>
					<li>5. Fix timezone issues. Currently the app saves data on UTC and could have difficulties when accessed with people on different timezones.</li>
				</ul>
      </Surface>
    </>
  );
}
