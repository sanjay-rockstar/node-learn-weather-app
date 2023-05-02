const tasks = {
    tasks: [
        {
            text: 'Grocery shopping',
            completed: true
        },
        {
            text: 'Clean yard',
            completed: false
        },
        {
            text: 'Film course',
            completed: false
        }
    ],
    getTasksToDo() {
        const tasksIncomplete = this.tasks.filter(
            (task) => !task.completed
        )
        return tasksIncomplete
    }
}
console.log(tasks.getTasksToDo())