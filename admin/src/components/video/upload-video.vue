<template>
  <div>
    <Button @click="modal1 = true">视频库</Button>
    <Modal
      v-model="modal1"
      title="视频库"
      @on-ok="ok"
      @on-cancel="cancel"
      @on-visible-change="onVisibleChange"
      width="700"
    >
      <div class="search-con search-con-top">
        <Form :label-width="80" inline  id="a">
          <FormItem label="课程分类" >
            <Select class="search-col"></Select>
          </FormItem>
          
          <FormItem label="关键字">
            <Input class="search-input" placeholder="输入关键字搜索1"/>
            <Button class="search-btn" type="primary">搜索</Button>
          </FormItem>
          <Table
            ref="selection"
            height="300"
            size="small"
            :columns="columns1"
            :data="data1"
            @on-selection-change="onSelectionChange"
          ></Table>

          <Page
            simple
            class="paging"
            size="small"
            :current="2"
            :total="50"
            @on-change="changepage"
            @on-page-size-change="pages"
          ></Page>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
import "./upload-video.less";
import { all } from "q";
export default {
  data() {
    return {
      total: 0,
      Pagesize: 0,
      modal1: false,
      columns1: [
        {
          type: "selection",
          width: 50,
          align: "center",
          key: "VideoId"
        },
      
        {
          title: "视标题",
          key: "Title"
        },
     
       
        {
          title: "创建时间",
          key: "CreationTime",
          width: 120
        },
      //   {
      //     title: "操作",
      //     width: 60,

      //     render: (h, params) => {
      //       //<Icon type="ios-videocam-outline" /><Icon type="md-videocam" />
      //       return h(
      //         "Button",
      //         {
      //           props: {
      //             // type: "md-videocam",
      //             size: "small"
      //           },
      //           style: {
      //             // marginRight: "5px"
      //           },
      //           on: {
      //             click: () => {
      //               this.show(params.index);
      //             }
      //           }
      //         },
      //         "播放"
      //       );
      //     }
      //   }
       ],
      data1: [
        {
          VideoId: "VideoId",
          Title: "New York No. 1 Lake Park",
          CreationTime: "2016-10-03"
        },
        {
           VideoId: "VideoId",
          Title: "New York No. 1 Lake Park",
          CreationTime: "2016-10-03"
        },
        {
           VideoId: "VideoId",
          Title: "New York No. 1 Lake Park",
          CreationTime: "2016-10-03"
        }
      ],
      selectData: []
    };
  },

  created() {
    //alert("created");
  },
  methods: {
    //点击确定
    ok() {
      this.$Message.info("Clicked ok");
      console.log("要穿的数据", this.selectData);
      this.$emit("getVideoData", this.selectData);
    },
    //点击取消
    cancel() {
      //this.$Message.info("Clicked cancel");
    },
    //翻页
    changepage() {},
    //每页条数
    pages() {},
    //选中项有变化时
    onSelectionChange(selection) {
      this.selectData = selection;
    },
    //模态框状态
    onVisibleChange() {
      this.$refs.selection.selectAll(false);
      this.selectData = [];
    }
  }
};
</script>
