<style scoped lang="less">
    .index {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1 {
            height: 150px;
            img {
                height: 100%;
            }
        }
        h2 {
            i-color: #666;
            margin-bottom: 200px;
            p {
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex {
            height: 100%;
        }
    }

    .demo-split {
        height: 80px;
    }

    .demo-split-pane {
        padding-bottom: 10px;
    }

    .title-font {
        font-weight: bold;
        font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "微软雅黑", Arial, sans-serif;
        font-size: 25px;
    }

    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    .layout-nav {
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }

    .layout-footer-center {
        text-align: center;
    }

</style>
<template>
    <div class="layout">
        <Modal v-model="sentiment.modal" fullscreen title="Reviews">
            <Table :columns="sentiment.reviews.columns" :data="sentiment.reviews.data"></Table>
        </Modal>

        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <menu-item name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </menu-item>
                        <menu-item name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </menu-item>
                        <menu-item name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </menu-item>
                        <menu-item name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </menu-item>
                    </div>
                </Menu>
            </Header>

            <Content>
                <row type="flex" justify="start" align="middle" style="height: 80px">
                    <i-col span="1" offset="2">
                        <img src="http://is1.mzstatic.com/image/thumb/Purple118/v4/d5/69/cb/d569cbac-059c-8517-f8ce-1e93e212ee01/AppIcon-1x_U007emarketing-0-85-220-0-5.png/175x175bb.jpg"
                             width="60" height="60" style="border-radius: 5px;"/>
                    </i-col>
                    <i-col span="5" offset="1">
                        <div class="demo-split">
                            <div slot="top" class="demo-split-pane" align="left">
                                <span class="title-font" style="padding-top: 10px; padding-right: 10px">王者荣耀</span>
                                <Button type="primary">收藏</Button>
                                <Button type="primary">申请添加数据源</Button>
                            </div>
                            <div slot="bottom" class="demo-split-pane" align="left">
                                <p>更新时间: 2018-01-01 00:00:00</p>
                            </div>
                        </div>
                    </i-col>
                </row>

                <row type="flex" justify="start" align="top" style="padding-top: 20px;">
                    <i-col offset="2" span="20">
                        <tabs value="name1">
                            <tab-pane label="概况" name="name1">标签一的内容</tab-pane>
                            <tab-pane label="全网评论" name="name2">
                                <div>
                                    <Form :model="sentiment.formItem" :label-width="80">
                                        <row type="flex" justify="space-between" class="code-row-bg">
                                            <i-col span="5">
                                                <form-item label="Title">
                                                    <input v-model="fTitle" placeholder="Title"/>
                                                </form-item>
                                            </i-col>
                                            <i-col span="5">
                                                <form-item label="Category">
                                                    <Select v-model="fCategory">
                                                        <Option value="0">test 0</Option>
                                                        <Option value="1">test 1</Option>
                                                        <Option value="2">test 2</Option>
                                                    </Select>
                                                </form-item>
                                            </i-col>
                                            <i-col span="8">
                                                <form-item label="Public At">
                                                    <DatePicker type="daterange" placeholder="Select date"
                                                                v-model="fPublicAt" :transfer="true"
                                                                style="width: 80%"></DatePicker>
                                                </form-item>
                                            </i-col>
                                        </row>

                                        <row type="flex" justify="end" class="code-row-bg">
                                            <i-col span="6">
                                                <form-item>
                                                    <Button type="primary" @click="getArticles">Submit</Button>
                                                    <Button style="margin-left: 8px" @click="resetForm">Cancel</Button>
                                                </form-item>
                                            </i-col>
                                        </row>
                                    </Form>
                                </div>

                                <row style="padding-top: 20px">
                                    <Table height="350" :columns="sentiment.article.articleColumns" :data="sentiment.article.articleData"></Table>
                                </row>
                                <row type="flex" justify="end" style="padding-top: 10px">
                                    <ButtonGroup>
                                        <ButtonGroup>
                                            <Button @click="preArticles">
                                                <Icon type="ios-arrow-back"></Icon>
                                                Backward
                                            </Button>
                                            <Button @click="getArticles">
                                                Forward
                                                <Icon type="ios-arrow-forward"></Icon>
                                            </Button>
                                        </ButtonGroup>
                                    </ButtonGroup>
                                </row>
                            </tab-pane>
                        </tabs>
                    </i-col>
                </row>
            </Content>
        </Layout>
    </div>
</template>
<script>
import { mapFields } from 'vuex-map-fields'
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState([
      'sentiment'
    ]),
    ...mapFields({
      fTitle: 'formItem.title',
      fCategory: 'formItem.category',
      fPublicAt: 'formItem.publication_at'
    })
  },
  methods: {
    ...mapActions([
      'getArticles',
      'resetForm',
      'preArticles',
      'taggleModal'
    ]),
    show: function (index) {
      console.log(this.sentiment.article.articleData[index])
    }
  },
  mounted () {
    this.getArticles()
    this.sentiment.article.articleColumns = [
      {
        type: 'expand',
        key: 'expand',
        width: 50,
        render: (h, params) => {
          return h('div',
            [h('p',
              [this.sentiment.article.articleData[params.index].document]
            )]
          )
        }
      },
      ...this.sentiment.article.articleColumns,
      {
        title: 'Show Reviews',
        key: 'ShowReviews',
        render: (h, params) => {
          return h('Button', {
            props: {
              type: 'primary'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                this.taggleModal(this.sentiment.article.articleData[params.index].series_id)
              }
            }
          }, 'View')
        }
      }]
  }

}
</script>
