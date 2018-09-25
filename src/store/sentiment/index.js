import { getField, updateField } from 'vuex-map-fields'
import { getArticles } from '../../../src/api/sentiment/index'

export default {
  strict: false,

  state: {
    split2: 0.6,
    formItem: {
      title: null,
      category: null,
      publication_at: null,
      limit: [0, 10]
    },
    article: {
      articleColumns: [
        {
          title: 'series_id',
          key: 'series_id'
        },
        {
          title: 'Title',
          key: 'title'
        },
        {
          title: 'document',
          key: 'document'
        },
        {
          title: 'category',
          key: 'category'
        },
        {
          title: 'source_url',
          key: 'source_url'
        },
        {
          title: 'publication at',
          key: 'publication_at'
        }
      ],
      articleData: [
        {
          series_id: 'series_id',
          title: 'John Brown',
          document: 'document',
          category: 'TouTiao',
          source_url: 'http://www.baidu.com',
          publication_at: '2016-10-03 00:00:00'
        }
      ]
    }
  },
  getters: {
    getField
  },
  mutations: {
    updateField,
    setArticleDataMutation (state, data) {
      state.article.articleData = data['rows']
    },
    resetFormMutation (state) {
      state.formItem.title = null
      state.formItem.category = null
      state.formItem.publication_at = null
    },
    presetLimit (state) {
      state.formItem.limit[0] = Math.max(state.formItem.limit[0] - state.article.articleData.length - state.formItem.limit[1], 0)
    },
    setLimit (state, n) {
      state.formItem.limit[0] += n
    }
  },
  actions: {
    async getArticles (context) {
      let articles = await getArticles(context.state.formItem)
      context.commit('setArticleDataMutation', articles.data)
      context.commit('setLimit', articles.data['rows'].length)
    },
    async preArticles (context) {
      context.commit('presetLimit')

      let articles = await getArticles(context.state.formItem)
      context.commit('setArticleDataMutation', articles.data)
      context.commit('setLimit', articles.data['rows'].length)
    },
    resetForm ({ commit }) {
      commit('resetFormMutation')
    }
  }
}
