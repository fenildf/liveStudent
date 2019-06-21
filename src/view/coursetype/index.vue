<template>
  <div>
    <div class="search-con search-con-top">
      <Input class="search-input" placeholder="分类"/>
      <Button class="search-btn" type="primary">添加同级分类</Button>
      <Button class="search-btn" type="primary">删除选中分类</Button>
    </div>
    <Alert>
      <v-jstree
        :data="treeData"
        :item-events="itemEvents"
        @item-click="jstreeClick"
        show-checkbox
        allow-batch
        whole-row
        draggable
      ></v-jstree>
    </Alert>
  </div>
</template>
<style>
.padding0 {
  padding: 0px;
}
</style>

<script>
import "./index.less";

import VJstree from "@/components/tree/tree.vue";
export default {
  components: {
    VJstree
  },

  data() {
    return {
      tableHeight: window.innerHeight - 200,
      loading: false,
      treeData: [
        {
          id: 0,
          text: "小学",
          value: "0",
          opened: true,
          children: [
            {
              id: 1,
              text: "语文",
              value: "initially selected",
              opened: true,
              children: [
                {
                  id: 1,
                  text: "小学语文上册",
                  value: "initially selected", opened: true,
                 children: [
                        {
                          id: 1,
                          text: "普通班",
                          value: "initially selected"
                        },

                        {
                          id: 5,
                          text: "提高班",
                          value: "custom icon"
                        },
                         {
                          id: 5,
                          text: "冲刺班",
                          value: "custom icon"
                        }
                      ]
                },

                {
                  id: 5,
                  text: "小学语文下册",
                  value: "custom icon"
                }
              ]
            },

            {
              id: 5,
              text: "数学",
              value: "custom icon"
            },
            {
              id: 5,
              text: "英语",
              value: "custom icon"
            }
          ]
        },
        {
          id: 6,
          text: "初中",
          value: "6",
          opened: true,
          children: [
            {
              id: 1,
              text: "语文",
              value: "initially selected"
            },

            {
              id: 5,
              text: "数学",
              value: "custom icon"
            },
            {
              id: 5,
              text: "英语",
              value: "custom icon"
            },
            {
              id: 5,
              text: "物理",
              value: "custom icon"
            }
          ]
        }
      ]
    };
  },
  methods: {
    jstreeClick(node) {
      console.log(node.model);
    }
  }
};
</script>
<style>
.paging {
  margin-top: 10px;
}
</style>
