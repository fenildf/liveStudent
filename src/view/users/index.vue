<template>
  <div>
    <div class="search-con search-con-top">
      <Input class="search-input" placeholder="输入关键字搜索"/>
      <Button class="search-btn" type="primary">搜索</Button>
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
          key: "CourseID"
        },
        {
          title: "会员名称",
          key: "name",
          sortable: true,
         
          ellipsis: true
        },
        {
          title: "会员卡",
          key: "CourseName",
          sortable: true,
          
          ellipsis: true
        },

        {
          title: "注册时间",
          key: "CourseStauts",
          sortable: true,
          
          align: "center"
        },
         
    ],
      selectRow: [],
      CtlonLineCourse: null,
      DataTable: {
        total: 0,
        data: [],
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
      pageControler: {
        searchField: [
          {
            label: "阶段",
            value: "jieudan"
          },
          {
            label: "学科",
            value: "xueke"
          },
          {
            label: "年级",
            value: "nianji"
          },
          {
            label: "视频名称",
            value: "CourseName"
          },
          {
            label: "上传时间",
            value: "CreateTime"
          }
        ]
      }
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
