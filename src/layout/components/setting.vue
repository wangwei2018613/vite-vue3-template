<template>
	<el-form ref="form" label-width="120px" label-position="left" style="padding:0 20px;">
		<el-alert title="以下配置可实时预览，开发者可在 config/index.js 中配置默认值，非常不建议在生产环境下开放布局设置" type="error" :closable="false"></el-alert>
		<el-divider></el-divider>
		<el-form-item label="深色/浅色">
			<el-switch v-model="theme" active-value="dark" inactive-value="default"></el-switch>
		</el-form-item>
		<el-divider></el-divider>
		<el-form-item label="主题颜色">
			<el-color-picker v-model="colorPrimary" :predefine="colorList"></el-color-picker>
		</el-form-item>
		<el-divider></el-divider>
		<el-form-item label="框架布局">
			<el-select v-model="layout" placeholder="请选择">
				<el-option label="默认" value="default"></el-option>
				<el-option label="通栏" value="header"></el-option>
				<el-option label="经典" value="menu"></el-option>
				<el-option label="功能坞" value="dock"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="折叠菜单">
			<el-switch v-model="menuIsCollapse"></el-switch>
		</el-form-item>
		<el-form-item label="标签栏">
			<el-switch v-model="layoutTags"></el-switch>
		</el-form-item>
		<el-divider></el-divider>
	</el-form>
</template>

<script>
import colorTool from '@/utils/color'

export default {
    data() {
        return {
            layout: this.$store.state.global.layout,
            menuIsCollapse: this.$store.state.global.menuIsCollapse,
            layoutTags: this.$store.state.global.layoutTags,
            theme: this.$TOOL.data.get('APP_THEME') || 'default',
            colorList: ['#409EFF', '#009688', '#536dfe', '#ff5c93', '#c62f2f', '#fd726d'],
            colorPrimary: this.$TOOL.data.get('APP_COLOR') || this.$CONFIG.COLOR || '#409EFF'
        }
    },
    watch: {
        layout(val) {
            this.$store.commit("SET_layout", val)
        },
        menuIsCollapse() {
            this.$store.commit("TOGGLE_menuIsCollapse")
        },
        layoutTags() {
            this.$store.commit("TOGGLE_layoutTags")
        },
        theme(val) {
            document.body.setAttribute('data-theme', val)
            this.$TOOL.data.set("APP_THEME", val)
        },
        colorPrimary(val) {
            document.documentElement.style.setProperty('--el-color-primary', val)
            for (let i = 1; i <= 9; i++) {
                document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, colorTool.lighten(val, i / 10))
            }
            document.documentElement.style.setProperty(`--el-color-primary-darken-1`, colorTool.darken(val, 0.1))
            this.$TOOL.data.set("APP_COLOR", val)
        }
    }
}
</script>

<style>
</style>
