<template>
  <q-table class="my-sticky-virtscroll-table"
    style="margin-top: 7rem;">
    <!-- template com slots para estilização no lado superior direito da tabela, podendo ser o que o programador quiser -->
    <template v-slot:top-right>
      <!-- todo slot deve ter um nome para ser chamado na página principal -->
      <slot name="top-right"></slot>
    </template>
    <template v-slot:body-cell-edit>
       <slot name="buttons">

       </slot>
    </template>
  </q-table>
</template>

<script>


</script>

<style lang="sass">
.my-sticky-virtscroll-table
  /* height or max-height is important */
  height: 410px

  .q-table__top,
    thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #283540,
    color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0

    tr:nth-child(odd) 
      background-color: #283540
    

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>

<script>
</script>