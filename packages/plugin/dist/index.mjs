import { resolve, dirname } from 'path';
import { readFileSync } from 'fs';
import markdownItContainer from 'markdown-it-container';

// componentPreview Check
var isCheckPreviewCom = /^<preview (.*)><\/preview>$/;
var isCheckContainerPreview = /^demo-preview=(.+)$/;
/**
 * 注入 script 脚本
 * @param mdInstance
 * @param path
 * @param componentName
 */
var injectComponentImportScript = function (env, path, componentName) {
    // https://github.com/vuejs/vitepress/issues/1258  __Path、__Relativepath、__data.Hoistedtags 被删除解决方案
    // https://github.com/mdit-vue/mdit-vue/blob/main/packages/plugin-sfc/src/types.ts
    // https://github.com/mdit-vue/mdit-vue/blob/main/packages/plugin-sfc/tests/__snapshots__/sfc-plugin.spec.ts.snap
    var scriptsCode = env.sfcBlocks.scripts;
    var scriptsSetupIndex = scriptsCode.findIndex(function (script) {
        if (script.tagOpen === "<script setup lang='ts'>")
            return true;
        return false;
    });
    if (scriptsSetupIndex !== -1) {
        var oldScriptsSetup = scriptsCode[scriptsSetupIndex];
        // 已经注册了注册
        if (oldScriptsSetup.content.includes(path) && oldScriptsSetup.content.includes(componentName)) {
            scriptsCode[scriptsSetupIndex].content = oldScriptsSetup.content;
        }
        else {
            // 添加组件 import ${componentName} from '${path}'\n
            scriptsCode[scriptsSetupIndex].content = oldScriptsSetup.content.replace("<script setup lang='ts'>\n", "<script setup lang='ts'>\n\n            import ".concat(componentName, " from '").concat(path, "'\n"));
        }
    }
    else {
        // MD文件注入了 <script setup lang='ts'> 脚本
        var scriptBlockObj = {
            type: 'script',
            tagClose: '</script>',
            tagOpen: "<script setup lang='ts'>",
            content: "<script setup lang='ts'>\n        import ".concat(componentName, " from '").concat(path, "'\n        </script>")
            //   contentStripped: `import ${componentName} from '${path}'`
        };
        scriptsCode.push(scriptBlockObj);
    }
};
/**
 * 源码 => 代码块
 * @param mdInstance
 * @param sourceCode
 * @param suffix
 * @returns
 */
var transformHighlightCode = function (mdInstance, sourceCode, suffix) {
    return mdInstance.options.highlight(sourceCode, suffix, '');
};

var getPropsReg = /^<preview (path|title|description)=(.*) (path|title|description)=(.*) (path|title|description)=(.*)><\/preview>$/;
var defaultComponentName$1 = 'component-preview';
/**
 * 编译预览组件
 * @param md
 * @param token
 * @param env
 * @returns
 */
var transformPreview = function (md, token, env) {
    var componentProps = {
        path: '',
        title: '默认标题',
        description: '描述内容'
    };
    // 获取Props相关参数
    var tokenContentArr = token.content.match(getPropsReg);
    tokenContentArr.forEach(function (item, index) {
        item = item.replaceAll(/"|"/gi, '').trim();
        if (item === 'path') {
            componentProps.path = tokenContentArr[index + 1].replaceAll(/"|"/gi, '').trim();
        }
        else if (item === 'title') {
            componentProps.title = tokenContentArr[index + 1].replaceAll(/"|"/gi, '').trim();
        }
        else if (item === 'description') {
            componentProps.description = tokenContentArr[index + 1].replaceAll(/"|"/gi, '').trim();
        }
    });
    // 组件绝对路径
    var componentPath = resolve(dirname(env.path), componentProps.path || '.');
    var _dirArr = componentProps.path.split('/');
    // 组件名
    var componentName = _dirArr[_dirArr.length - 1].split('.')[0] || defaultComponentName$1;
    // 后缀名
    var suffixName = componentPath.substring(componentPath.lastIndexOf('.') + 1);
    // 注入组件导入语句
    injectComponentImportScript(env, componentProps.path, componentName);
    // 组件源码
    var componentSourceCode = readFileSync(componentPath, {
        encoding: 'utf-8'
    });
    // 源码代码块（经过处理）
    var compileHighlightCode = transformHighlightCode(md, componentSourceCode, suffixName);
    var code = encodeURI(componentSourceCode);
    var showCode = encodeURIComponent(compileHighlightCode);
    var sourceCode = "<demo-preview title=\"".concat(componentProps.title, "\" description=\"").concat(componentProps.description, "\" code=\"").concat(code, "\" showCode=\"").concat(showCode, "\">\n    <").concat(componentName, "></").concat(componentName, ">\n  </demo-preview>");
    return sourceCode;
};

var validateContainerRE = /^preview\s+(.*)$/;
var parseContainerParamRE = /^preview\s(.+)\s\|\|\s(.*)$/;
/**
 * 自定义容器的注册
 * @param md
 */
var containerDirectiveMount = function (md) {
    md.use(markdownItContainer, 'preview', {
        marker: ':',
        validate: function (params) {
            var validateContainer = params.trim().match(validateContainerRE);
            if (validateContainer && validateContainer.length !== 0)
                return true;
            return false;
        }
    });
};
/**
 * 解析自定义日期的Tag
 * @param md
 */
var defaultComponentName = 'component-preview';
var parseContainerTag = function (md) {
    // 开始标签 :::preview
    var defaultContainerPreviewOpenRender = md.renderer.rules.container_preview_open;
    md.renderer.rules.container_preview_open = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        // 组件的相对路径
        var componentRelativePath = tokens[idx + 2].content.split('=')[1];
        // 组件绝对路径
        var componentPath = resolve(dirname(env.path), componentRelativePath || '.');
        var _dirArr = componentRelativePath.split('/');
        // 组件名
        _dirArr[_dirArr.length - 1].split('.')[0] || defaultComponentName;
        // 后缀名
        var suffixName = componentPath.substring(componentPath.lastIndexOf('.') + 1);
        // 组件源码
        var componentSourceCode = readFileSync(componentPath, {
            encoding: 'utf-8'
        });
        // 源码代码块（经过处理）
        var compileHighlightCode = transformHighlightCode(md, componentSourceCode, suffixName);
        var code = encodeURI(componentSourceCode);
        var showCode = encodeURIComponent(compileHighlightCode);
        var getParamArr = tokens[idx].info.trim().match(parseContainerParamRE);
        var title = '默认标题';
        var description = '默认描述';
        if (getParamArr) {
            title = getParamArr[1];
            description = getParamArr[2];
        }
        if (token.nesting === 1)
            return "<demo-preview title='".concat(title, "' description='").concat(description, "' code=\"").concat(code, "\" showCode=\"").concat(showCode, "\">\n");
        return defaultContainerPreviewOpenRender(tokens, idx, options, env, self);
    };
    // 闭合标签 :::
    var defaultContainerPreviewCloseRender = md.renderer.rules.container_preview_close;
    md.renderer.rules.container_preview_close = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        if (token.nesting === -1)
            return "</demo-preview>\n";
        return defaultContainerPreviewCloseRender(tokens, idx, options, env, self);
    };
};
/**
 * 解析自定义容器
 * @param md
 */
var parseContainer = function (md) {
    var defaultHtmlTextRender = md.renderer.rules.text;
    md.renderer.rules.text = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        if (token.type === 'text' && token.content.match(isCheckContainerPreview)) {
            var componentRelativePath = token.content.match(isCheckContainerPreview)[1];
            var componentName = token.content.match(/.*\/(.*).vue$/)[1];
            injectComponentImportScript(env, componentRelativePath, componentName);
            return "<".concat(componentName, "></").concat(componentName, ">");
        }
        return defaultHtmlTextRender(tokens, idx, options, env, self);
    };
};

var componentPreview = function (md) {
    var defaultHtmlInlineRender = md.renderer.rules.html_inline;
    // eslint-disable-next-line no-param-reassign
    md.renderer.rules.html_inline = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        if (isCheckPreviewCom.test(token.content)) {
            return transformPreview(md, token, env);
        }
        return defaultHtmlInlineRender(tokens, idx, options, env, self);
    };
};
var containerPreview = function (md) {
    containerDirectiveMount(md);
    parseContainerTag(md);
    parseContainer(md);
};

export { componentPreview, containerPreview };
