<template>
  <v-container style="max-width: 800px">
    <v-text-field
      v-model="newTask"
      label="작업할 일을 등록하세요."
      solo
      @keydown.enter="create"
    >
      <template v-slot:append>
        <v-fade-transition>
          <v-icon
            v-if="newTask"
            @click="create"
          >
            mdi-plus-circle
          </v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>

    <v-divider class="mt-4"></v-divider>

    <v-row
      class="my-1"
      align="center"
    >
   
      <v-spacer></v-spacer>
      <strong class="mx-4 info--text text--darken-1">
      <a href="#/all" :class="{ selected: visibility === 'all' }">All({{ tasks.length }})</a>
      </strong>
      <v-divider vertical></v-divider>

      <strong class="mx-4 info--text text--darken-2">
      <a href="#/active" :class="{ selected: visibility === 'active' }">Active ({{ remainingTasks }}) </a>
      </strong>
      <v-divider vertical></v-divider>
          <strong class="mx-4 success--text text--darken-2">
      <a href="#/completed" :class="{ selected: visibility === 'completed' }">Completed ({{ completedTasks }})</a>
      </strong>
      <v-divider vertical v-show="tasks.length > remainingTasks"></v-divider> 
      <button class="mx-4 success--text text--darken-2" @click="removeCompleted" v-show="tasks.length > remainingTasks">
         Clear completed
      </button>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="tasks.length > 0">
      <v-slide-y-transition
        class="py-0"
        group
        tag="v-list"
      >
        <template v-for="(task, i) in filteredTodos">
          <v-divider
            v-if="i !== 0"
            :key="`${i}-divider`"
          ></v-divider>

          <v-list-item :key="`${i}-${task.text}`">
            <v-list-item-action>
              <v-checkbox
                v-model="task.done"
                :color="task.done && 'grey' || 'primary'"
              >
                <template v-slot:label>
                  <div
                    :class="task.done && 'grey--text' || 'primary--text'"
                    class="ml-4"
                    v-text="task.text"
                  ></div>
                </template>
              </v-checkbox> 
              
            </v-list-item-action>

            <v-spacer></v-spacer>
          
            <v-scroll-x-transition>
              <v-icon   v-if="task.done"  @click="removeTodo(`${i}`)" > mdi-delete</v-icon>
  
            </v-scroll-x-transition>
          </v-list-item>
        </template>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>

<script>
  import HelloWorld from '../components/HelloWorld'

  const  filters  =  { 
  all: (tasks) => tasks,
  active: (tasks) => tasks.filter((task) => !task.done),
  completed: (tasks) => tasks.filter((task) => task.done)
}

  export default {
    name: 'Home',

    components: {
      HelloWorld,
    },
     data: () => ({
      tasks: [
        {
          done: false,
          text: 'Vue숙제하기',
        },
        {
          done: false,
          text: '남한산성 등산하기',
        },
        {
          done:false,
          text:'노트북 수리하기'
        }
      ],
      newTask: null,
      visibility: 'all'
    }),

  mounted() {
    window.addEventListener('hashchange', this.onHashChange)
    this.onHashChange()
  },

    computed: {
      completedTasks () {
        return this.tasks.filter(task => task.done).length
      },
 
      remainingTasks () {
        return this.tasks.length - this.completedTasks
      },

      filteredTodos() {
      	return filters[this.visibility](this.tasks)
   	 },

    },

    methods: {
      create () {
        this.tasks.push({
          done: false,
          text: this.newTask,
        })

        this.newTask = null
      },

      onHashChange() {
      var visibility = window.location.hash.replace(/#\/?/, '')
      if (filters[visibility]) {
        this.visibility = visibility
      } else {
        window.location.hash = ''
        this.visibility = 'all'
      }
    } , 
        removeCompleted() {
      this.tasks = filters.active(this.tasks)
    },
       removeTodo(todo) { 
      this.tasks.splice(todo, 1)
    },
    },
  }
</script>
 