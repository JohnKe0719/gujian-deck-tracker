<template>
    <v-app >
        <deck-title-bar></deck-title-bar>
        <v-content>
            <deck-page></deck-page>
        </v-content>
    </v-app>
</template>
<script>
    import DeckTitleBar from '~/components/DeckTitleBar'
    import DeckPage from '~/pages/deck'
    export default {
        components: {
            DeckTitleBar,
            DeckPage
        }
    }
</script>
