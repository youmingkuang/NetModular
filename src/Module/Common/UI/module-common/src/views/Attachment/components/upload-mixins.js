import { mapState } from 'vuex'

export default {
  data() {
    return {
      id: this.value,
      loading: false
    }
  },
  props: {
    value: {
      type: String
    },
    /** 模块 */
    module: {
      type: String,
      required: true
    },
    /** 分组 */
    group: {
      type: String,
      required: true
    },
    /** 文件名 */
    name: {
      type: String,
      default: ''
    },
    /** 是否需要授权访问 */
    auth: {
      type: Boolean,
      default: false
    },
    /** 上传前函数 */
    beforeUpload: {
      type: Function
    },
    /** 接受上传的文件类型 */
    accept: String,
    /** 文件最大大小 */
    maxSize: String,
    /** 是否可拖拽上传 */
    drag: {
      type: Boolean,
      default: true
    },
    /** 可接受文件类型 */
    fileType: {
      type: Array
    }
  },
  computed: {
    ...mapState('app/token', ['accessToken']),
    maxSizeBytes() {
      if (this.maxSize) {
        const max = this.maxSize.toLowerCase()
        if (max.endsWith('kb')) {
          return parseFloat(max.replace('kb', '')) * 1024
        } else if (max.endsWith('mb')) {
          return parseFloat(max.replace('mb', '')) * 1024 * 1024
        } else if (max.endsWith('gb')) {
          return parseFloat(max.replace('gb', '')) * 1024 * 1024 * 1024
        } else if (max.endsWith('tb')) {
          return parseFloat(max.replace('tb', '')) * 1024 * 1024 * 1024 * 1024
        } else if (max.endsWith('b')) {
          return parseFloat(max.replace('b', ''))
        } else {
          return parseFloat(max)
        }
      }
      return ''
    }
  },
  methods: {
    onError() {
      this._error('上传失败')
      this.$emit('error')
      this.loading = false
    },
    getSizeUnit(size) {
      if (size === null || size === '') {
        return '0 B'
      }
      var unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      var index = 0
      var srcsize = parseFloat(size)
      index = Math.floor(Math.log(srcsize) / Math.log(1024))
      var s = srcsize / Math.pow(1024, index)
      s = s.toFixed(2)
      return s + unitArr[index]
    },
    /** 获取文件后缀名 */
    getFileExt(name) {
      let ext = ''
      const arr = name.split('.')
      if (arr.length > 1) {
        ext = arr[arr.length - 1]
      }
      return ext
    },
    /** 验证文件类型 */
    verifyFileType(file) {
      if (this.fileType && this.fileType.length > 0) {
        var ext = this.getFileExt(file.name)
        if (this.fileType.every(m => m.toLowerCase() !== ext)) {
          this._error(`.${ext} 文件类型不支持！`)
          return false
        }
      }
      return true
    }
  },
  watch: {
    value(val) {
      this.id = val
    }
  }
}
