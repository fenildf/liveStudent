<template>
  <Form :model="formItem" :label-width="80">
    <FormItem label="课程名称">
      <Input v-model="formItem.CourseName" placeholder="课程名称"></Input>
    </FormItem>
    <FormItem label="课程分类">
      <tree-select
        style="width: 353px;"
        check-strictly
        v-model="CourseTypeTreeDataSelect"
        :data="CourseTypeTreeData"
      ></tree-select>
    </FormItem>
    <FormItem label="课程类型">
      <Select style="width:353px;">
        <Option>基础</Option>
        <Option>提高</Option>
        <Option>冲刺</Option>
      </Select>
    </FormItem>

    <FormItem label="视频信息">
      <Row>
        <Col span="1">
          <upload-video v-on:getVideoData="getVideoData"></upload-video>
        </Col>
      </Row>
      <Table style="margin-top:10px;" :columns="videoTableCol" :data="formItem.videoTableData"></Table>
    </FormItem>
    <FormItem label="课程描述">
      <editor ref="editor" :value="formItem.Description"/>
    </FormItem>
    <FormItem>
      <Button type="primary">Submit</Button>
      <Button style="margin-left: 8px" @click="closeBtn">关闭</Button>
    </FormItem>
  </Form>
</template>
<script>
import TreeSelect from "_c/tree-select";
import Editor from "_c/editor";
import { mapMutations } from "vuex";
import { log } from "util";
import UploadVideo from "@/components/video/upload-video.vue";
import { getCourseModel, getCourseTypes } from "@/api/course";
import { all } from "q";

export default {
  components: {
    Editor,
    TreeSelect,
    UploadVideo
  },
  computed: {},
  created: function() {
    // alert(this.$route.params.id)
    this.getCourseTypes();
    if (this.$route.params.id) {
      this.getCourseData(this.$route.params.id);
    }
  },
  data() {
    return {
      // tabView: "UploadVideo",
      formItem: {
        CourseName: "",
        Description: "",
        CourseType: "",
        CreateTime: "",
        editorContent: "",
        CourseStatus: 1,
        Duration: "",
        videoTableData: []
      },
      videoTableCol: [
        {
          type: "selection",
          width: 50,
          align: "center",
          key: "VideoId"
        },

        {
          title: "标题",
          key: "Title"
        },

        {
          title: "操作",
          width: 120,

          render: (h, params) => {
            //<Icon type="ios-videocam-outline" /><Icon type="md-videocam" />
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    // type: "md-videocam",
                    size: "small"
                  },
                  style: {
                    // marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      CourseTypeTreeData: [],
      CourseTypeTreeDataSelect: []
    };
  },
  methods: {
    ...mapMutations(["closeTag"]),
    closeBtn() {
      this.closeTag({
        name: "addcourse",
        params: {
          id: this.$route.params.id,
          title: this.$route.params.title
        }
      });
    },

    getVideoData(data) {
      let _this = this;
      data.map(function(k) {
        console.log(k);
        _this.formItem.videoTableData.push(k);
      });
    },
    //获取课程信息
    getCourseData(id) {
      this.loading = true;
      //  let p = this.courseDataTable.searchData;
      getCourseModel(id)
        .then(res => {
          let _this = this;
          // console.log(res.data.data);
          if (res.data.code != "1") {
            alert(res.data.msg);
            location.href = "/login";
          } else {
            _this.loading = false;

            _this.formItem = res.data.data.courseInfo;
            //console.log( _this.formItem);

            //_this.formItem.CourseName= res.data.data.CourseName
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    getCourseTypes() {
      getCourseTypes()
        .then(res => {
          this.CourseTypeTreeData = [];
          res.data.data.forEach(value => {
            this.CourseTypeTreeData.push({
              id: value.ID,
              title: value.TypeName
            });
          });
        })
        .catch(err => {});
    }
  }
};
</script>
<style>
.ivu-form-item {
  margin-bottom: 10px;
}
</style>
