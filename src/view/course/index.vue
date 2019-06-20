<template>
  <div>
    <div class="search-con search-con-top">
      
      <Input class="search-input" v-model="courseDataTable.searchData.CourseName" placeholder="输入关键字搜索"/>
      <DatePicker class="search-input" type="date" placeholder="开始时间" v-model="courseDataTable.searchData.starttime"></DatePicker>至
      <DatePicker class="search-input" type="date" placeholder="结束时间" v-model="courseDataTable.searchData.endtime"></DatePicker>
      <Button class="search-btn" type="primary" @click="getTableData">搜索</Button>
      <Button class="search-btn" type="primary" to="addcourse">添加</Button>
     
    </div>
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
    <div class="search-con search-con-top">
      <Row>
       
       
        <Col span="10">
          <Page
            show-total
            class="paging"
            show-sizer
            show-elevator
            size="small"
           
            :total="courseDataTable.total"
            :page-size="courseDataTable.Pagesize"
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
import  {toDateStr} from "@/libs/tools";
import { getCoursePageList } from "@/api/course";
import { all, allSettled } from "q";
import { log } from "util";
 export default {
  component() {
   },
  created() {
    
  },
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
          title: "课程名",
          key: "CourseName",
          sortable: true,
         
          ellipsis: true
        },
  {
          title: "阶段",
          key: "CourseName",
          sortable: true,
          
          ellipsis: true
        },

        {
          title: "学科",
          key: "CourseStauts",
          sortable: true,
          render: (h, params) => {
            return h(
              "span",
              params.row.CourseStauts == 0 ? "未上线" : "已上线"
            );
          },
          align: "center"
        },
        {
          title: "年级",
          key: "nianji",
          sortable: true,
          width: 250,
          ellipsis: true,
          align: "center"
        },
        {
          title: "类型",
          key: "leixin",
          sortable: true,
          
          ellipsis: true,
          align: "center"
        },
        
        {
          title: "创建时间",
          key: "CreateTime",
          sortable: true,
          align: "center",
          render: (h, params) => {
            console.log(this);
            
            let t= `${toDateStr(
                params.row.CreateTime.replace("/Date(", "").replace(")/", ""),
                "yyyy-MM-dd"
              )}`

            return h(
              "span",
             t
            );
          }
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
                  display:'none'
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
                    marginRight: "5px",//display:'none'
                  },
                  on: {
                    click: () => {
                      this.editCourseBtn(params.row.CourseID)
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
                    marginRight: "5px",//display:'none'
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
                          _this.courseDataTable.data.splice(params.index, 1);
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
      courseDataTable: {
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
            label: "课程名称",
            value: "CourseName"
          },
          {
            label: "创建人",
            value: "CreateUserName"
          },
          {
            label: "类型",
            value: "CourseType"
          }
        ],
        
      }
    };
  },
  methods: {
    addCourseBtn() {
      const id = parseInt(Math.random() * 100000);
      const title = "添加课程";
      const route = {
        name: "addcourse",
        params: {
          id,
          title
        },
        meta: {
          // title: `动态路由-${id}`
        }
      };
      this.$router.push(route);
    },
    editCourseBtn(id) {
      // const id = parseInt(Math.random() * 100000);
      const title = "编辑课程";
      const route = {
        name: "editcourse",
        params: {
          id:id,
          title:title
        },
        meta: {
          // title: `动态路由-${id}`
        }
      };
      this.$router.push(route);
    },
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
    bathDel() {
      if (this.selectRow.length == 0) {
        this.$Message.warning("请选择数据");
        return false;
      }
      this.selectRow.map(function(k) {
        this.data1.splice(k.index, 1);
      });
      this.$Message.success("操作成功");
    },
    selectTableChange(rows) {
      this.selectRow = rows;
    },
    onRowClick(){

    },
    onLineCourse(val) {
      if (this.selectRow.length == 0) {
        this.$Message.warning("请选择数据");
        return false;
      }
      this.$Message.success(
        "上架/下架:" + val + ",选中了" + this.selectRow.length + "项"
      );
    },
    ////修改每页显示条数时调用
    pages(num) {
      this.courseDataTable.searchData.Pagesize = num;
      this.changepage(1);
    },
    //table翻页
    changepage(index) {
      this.courseDataTable.searchData.Pageindex = index; // (index - 1) * this.courseDataTable.Pagesize
      this.getTableData({
        CourseName: "",
        Pageindex: this.courseDataTable.searchData.Pageindex,
        Pagesize: this.courseDataTable.searchData.Pagesize,
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
