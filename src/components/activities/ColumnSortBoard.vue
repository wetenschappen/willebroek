<script setup>
/**
 * ColumnSortBoard - kaarten in de juiste kolom plaatsen.
 *
 * Puur presentatie- en interactiecomponent zonder shell. Wordt gebruikt als
 * vraagtype `column-sort` in een ticket (zie TicketModal.vue): de leerling ziet
 * de feedback pas op het eindscherm, zodat de opdracht diagnostisch blijft.
 *
 * Elke kaart draagt zijn juiste kolom in de data (`column`), dus de oplossing
 * staat in het lesbestand en niet in deze component.
 *
 * Bediening: slepen met de muis, of eerst op een kaart tikken en dan op een
 * kolom. Dat tweede is er voor aanraakschermen en voor toetsenbordgebruik,
 * waar HTML5 drag-and-drop niet werkt.
 */
import { computed, ref } from 'vue'
import { PhCheckCircle, PhXCircle, PhX } from '@phosphor-icons/vue'

const props = defineProps({
    // [{ id, label, hint?, items: [{ id, text, column }] }]
    columns: { type: Array, required: true },
    // { kaartId: kolomId }
    modelValue: { type: Object, default: () => ({}) },
    // true = meteen groen/rood tonen (oefenmodus), false = neutraal laten
    revealAnswers: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const selectedCard = ref(null)

const allCards = computed(() => props.columns.flatMap(column => column.items || []))

/**
 * Vaste, voorspelbare volgorde: de kaarten wisselen elkaar af per kolom
 * (normdruk, onderdruk, overdruk, normdruk, ...). Zo staan kaarten van
 * dezelfde soort nooit als een blok bij elkaar en kan niemand de volgorde
 * gebruiken om te gokken. Bewust niet willekeurig: de volgorde blijft gelijk
 * als de component opnieuw rendert.
 */
const orderedCards = computed(() => {
    const rows = Math.max(0, ...props.columns.map(column => (column.items || []).length))
    const out = []
    for (let row = 0; row < rows; row++) {
        for (const column of props.columns) {
            const card = (column.items || [])[row]
            if (card) out.push(card)
        }
    }
    return out
})

function placedIn(columnId) {
    return allCards.value.filter(card => props.modelValue[card.id] === columnId)
}

function bankCards() {
    return orderedCards.value.filter(card => props.modelValue[card.id] === undefined)
}

function pick(cardId) {
    selectedCard.value = selectedCard.value === cardId ? null : cardId
}

/**
 * Plaatst of verplaatst een kaart. Overschrijven mag: een kaart die al in een
 * kolom staat kan zo rechtstreeks naar een andere kolom worden gesleept. Via
 * de kaartenbank kan dat niet, want daar staan alleen nog niet geplaatste
 * kaarten.
 */
function place(cardId, columnId) {
    if (!cardId || !columnId) return
    const card = allCards.value.find(item => item.id === cardId)
    if (!card || isLocked(card)) return
    emit('update:modelValue', { ...props.modelValue, [cardId]: columnId })
    selectedCard.value = null
}

function remove(cardId) {
    const next = { ...props.modelValue }
    delete next[cardId]
    emit('update:modelValue', next)
}

function isCorrect(card) {
    return props.modelValue[card.id] === card.column
}

/**
 * Met meteen groen/rood erbij mag een kaart die juist staat niet meer
 * verschuiven: dat voorkomt dat een leerling per ongeluk een goed antwoord
 * weer omgooit. Zelfde regel als in DragDropActivity.
 */
function isLocked(card) {
    return props.revealAnswers && isCorrect(card)
}

function cardStyle(card) {
    if (props.revealAnswers) {
        return isCorrect(card)
            ? { background: 'var(--color-workbook-soft)', border: '2px solid var(--color-workbook)' }
            : { background: 'var(--color-presentation-soft)', border: '2px solid var(--color-presentation)' }
    }
    return { background: 'var(--color-panel)', border: '2px solid var(--color-digital)' }
}

// Drag-and-drop (muis). Ook een kaart die al in een kolom staat mag worden
// opgepakt, zodat verplaatsen tussen kolommen in één beweging gaat.
function onDragStart(cardId, event) {
    const card = allCards.value.find(item => item.id === cardId)
    if (card && isLocked(card)) {
        event.preventDefault()
        return
    }
    selectedCard.value = cardId
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', cardId)
}

function onDragOver(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
}

function onDrop(columnId, event) {
    event.preventDefault()
    const cardId = event.dataTransfer.getData('text/plain') || selectedCard.value
    place(cardId, columnId)
}
</script>

<template>
<div>
    <div class="grid gap-4" :style="{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }">
        <section
            v-for="column in columns"
            :key="column.id"
            class="flex flex-col rounded-card"
            :style="{
                border: selectedCard ? '2px solid var(--color-digital)' : '2px solid var(--color-line)',
                background: 'var(--color-panel)',
                padding: '16px',
                minHeight: '260px',
                cursor: selectedCard ? 'pointer' : 'default'
            }"
            role="group"
            :aria-label="`Kolom ${column.label}. ${selectedCard ? 'Klik om de gekozen kaart hier te plaatsen.' : 'Sleep een kaart naar deze kolom.'}`"
            @dragover="onDragOver"
            @drop="onDrop(column.id, $event)"
            @click="place(selectedCard, column.id)"
        >
            <header class="mb-3 pb-3" style="border-bottom: 2px solid var(--color-line)">
                <h4 class="text-lg font-bold text-ink">{{ column.label }}</h4>
                <p v-if="column.hint" class="text-sm text-ink-soft mt-1">{{ column.hint }}</p>
            </header>

            <div class="flex flex-col gap-2 flex-1">
                <div
                    v-for="card in placedIn(column.id)"
                    :key="card.id"
                    class="rounded-control px-3 py-2 flex items-start gap-2"
                    :draggable="!isLocked(card)"
                    :style="cardStyle(card)"
                    @dragstart="onDragStart(card.id, $event)"
                >
                    <PhCheckCircle v-if="revealAnswers && isCorrect(card)" weight="fill" class="shrink-0 mt-0.5" style="color: var(--color-workbook)" />
                    <PhXCircle v-else-if="revealAnswers" weight="fill" class="shrink-0 mt-0.5" style="color: var(--color-presentation)" />
                    <p class="flex-1 text-base text-ink-soft leading-snug" v-html="card.text"></p>
                    <button
                        v-if="!isLocked(card)"
                        type="button"
                        class="btn-close"
                        :aria-label="`Kaart terug naar de stapel leggen`"
                        @click.stop="remove(card.id)"
                    >
                        <PhX weight="bold" class="text-sm" />
                    </button>
                </div>

                <p
                    v-if="!placedIn(column.id).length"
                    class="text-sm text-ink-soft"
                    style="border: 2px dashed var(--color-line); border-radius: var(--radius-control); padding: 10px;"
                >
                    Sleep een kaart naar deze kolom
                </p>
            </div>
        </section>
    </div>

    <section class="mt-4 rounded-card" style="border: 2px solid var(--color-line); background: var(--color-panel-muted); padding: 16px;">
        <h4 class="text-lg font-bold text-ink mb-3">Kaarten</h4>

        <p v-if="!bankCards().length" class="text-base text-ink-soft">Alle kaarten zijn geplaatst.</p>

        <div v-else class="flex flex-wrap gap-2">
            <button
                v-for="card in bankCards()"
                :key="card.id"
                type="button"
                draggable="true"
                class="rounded-control text-left px-3 py-2 max-w-md"
                :style="selectedCard === card.id
                    ? { background: 'var(--color-digital-soft)', border: '2px solid var(--color-digital)', cursor: 'grabbing' }
                    : { background: 'var(--color-panel)', border: '2px solid var(--color-line)', cursor: 'grab' }"
                :aria-pressed="selectedCard === card.id"
                @dragstart="onDragStart(card.id, $event)"
                @click="pick(card.id)"
            >
                <span class="text-base text-ink" v-html="card.text"></span>
            </button>
        </div>

        <p v-if="selectedCard" class="text-base text-ink-soft mt-3 font-medium">
            Kies nu een kolom om deze kaart te plaatsen.
        </p>
    </section>
</div>
</template>
