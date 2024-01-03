<template>
  <div style="margin-left: -10px !important">
    <Teatree :roots="data">
      <template slot="node-toggle" slot-scope="{ node }">
        <NodeToggle :node="node" />
      </template>
      <template slot="node-name" slot-scope="{ node }">
        <NodeName
          :node="node"
          :handleNodeLeftClick="emitShowMenu"
          :handleNodeRightClick="() => {}"
        />
      </template>
    </Teatree>
  </div>
</template>

<script>
import { Teatree, NodeType, NodeName, NodeToggle } from 'vue-teatree'

export default {
  props: ['data'],
  components: {
    Teatree,
    NodeType,
    NodeName,
    NodeToggle,
  },
  data() {
    return {
      // data: [
      //   {
      //     name: 'parent',
      //     show: true,
      //     showChildren: true,
      //     selected: false,
      //     children: [
      //       {
      //         name: 'child',
      //         show: true,
      //         showChildren: true,
      //         selected: false,
      //         children: [
      //           {
      //             name: 'grandchild',
      //             show: true,
      //             showChildren: true,
      //             selected: false,
      //             children: [],
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
    }
  },
  methods: {
    emitShowMenu() {
      this.$emit('show-menu', true)
    },
  },
}
</script>

<style>
.teatree {
  cursor: pointer;
  height: 100%;
  overflow: hidden;
}

.teatree-node {
  padding-right: 0.25rem;
}

.teatree-node-item {
  display: flex;
  align-items: center;
  height: 1.5rem;
  background: transparent;

  /* hack to make hover the full width of parent */
  padding-left: 100%;
  margin-left: -100%;
  padding-right: 100%;
  margin-right: -100%;
}

.teatree-node-item:hover {
  background-color: #d7d7d7;
}

.teatree-node-item-selected {
  background-color: #d7d7d7;
}

.teatree-node-item-name-padded-leaf {
  padding-left: 1.25rem;
}

.teatree-node-item-icon {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  /* color: #cbd5e0; */
}

.teatree-node-item-name {
  display: inline-block;
  font-size: 0.875rem;
  /* color: #a0aec0; */
  margin-left: 0.5rem;
  user-select: none;

  /* truncate */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.teatree-node-item-name-padded {
  padding-left: 1.5rem;
}
</style>