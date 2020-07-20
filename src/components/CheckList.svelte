<div class="todo-list-checklist">
    <!-- 진행해야 할 일 -->
    <div class="todo-list-do">
        {#each doList as todo (todo.id)}
            <div class="todo-list-item" in:receive="{{key: todo.id}}" out:send="{{key: todo.id}}" animate:flip>
                <input bind:value={todo.title}>
                <i class="material-icons" on:click={() => onClickFinishTodo(todo)} title="Finish todo">done</i>
                <i class="material-icons" on:click={() => onClickDeleteTodo(todo.id)} title="Delete todo">delete</i>
            </div>
        {/each}
        <div class="todo-list-item">
            <input placeholder="Add new todo" bind:value={newTodo} on:keydown={e => {
                if (e.key === 'Enter') {
                    onClickAddTodo()
                }
            }}>
        </div>
    </div>

    <!-- 완료된 일 -->
    <div class="todo-list-fin">
        {#each finList as todo (todo.id)}
            <div class="todo-list-item" in:receive="{{key: todo.id}}" out:send="{{key: todo.id}}" animate:flip>
                <input bind:value={todo.title}>
                <i class="material-icons" on:click={() => onClickRestartTodo(todo)}>replay</i>
                <i class="material-icons" on:click={() => onClickDeleteTodo(todo.id)} title="Delete todo">delete</i>
            </div>
        {/each}
    </div>
</div>

<script>
    import {flip} from 'svelte/animate';
    import {quintOut} from 'svelte/easing';
    import {crossfade} from 'svelte/transition';
    import {createEventDispatcher} from 'svelte'

    let newTodo = ''
    export let todoList = []

    $: doList = todoList.filter(todo => !todo.isFin)
    $: finList = todoList.filter(todo => todo.isFin)

    const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
    });
    
    const todoListDispatch = createEventDispatcher()

    function onClickAddTodo () {
        todoListDispatch('add', {
            id: todoList.length,
            title: newTodo,
            isFin: false
        })

        newTodo = ''
    }

    function onClickDeleteTodo (id) {
        todoListDispatch('delete', id)
    }

    function onClickFinishTodo ({id, title, isFin}) {
        const targetIdx = todoList.findIndex((todo) => todo.id === id)

        if (targetIdx > -1) {
            todoList[targetIdx].isFin = true
        }
    }

    function onClickRestartTodo ({id, title, isFin}) {
        const targetIdx = todoList.findIndex((todo) => todo.id === id)

        if (targetIdx > -1) {
            todoList[targetIdx].isFin = false
        }
    }
</script>

<style>
    .todo-list-checklist {
        width: 100%;
        height: 100%;

        color: white;

        display: flex;
        justify-content: center;
	}

    .todo-list-do {
        flex: 1;
        margin-right: 10px;
        background-color: #ff3e00;

        padding: 20px;
        border-radius: 10px;

        overflow-y: auto;
    }

    .todo-list-fin {
        flex: 1;
        background-color: #40b3ff;
        border-radius: 10px;

        padding: 20px;

        overflow-y: auto;
    }
    

    .todo-list-item {
        font-size: 20px;
        font-family: 'Nanum Pen Script', cursive;

        height: 50px;

        display: flex;
        align-items: center;

        padding: 0 10px;
        margin-bottom: 10px;

        border: 1px solid white;
        border-radius: 5px;
    }

    .todo-list-item input {
        color: white;

        width: 100%;

        margin: 0;
        
        display: inline-block;
        border: none;
        background-color:transparent
    }

    .todo-list-item input:focus {
        outline: none;
    }

    .todo-list-item input::placeholder {
        color: white;
    }

    .todo-list-item i {
        cursor: pointer;
    }
</style>
