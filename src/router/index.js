import { createRouter, createWebHashHistory } from 'vue-router'
import SubjectSelection from '../views/SubjectSelection.vue'
import ClassSelection from '../views/ClassSelection.vue'
import ModuleSelection from '../views/ModuleSelection.vue'
import LessonView from '../views/LessonView.vue'
import { subjectBySlug } from '../data/subjects.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SubjectSelection
  },

  // ── Per vak ───────────────────────────────────────────────────────────────
  // De landing page biedt meteen vak + klas. De oude tussenpagina voor
  // leerjaren is niet meer deel van de gebruikersflow.
  {
    path: '/:subject',
    name: 'ClassSelectionDirect',
    component: ClassSelection,
    props: true
  },
  {
    path: '/:subject/class/:classId',
    name: 'ModuleSelectionDirect',
    component: ModuleSelection,
    props: true
  },
  {
    path: '/:subject/year/:id/class/:classId',
    name: 'ModuleSelection',
    component: ModuleSelection,
    props: true
  },

  // ── Les zelf ──────────────────────────────────────────────────────────────
  // Eén segment, dus geen conflict met /:subject hierboven.
  {
    path: '/les/:id',
    name: 'Lesson',
    component: LessonView,
    props: true
  },

  // Onbekende slug → terug naar het vakkenoverzicht
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

/**
 * Bewaakt de vak-slug in de URL: een onbekend of uitgeschakeld vak
 * stuurt terug naar het vakkenoverzicht.
 */
router.beforeEach((to) => {
  const slug = to.params.subject
  if (slug && !subjectBySlug(slug)) {
    return { path: '/' }
  }

  return true
})

export default router
