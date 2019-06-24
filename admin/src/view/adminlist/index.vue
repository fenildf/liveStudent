<template>
  <div>
    <Table
      border
      stripe
      ref="selection"
      :columns="columns1"
      :data="courseDataTable.data"
      :loading="loading"
      :height="tableHeight"
      :size="tableSize"
      @on-selection-change="selectTableChange"
      @on-row-click="onRowClick"
    ></Table>
  </div>
</template>
<style>
.padding0 {
  padding: 0px;
}
</style>

<script>
import "./index.less";
import { toDateStr } from "@/libs/tools";

import { all, allSettled } from "q";
import { log } from "util";
export default {
  component() {},
  created() {},
  data() {
    return {
      tableHeight: window.innerHeight - 150,
      loading: false,
      tableSize: "small",
      columns1: [
        {
          type: "selection",
          width: 50,
          align: "center",
          key: "ID"
        },

        {
          title: "管理员",
          key: "admin",
          sortable: true,
          ellipsis: true
        },
        {
          title: "创建时间",
          key: "CreateTime",
          sortable: true,
          align: "center"
          // render: (h, params) => {
          //   let t = `${toDateStr(
          //     params.row.CreateTime.replace("/Date(", "").replace(")/", ""),
          //     "yyyy-MM-dd"
          //   )}`;
          //   return h("span", t);
          // }
        },

        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px" //display:'none'
                  },
                  on: {
                    click: a => {
                      this.$Modal.confirm({
                        render: h => {
                          return h("Input", {
                            props: {
                              value: this.value,
                              autofocus: true,
                              placeholder: "Please enter your name..."
                            },
                            on: {
                              input: val => {
                                this.value = val;
                              }
                            }
                          });
                        }
                      });
                    }
                  }
                },
                "重置密码"
              )
            ]);
          }
        }
      ],
      selectRow: [],

      courseDataTable: {
        total: 0,
        data: [
          {
            ID: 1,
            admin: "admin",
            CreateTime: "2019-9-9 02:02:00"
          }
        ]
      }
    };
  },
  methods: {
    getTableData() {
      this.loading = true;
      let p = this.courseDataTable.searchData;
      getCoursePageList(p)
        .then(res => {
          this.courseDataTable.data = res.data.data;
          this.courseDataTable.total = res.data.total;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    onRowClick() {}
  }
};
</script>
<style>
.paging {
  margin-top: 10px;
}
</style>
