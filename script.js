document.addEventListener('DOMContentLoaded', () => {
    const tasks = [];
    const taskForm = document.getElementById('taskForm');
    const taskContainer = document.getElementById('tasks');
    const sortButton = document.getElementById('sortTasks');

    // Додати завдання
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const dueDate = document.getElementById('dueDate').value;
        const priority = document.getElementById('priority').value;

        tasks.push({ title, dueDate: new Date(dueDate), priority });
        renderTasks();
        taskForm.reset();
    });

    // Відобразити завдання
    function renderTasks() {
        taskContainer.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-item');
            taskElement.innerHTML = `
                <strong>${task.title}</strong> - ${task.dueDate.toLocaleDateString()} - 
                <span>${mapPriorityToUkrainian(task.priority)}</span>
                <button onclick="removeTask(${index})">Видалити</button>
            `;
            taskContainer.appendChild(taskElement);
        });
    }

    // Сортувати завдання
    sortButton.addEventListener('click', () => {
        tasks.sort((a, b) => {
            // Порівняння за пріоритетом (за спаданням)
            const priorityOrder = ['None', 'Low', 'Medium', 'High', 'Urgent'];
            const priorityComparison = priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority);
            if (priorityComparison !== 0) return priorityComparison;

            // Порівняння за датою завершення (за зростанням)
            const dueDateComparison = new Date(a.dueDate) - new Date(b.dueDate);
            if (dueDateComparison !== 0) return dueDateComparison;

            // Порівняння за назвою (алфавітний порядок)
            return a.title.localeCompare(b.title);
        });
        renderTasks();
    });

    // Видалити завдання (глобальна функція для простоти)
    window.removeTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    // Мапінг пріоритетів на українську мову
    function mapPriorityToUkrainian(priority) {
        const priorityMap = {
            None: 'Немає',
            Low: 'Низький',
            Medium: 'Середній',
            High: 'Високий',
            Urgent: 'Терміновий'
        };
        return priorityMap[priority];
    }
});
