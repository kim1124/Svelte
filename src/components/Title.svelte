<div class="todo-list-title">
    <h1>{title}</h1>
    <slot name="subtitle"></slot>
</div>

<script>
    export let title = ''
</script>

<style>
    h1 {
        color: orange;
        font-size: 4em;

        margin-bottom: 10px;
    }

    .todo-list-title {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        margin-bottom: 20px;
    }
</style>
