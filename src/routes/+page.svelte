<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
</script>

<div class="mx-auto my-10 flex w-[80%] flex-col items-center justify-center space-y-10">
	<Accordion.Root type="single">
		<Accordion.Item>
			<Accordion.Trigger>Trigger1</Accordion.Trigger>
			<Accordion.Content>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, laboriosam
				perspiciatis ut fuga, ab reiciendis nesciunt saepe vitae reprehenderit sint quia,
				labore voluptatibus ullam expedita ducimus. Ipsum nemo atque nam?
			</Accordion.Content>
		</Accordion.Item>

		<Accordion.Item>
			<Accordion.Trigger>Trigger2</Accordion.Trigger>
			<Accordion.Content>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, laboriosam
				perspiciatis ut fuga, ab reiciendis nesciunt saepe vitae reprehenderit sint quia,
				labore voluptatibus ullam expedita ducimus. Ipsum nemo atque nam?
			</Accordion.Content>
		</Accordion.Item>

		<Accordion.Item>
			<Accordion.Trigger>Trigger3</Accordion.Trigger>
			<Accordion.Content>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, laboriosam
				perspiciatis ut fuga, ab reiciendis nesciunt saepe vitae reprehenderit sint quia,
				labore voluptatibus ullam expedita ducimus. Ipsum nemo atque nam?
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</div>
