Work with collection dont have folder
```java
const template = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/codemirror.min.css" integrity="sha512-/BlxZbYLtYGExexketXsTi47eHp+r2kTeq2OHecQPZlfbc7WFXVrwbVW9HOYjI6c9Ti+P60ASmVLxittZ0EBGw==" crossorigin="anonymous" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/addon/fold/foldgutter.min.css" integrity="sha512-YwkMTlTHn8dBnwa47IF+cKsS00HPiiVhQ4DpwT1KF2gUftfFR7aefepabSPLAs6zrMyD89M3w0Ow6mQ5XJEUCw==" crossorigin="anonymous" />
<style>
#jmx {
    width: 100%;
    height: 100%;
    font-family: monospace;
}
</style>
<textarea id="jmx">
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.2.1">
    <hashTree>
        <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Postman Collection Import" enabled="true">
            <boolProp name="TestPlan.functional_mode">false</boolProp>
            <stringProp name="TestPlan.comments"></stringProp>
            <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
            <stringProp name="TestPlan.user_define_classpath"></stringProp>
            <elementProp name="TestPlan.user_defined_variables" elementType="Arguments">
                <collectionProp name="Arguments.arguments"/>
            </elementProp>
        </TestPlan>
        <hashTree>
            <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="\\{{info.name}}" enabled="true">
                <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" enabled="true">
                    <boolProp name="LoopController.continue_forever">false</boolProp>
                    <stringProp name="LoopController.loops">5</stringProp>
                </elementProp>
                <stringProp name="ThreadGroup.num_threads">1</stringProp>
                <stringProp name="ThreadGroup.ramp_time">1</stringProp>
                <boolProp name="ThreadGroup.scheduler">false</boolProp>
                <stringProp name="ThreadGroup.duration">0</stringProp>
                <stringProp name="ThreadGroup.delay">0</stringProp>
                <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
                <boolProp name="ThreadGroup.same_user_on_next_iteration">true</boolProp>
            </ThreadGroup>
            <hashTree>
\\{{> folder}}
                <Arguments guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
                    <collectionProp name="Arguments.arguments">
\\{{#variable}}
                        <elementProp name="\\{{key}}" elementType="Argument">
                            <stringProp name="Argument.name">\\{{key}}</stringProp>
                            <stringProp name="Argument.value">\\{{{value}}}</stringProp>
                            <stringProp name="Argument.metadata">=</stringProp>
                        </elementProp>
\\{{/variable}}
                    </collectionProp>
                </Arguments>
                <hashTree/>
            </hashTree>
        </hashTree>
    </hashTree>
</jmeterTestPlan>
</textarea>

<script id="folder" type="x-tmpl-mustache">\\{{#item}}\\{{> folder}}\\{{/item}}\\{{^item}}\\{{> item}}\\{{/item}}</script>

<script id="item" type="x-tmpl-mustache">
                <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="\\{{name}}" enabled="true">
\\{{#request}}
\\{{#body}}
\\{{#raw}}
                    <boolProp name="HTTPSampler.postBodyRaw">true</boolProp>
                    <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" enabled="true">
                        <collectionProp name="Arguments.arguments">
                            <elementProp name="" elementType="HTTPArgument">
                                <boolProp name="HTTPArgument.always_encode">false</boolProp>
                                <stringProp name="Argument.value">\\{{{.}}}</stringProp>
                                <stringProp name="Argument.metadata">=</stringProp>
                            </elementProp>
                        </collectionProp>
                    </elementProp>
\\{{/raw}}
\\{{#hasUrlEncoded}}
                    <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" enabled="true">
                        <collectionProp name="Arguments.arguments">
\\{{#urlEncoded}}
                            <elementProp name="\\{{key}}" elementType="HTTPArgument">
                                <boolProp name="HTTPArgument.always_encode">false</boolProp>
                                <stringProp name="Argument.value">\\{{value}}</stringProp>
                                <stringProp name="Argument.metadata">=</stringProp>
                                <boolProp name="HTTPArgument.use_equals">true</boolProp>
                                <stringProp name="Argument.name">\\{{key}}</stringProp>
                            </elementProp>
\\{{/urlEncoded}}
                        </collectionProp>
                    </elementProp>
\\{{/hasUrlEncoded}}
\\{{^raw}}
\\{{^urlencoded}}
                    <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" enabled="true">
                        <collectionProp name="Arguments.arguments"/>
                    </elementProp>
\\{{/urlencoded}}
\\{{/raw}}
\\{{/body}}
                    <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
                    <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
                    <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
                    <boolProp name="HTTPSampler.monitor">false</boolProp>
                    <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
                    <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
                    <stringProp name="HTTPSampler.contentEncoding"></stringProp>
                    <stringProp name="HTTPSampler.method">\\{{method}}</stringProp>
                    <stringProp name="HTTPSampler.domain">\\{{url.host}}</stringProp>
                    <stringProp name="HTTPSampler.path">\\{{{url.path}}}</stringProp>
                    <stringProp name="HTTPSampler.protocol">\\{{url.protocol}}</stringProp>
                </HTTPSamplerProxy>
\\{{#hasHeader}}
                <hashTree>
                    <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="HTTP Header Manager" enabled="true">
                        <collectionProp name="HeaderManager.headers">
\\{{#header}}
                            <elementProp name="" elementType="Header">
                                <stringProp name="Header.name">\\{{key}}</stringProp>
                                <stringProp name="Header.value">\\{{value}}</stringProp>
                            </elementProp>
\\{{/header}}
                        </collectionProp>
                    </HeaderManager>
                </hashTree>
\\{{/hasHeader}}
\\{{#url.hasVariable}}
                <hashTree>
                    <Arguments guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
                        <collectionProp name="Arguments.arguments">
\\{{#url.variable}}
                            <elementProp name="statusCode" elementType="Argument">
                                <stringProp name="Argument.name">\\{{key}}</stringProp>
                                <stringProp name="Argument.value">\\{{value}}</stringProp>
                                <stringProp name="Argument.desc">\\{{description}}</stringProp>
                                <stringProp name="Argument.metadata">=</stringProp>
                            </elementProp>
\\{{/url.variable}}
                        </collectionProp>
                    </Arguments>
                    <hashTree/>
                </hashTree>
\\{{/url.hasVariable}}
\\{{/request}}
\\{{#needsAdditionalHashTree}}
                <hashTree/>\\{{/needsAdditionalHashTree}}
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/codemirror.min.js" integrity="sha512-ipquLAQ1BQSTjqPDqkXNGXfHBv6ivlhE5Di0mhI/YraFhJPEagKt1MKUY7eqCqfsDEGcinRhEMuCsk2eBlydrw==" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/addon/display/autorefresh.min.js" integrity="sha512-vAsKB7xXQAWMn5kcwda0HkFVKUxSYwrmrGprVhmbGFNAG1Ij+2epT3zzdwjHTJyDsKXsiEdrUdhIxh7loHyX+A==" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/addon/fold/foldcode.min.js" integrity="sha512-tY7fzPt8kpPkGBPzs0ctZAm6+w1vPG/5sm2oPzbuUimqQfVOFJGi8eB7jo8BBEQjwOPuQq4UT04Bbgjuzk//aQ==" crossorigin="anonymous"></script>
<script src="https://unpkg.com/jsonlint@1.6.3/web/jsonlint.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/addon/fold/foldcode.min.js" integrity="sha512-tY7fzPt8kpPkGBPzs0ctZAm6+w1vPG/5sm2oPzbuUimqQfVOFJGi8eB7jo8BBEQjwOPuQq4UT04Bbgjuzk//aQ==" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/addon/fold/indent-fold.min.js" integrity="sha512-Q6g5qQfa6ko+Y+0BwAciUAq01qxgfScTPFP2Fsrr+zIrTe5Yq3tN5xaA919MmBs/1RMz/jyctknYavjc3k+/xg==" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/addon/fold/brace-fold.min.js" integrity="sha512-mOPldogQkV/OI/Qcey+GPSQKTxgxyGQg26CWaNhmZ+uVIxxUxr6Bqf/8vmdj2gK6niCx3gae3BLGVM7OIvr0tA==" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/addon/fold/foldgutter.min.js" integrity="sha512-R5ILz8pTG+G29aszTP4k5AbDWbxoaKJ9ilK+hseQVKuuoTNOo95nCbfQYInLhKdsWCKY1sa9Lis2pblTQ0U57A==" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/mode/xml/xml.min.js" integrity="sha512-k1HnoY9EXahEfPz7kq/lD9DltloKH9OrB9XNKYoUQrNz9epe5F4mQP5PfuIfeRfoXHkNrE0gF3Mx4LhC5BVl9Q==" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/addon/fold/xml-fold.min.js" integrity="sha512-A687y0hhrzGSJA+Vy0K5wJ+XSIPKjzEujKsc9WCoWfub25q4THmIX94P6ofM5tuUMDuX4SKzjOeliJMbDpyyAQ==" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.0.1/mustache.min.js" integrity="sha512-6AXIWogbKpsHvoZJrJtHpIYES4wP8czSj0zk7ZfwOYS8GWYFNSykwdfapt7yQc4ikZytemBu+QyVObzBHJMwYg==" crossorigin="anonymous"></script>
<script>
const jmx = CodeMirror.fromTextArea(document.getElementById("jmx"), {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    foldGutter: true,
    lint: true,
    gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    mode: 'application/xml'
});

pm.getData((err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const replaceLineEnding = (text) => Mustache.escape(text).replace(/\\n/g, '&#xd;\\n');
    const recurse = (item) => {
        if (!item.hasOwnProperty('item') ) {
            item.item = null;
            item.needsAdditionalHashTree = true;
            if (item.request) {
                if (item.request.url) {
                    item.request.url.host = item.request.url.host.join('.').replace(/\\/\\{{([\\w-]+)}}/g, (_match, p1) => '\${' + p1 + '}').replace(/:([\\w-]+)/g, (_match, p1) => '/\${' + p1 + '}').trim();
                    item.request.url.path = '/' + item.request.url.path.join('/').replace(/\\{{([\\w-]+)}}/g, (_match, p1) => '\${' + p1 + '}').trim();
                    item.request.url.protocol = item.request.url.protocol || 'http';
                    if (item.request.url.variable && item.request.url.variable.length) {
                        item.request.url.hasVariable = true;
                        needsAdditionalHashTree = false;
                        for (let i = 0; i < item.request.url.variable; i++) {
                            item.request.url.variable[i].value = item.request.url.variable[i].value.join(',').replace(/\\{{([\\w-]+)}}/g, (_match, p1) => '\${' + p1 + '}').trim();
                        }
                    }
                }
                if (item.request.header && item.request.header.length) {
                    item.request.hasHeader = true;
                    item.needsAdditionalHashTree = false;
                    for (let i = 0; i < item.request.header.length; i++) {
                        item.request.header[i].value = item.request.header[i].value.replace(/\\{{([\\w-]+)}}/g, (_match, p1) => '\${' + p1 + '}').trim();
                    }
                }
                if (item.request.body) {
                    if (item.request.body.raw) {
                        item.request.body.raw = replaceLineEnding(item.request.body.raw);
                    } else if (item.request.body.urlencoded) {
                        item.request.body.hasUrlEncoded = true;
                    }
                }
            }
        } else {
            for (const i of item.item) {
                recurse(i);
            }
        }
    }

    if (data.variable) {
        for (let i = 0; i < data.variable.length; i++) {
            data.variable[i].value = replaceLineEnding(data.variable[i].value);
        }
    }

    data.log = function() {
        console.log(this);
    }

    recurse(data);

    const folder = document.getElementById('folder');
    const item = document.getElementById('item');
    const rendered = Mustache.render(jmx.getValue(), data, {
        folder: folder.innerHTML,
        item: item.innerHTML
    });

    jmx.setValue(rendered);
});
</script>`;

const collection = pm.response.json().collection;

pm.visualizer.set(template, collection);
```
