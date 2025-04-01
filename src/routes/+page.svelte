<script lang="ts">
	import * as Accordion from '../lib/components/ui/accordion';
</script>

<div class="flex flex-col justify-center items-center space-y-10 mx-auto my-10 w-[80%]">
	<Accordion.Root type="single">
		<Accordion.Item>
			<Accordion.Trigger>Trigger1</Accordion.Trigger>
			<Accordion.Content>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptates
				veniam similique magnam rerum saepe officiis cumque labore atque, dolores velit
				obcaecati libero. Officiis beatae eius natus, voluptatibus magni soluta?
			</Accordion.Content>
		</Accordion.Item>

		<Accordion.Item>
			<Accordion.Trigger>Trigger2</Accordion.Trigger>
			<Accordion.Content>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptates
				veniam similique magnam rerum saepe officiis cumque labore atque, dolores velit
				obcaecati libero. Officiis beatae eius natus, voluptatibus magni soluta?
			</Accordion.Content>
		</Accordion.Item>

		<Accordion.Item>
			<Accordion.Trigger>Trigger3</Accordion.Trigger>
			<Accordion.Content>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptates
				veniam similique magnam rerum saepe officiis cumque labore atque, dolores velit
				obcaecati libero. Officiis beatae eius natus, voluptatibus magni soluta?
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</div>
