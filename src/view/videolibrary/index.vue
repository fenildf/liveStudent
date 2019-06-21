<template>
  <div>
    <div class="search-con search-con-top">
      <Input class="search-input" placeholder="输入关键字搜索"/>
      <Button class="search-btn" type="primary">搜索</Button>
      <Button class="search-btn" type="primary" to="videoadd">添加</Button>
    </div>
    <Table
      border
      stripe
      ref="selection"
      :columns="columns1"
      :data="DataTable.data"
      :loading="loading"
      :height="tableHeight"
      :size="tableSize"
      @on-selection-change="selectTableChange"
      @on-row-click="onRowClick"
    ></Table>
    <div class="search-con search-con-top">
      <Row>
        <Col span="10">
          <Page
            show-total
            class="paging"
            show-sizer
            show-elevator
            size="small"
            :total="DataTable.total"
            :page-size="DataTable.Pagesize"
            @on-change="changepage"
            @on-page-size-change="pages"
          ></Page>
        </Col>
      </Row>
    </div>
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
      tableHeight: window.innerHeight - 250,
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
          title: "视频名称",
          key: "name",
         // sortable: true,
          align: "center",
          ellipsis: true
        },
        {
          title: "阶段",
          key: "jd",
        //  sortable: true,
           align: "center",
          ellipsis: true
        },

        {
          title: "学科",
          key: "xk",
          sortable: true,
          // render: (h, params) => {
          //   return h(
          //     "span",
          //     params.row.CourseStauts == 0 ? "未上线" : "已上线"
          //   );
          // },
          align: "center"
        },
        {
          title: "年级",
          key: "nj",
          sortable: true,
         
          ellipsis: true,
          align: "center"
        },
        {
          title: "类型",
          key: "lx",
          sortable: true,
          
          ellipsis: true,
          align: "center"
        },
        {
          title: "创建时间",
          key: "CreateTime",
          sortable: true,
          align: "center",
          
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "md-menu"
                  //size: "small"
                },
                style: {
                  marginRight: "5px",
                  border: "1px solid #ccc",
                  display: "none"
                },
                on: {
                  click: () => {
                    alert(1);
                  },
                  mouseover: () => {
                    alert(1);
                  }
                }
              }), //<Icon type="ios-menu" />
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px" //display:'none'
                  },
                  on: {
                    click: () => {
                      this.editCourseBtn(params.row.CourseID);
                    }
                  }
                },
                "编辑"
              ),
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
                      let _this = this;
                      this.$Modal.confirm({
                        title: "操作提示",
                        content: "删除不可恢复，是否删除？",
                        okText: "删除",
                        cancelText: "取消",
                        closable: true,
                        onOk: function(e) {
                          //  _this.data1.splice(params.index, 1)
                          _this.DataTable.data.splice(params.index, 1);
                          _this.$Message.success("操作成功!");
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      selectRow: [],
      CtlonLineCourse: null,
      DataTable: {
        total: 0,
        data: [
          {ID:1,name:'小学语文上册第一节课',jd:'小学',xk:'语文',nj:'一年级',lx:'提高班',CreateTime:'2018-01-23'}
        ],
        searchData: {
          type: 0,
          CourseName: "",
          Status: -1,
          Pageindex: 1,
          Pagesize: 10,
          starttime: "",
          endtime: ""
        }
      },
      
    };
  },
  methods: {
    selectTableChange(rows) {
      this.selectRow = rows;
    },
    onRowClick() {},

    ////修改每页显示条数时调用
    pages(num) {
      this.DataTable.searchData.Pagesize = num;
      this.changepage(1);
    },
    //table翻页
    changepage(index) {
      this.DataTable.searchData.Pageindex = index; // (index - 1) * this.DataTable.Pagesize
      this.getTableData({
        CourseName: "",
        Pageindex: this.DataTable.searchData.Pageindex,
        Pagesize: this.DataTable.searchData.Pagesize,
        Status: -1,
        endtime: "",
        starttime: "",
        type: 0
      });
    }
  }
};
</script>
<style>
.paging {
  margin-top: 10px;
}
</style>
