<template>
  <div>
     <div class="search-con search-con-top">
      
      <Input class="search-input"   placeholder="订单编号/会员名称"/>
       <DatePicker class="search-input" type="date" placeholder="开始时间"  ></DatePicker>至
      <DatePicker class="search-input" type="date" placeholder="结束时间"  ></DatePicker>
       <Button class="search-btn" type="primary" @click="getTableData">搜索</Button>
     
     
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
      tableHeight: window.innerHeight - 200,
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
          title: "订单编号",
          key: "orderNo",
          sortable: true,
          
          ellipsis: true
        },

        {
          title: "会员",
          key: "member",
          sortable: true,
         
          align: "center"
        },
        {
          title: "会员卡",
          key: "memberCard",
          sortable: true,
           
          ellipsis: true,
          align: "center"
        },
        {
          title: "购买时间",
          key: "orderTime",
          sortable: true,
          
          ellipsis: true,
          align: "center"
        },
         {
          title: "支付状态",
          key: "orderStatus",
          sortable: true,
           
          ellipsis: true,
          align: "center"
        },
       
      ],
      selectRow: [],
      CtlonLineCourse: null,
      DataTable: {
        total: 0,
        data: [
          {ID:1,orderNo:'NO2019010200054', member:'李妙',memberCard:'高中语文上册',orderTime:'2019-8-15',orderStatus:'已支付'}
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
