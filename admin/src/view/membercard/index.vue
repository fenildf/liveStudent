<template>
  <div>
     <div class="search-con search-con-top">
      
      <Input class="search-input"   placeholder="输入关键字搜索"/>
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
          title: "会员卡种类",
          key: "cardType",
          sortable: true,
          
          ellipsis: true
        },

        {
          title: "原价",
          key: "price",
          sortable: true,
           
          align: "center"
        },
        {
          title: "折后价",
          key: "realPrice",
          sortable: true,
          width: 250,
          ellipsis: true,
          align: "center"
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
            
            ]);
          }
        }
      ],
      selectRow: [],
    
      DataTable: {
        total: 0,
        data: [
          {ID:1,cardType:'初中物理上册',price:120,realPrice:80},
          {ID:1,cardType:'初中物理上册',price:120,realPrice:80},
          {ID:1,cardType:'初中物理上册',price:120,realPrice:80},
          {ID:1,cardType:'初中物理上册',price:120,realPrice:80},
          {ID:1,cardType:'初中物理上册',price:120,realPrice:80},
          {ID:1,cardType:'初中物理上册',price:120,realPrice:80}
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
