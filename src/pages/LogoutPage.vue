<script setup>
import { onBeforeMount } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const { clearUser } = useUserStore();

const router = useRouter();

onBeforeMount(() => {
	localStorage.clear();

	clearUser();

	router.push({ path: "/login" });
});
</script>
