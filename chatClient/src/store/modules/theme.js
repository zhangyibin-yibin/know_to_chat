import { LocalStorageManager, colorRgb } from '@/utils'
import { colorHexReg } from '@/utils/reg'
const localStorageManager = new LocalStorageManager()

/**
 * 初始化系统的主题CSS变量
 * @param {String} color 文字颜色 16进制
 * @param {String} bgColor 背景颜色 16进制
 */
const _initThemeCSSVariable = (color, bgColor, dgColor) => {
  if (!colorHexReg.test(color) || !colorHexReg.test(bgColor)||!colorHexReg.test(dgColor)) {
    return
  }
  let CSSVar = ''
  color = colorRgb(color)
  bgColor = colorRgb(bgColor)
  dgColor = colorRgb(dgColor)
  for (let i = 1; i <= 10; i++) {
    CSSVar += `--primary-color-${i}: rgba(${color.r}, ${color.g}, ${color.b}, ${i / 10});`
    CSSVar += `--primary-bgcolor-${i}: rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${i / 10});`
    CSSVar += `--primary-bgcolor-${i}: rgba(${dgColor.r}, ${dgColor.g}, ${dgColor.b}, ${i / 10});`
  }
  document.documentElement.style.cssText = CSSVar
}

const state = {
  /**透明度 */
  opacity: localStorageManager.getJson('theme-opacity')  || 0.75,
  /**模糊度，filter: blur(10px) */
  blur: localStorageManager.getJson('theme-blur') || 10,
  /**
   * 背景图片，用户上传的图片会转为base64存在localStorage中
   * 系统默认的有abstract.jpg\city.jpg\ocean.jpg
   * 区分系统自带和用户自定义判断是否包含base64
   * */
  bgImg: localStorageManager.getStr('theme-bgimg') || 'abstract',
  notifySound: localStorageManager.getStr('theme-notifysound') || 'default',
  // isNotifySound: localStorageManager.get('theme-blur') || 10
  /**字体颜色 #000 */
  color: localStorageManager.getStr('theme-color') || '#000',
  /**背景颜色 #fff */
  bgColor: localStorageManager.getStr('theme-bgcolor') || '#fff',
  // 对话框背景颜色
  dgColor: localStorageManager.getStr('theme-dgColor') || '#666'
}

_initThemeCSSVariable(state.color, state.bgColor)

const mutations = {
  setOpacity(state, value) {
    localStorageManager.set('theme-opacity', value)
    state.opacity = value
  },
  setBlur(state, value) {
    localStorageManager.set('theme-blur', value)
    state.blur = value
  },
  setBgImg(state, value) {
    localStorageManager.set('theme-bgimg', value)
    state.bgImg = value
  },
  setNotifySound(state, value) {
    localStorageManager.set('theme-notifysound', value)
    state.notifySound = value
  },
  setColor(state, value) {
    localStorageManager.set('theme-color', value)
    state.color = value
    _initThemeCSSVariable(state.color, state.bgColor)
  },
  setBgColor(state, value) {
    localStorageManager.set('theme-bgcolor', value)
    state.bgColor = value
    _initThemeCSSVariable(state.color, state.bgColor)
  },
  setDgColor(state, value) {
    localStorageManager.set('theme-dgcolor', value)
    state.dgColor = value
    _initThemeCSSVariable(state.color, state.dgColor)
  }
}

const actions = {
  SET_OPACITY({commit}, value) {
    commit('setOpacity', value)
  },
  SET_BLUR({commit}, value) {
    commit('setBlur', value)
  },
  SET_BG_IMG({commit}, value) {
    commit('setBgImg', value)
  },
  SET_NOTIFY_SOUND({commit}, value) {
    commit('setNotifySound', value)
  },
  SET_COLOR({commit}, value) {
    commit('setColor', value)
  },
  SET_BG_COLOR({commit}, value) {
    commit('setBgColor', value)
  },
  SET_DG_COLOR({commit}, value) {
    commit('setDgColor', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
