<script setup lang="ts">
import highligthProps from '@/data/capCakes';

</script>

 <template>
	<section class="container pt-5">
		<h1 class="text-center text-dark mb-5">Why choose CapCAKES?</h1>

		<div class="row">
			<div
				class="col-12 col-md-6 col-lg-4 my-3"
				v-for="item in highligthProps"
				:key="item.title"
			>
				<div class="card cardHighlights shadow-sm h-100 py-3">
					<h1 class="text-center display-1 text-warning">
						<i :class="item.icon"></i>
					</h1>

					<div class="card-body text-center">
						<h4 class="card-title fw-bold mb-2">{{ item.title }}</h4>
						<p class="card-text text-muted mb-2">
							{{ item.description.slice(0, 120) + (item.description.length > 120 ? '...' : '') }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>