<div class="todo-list-container">
	<Title title="{title}">
		<span slot="subtitle">
			This todo list app make by svelte.
		</span>
	</Title>
	<div class="todo-list-container-list">
		<CheckList bind:todoList on:add={addTodoList} on:delete={deleteTodoList}></CheckList>
	</div>
</div>

<script>
	// Import
	import {onMount} from 'svelte';

	import Title from "./components/Title.svelte"
	import CheckList from "./components/CheckList.svelte";
	
	// Props

	// Inner Model
	let title = 'Todo list'
	let todoList = []

	function addTodoList ({detail}) {
		todoList = [...todoList, detail]

		localStorage.setItem('todoList', JSON.stringify(todoList))
	}

	function deleteTodoList ({detail}) {
		todoList = todoList.filter(todo => todo.id !== detail)
	}

	onMount(() => {
		const loadTodoList = localStorage.getItem('todoList')

		if (loadTodoList) {
			todoList = JSON.parse(loadTodoList)
		}
	})
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Gugi&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<style>
	* {
		font-family: 'Gugi', cursive;
	}
	
	.todo-list-container {
		display: flex;
		flex-direction: column;

		padding: 20px;
	}

	.todo-list-container-list {
		width: 100%;
		height: 300px;
		max-width: 1200px;

		margin: 0 auto;

		display: flex;
		justify-content: center;
	}
</style>
