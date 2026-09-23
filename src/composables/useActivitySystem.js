import { defineAsyncComponent, shallowRef } from 'vue'

// Activiteiten die in de fysica- en biologielessen van deze repo gebruikt worden.
const DragDropActivity = defineAsyncComponent(() => import('../components/activities/DragDropActivity.vue'))
const MixedRetrievalActivity = defineAsyncComponent(() => import('../components/activities/MixedRetrievalActivity.vue'))
const ForcesLabActivity = defineAsyncComponent(() => import('../../s-activities/ForcesLabActivity.vue'))
const SpringForceLabActivity = defineAsyncComponent(() => import('../../s-activities/SpringForceLabActivity.vue'))
const CircuitsActivity = defineAsyncComponent(() => import('../../s-activities/CircuitsActivity.vue'))
const IdealGasLawActivity = defineAsyncComponent(() => import('../../s-activities/IdealGasLawActivity.vue'))
const PressureLabActivity = defineAsyncComponent(() => import('../../s-activities/PressureLabActivity.vue'))
const OpticsLabActivity = defineAsyncComponent(() => import('../../s-activities/OpticsLabActivity.vue'))

const COMPONENT_MAP = {
  dragDrop: DragDropActivity,
  mixedRetrieval: MixedRetrievalActivity,
  forcesLab: ForcesLabActivity,
  springForceLab: SpringForceLabActivity,
  circuits: CircuitsActivity,
  idealGasLaw: IdealGasLawActivity,
  pressureLab: PressureLabActivity,
  opticsLab: OpticsLabActivity
}

export function useActivitySystem(lessonData, markAsDoneCallback) {
  const activeActivity = shallowRef(null)
  function getActivityProps(type, data) {
    const { type: _type, ...otherData } = data
    return { ...otherData }
  }
  function handleOpenActivity(id) {
    const cleanId = id.replace('card-', '').replace('oly-', '')
    const data = lessonData.activities?.[id] || lessonData.activities?.[cleanId]
    if (!data) {
      console.warn(`[ActivitySystem] No data found for ID '${id}'`)
      return
    }
    const type = data.type
    if (!type || !COMPONENT_MAP[type]) {
      console.warn(`[ActivitySystem] Unknown type '${type}' for ID '${id}'`)
      return
    }
    activeActivity.value = {
      id: cleanId,
      component: COMPONENT_MAP[type],
      props: getActivityProps(type, data)
    }
  }
  function closeActivity() { activeActivity.value = null }
  function completeActivity() {
    if (activeActivity.value?.id && markAsDoneCallback) {
      markAsDoneCallback('card-' + activeActivity.value.id)
    }
    closeActivity()
  }
  return { activeActivity, handleOpenActivity, closeActivity, completeActivity }
}
