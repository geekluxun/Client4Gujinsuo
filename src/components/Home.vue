<template>
    <div>
        <div>
            <div id="select">
               <!-- <input type="text" v-model="selected">-->
                <label>客户端类型</label>
                <select @change="selectClientType">
                    <option v-for="item in selects" v-model="item.value">{{ item.value }}</option>
                </select>
            </div>

        </div>

    <input class="v-input-user"  v-model="user" placeholder="请输入用户名">
    <input class="v-input-user" v-model="password" placeholder="请输入密码">
    <div>
        <label>POST请求:</label>
        <input class="request-text-text" v-model="requestpath"></input>
        <button @click="setPara">参数</button>
        <button @click="postData2">请求</button>
    </div>
    <div>
        <label>完整URL:</label>
        <span>{{ baseurl }}{{requestpath}}</span>
    </div>
    <div>
        <ul v-if="showpara == true">
            <li class="li-para" v-for="(para, index) in requestparas">
                <input type="text" class="request-para" placeholder="key" v-model='para.key'>
                <input type="text" class="request-para" placeholder="value" v-model='para.value'>
                <button @click="deletePara(index)">删除</button>
                <button @click="addNewPara({})">新增</button>
            </li>
        </ul>
    </div>
    <div>
        <label>response:</label>
        <textarea class="response-text" v-model="responsebody"></textarea>
    </div>
    <button @click="next">下一页</button>
  </div>
</template>

<script>
import { getSortSignStr } from '../common/utils/md5util'
import { strMapToJson } from  '../common/utils/jsonutil'
import { json2Form } from  '../common/utils/jsonutil'
require( "jquery.cookie" );
const md5key = 'GuJinSuoIL6pvSsve9P0l8JswjcP4w';

export default{
    name: 'home',
    data(){
        return{
            user:'',
            password:'',
            baseurl:'/api',
            //baseurl:'http://172.16.1.34:8883',
            responsebody: '',
            requestpath: '',
            requestparas:[
                {
                    key: '',
                    value: ''
                }
            ],
            userid: '',
            jsessionid: '',
            fullurl:'',
            showpara:false,
            clienttype: 'android',
            selects: [
                {value: 'android'},
                {value: 'ios'},
                {value: 'h5'},
                {value: 'pc'}
            ]
      }
    },

    mounted(){
        this.setDefaultPara();
    },

    methods:{
        //    login: function () {
        //      console.log("username"+ this.user + "passoword" + this.password);
        //      //this.$http.options.root = this.baseurl;
        //      //this.$http.headers.common["Content-Type"] = 'application/x-www-form-urlencoded; charset=UTF-8';
        //      //this.$http.options.emulateJSON = true;
        //      //this.$http.options.xhr = { withCredentials: true }
        //      //this.$http.options.credentials = true;
        //      let body = { username: this.user, password: this.password};//{username:this.user, password:this.password}
        //      this.$http.post(this.baseurl + this.requestpath,
        //                      this.json2Form(body),{
        //                      headers: {
        //                        'Content-Type': 'application/x-www-form-urlencoded'
        //                      }
        //                     })
        //                .then(function (response) {
        //                    console.log(JSON.stringify(response.body))
        //                    this.responsebody = JSON.stringify(response.body);
        //                })
        //                .catch(function (response) {
        //                   console.log(response)
        //                    this.responsebody = response.body.toString();
        //                });
        //    },

        //    login: function () {
        //      //console.log("username" + this.user + "passoword" + this.password);
        //      //this.$http.options.root = this.baseurl;
        //      //this.$http.headers.common["Content-Type"] = 'application/x-www-form-urlencoded; charset=UTF-8';
        //      //this.$http.options.emulateJSON = true;
        //      //this.$http.options.xhr = { withCredentials: true }
        //      this.$http.options.credentials = true;
        //      this.$http.options.crossDomain = true;
        //
        //      var params = new Map();
        //      //var termialtype = 'mobile';
        //      var typepath ;
        //      if (this.clienttype == 'h5') {
        //        typepath = '/h5';
        //        this.requestpath = typepath +"/login.json";
        //        this.postData(params,this.clienttype)
        //      }else if (this.clienttype == 'android' || this.clienttype == 'ios'){
        //        typepath = '/p2p';
        //        params.set("mobileno", this.user);
        //        params.set("password", this.password);
        //        this.requestpath = typepath + "/login";
        //        this.postData(params, this.clienttype)
        //      }
        //    },

        //    postData2:function () {
        //      var params = new Map();
        //      //var termialtype = 'mobile';
        //      var typepath ;
        //      if (this.clienttype == 'h5') {
        //        typepath = '/h5';
        //        this.requestpath = typepath +"/login.json";
        //        this.postData(params,this.clienttype)
        //      }else if (this.clienttype == 'android' || this.clienttype == 'ios'){
        //        typepath = '/p2p';
        //        //params.set("mobileno", this.user);
        //        //params.set("userid", userid);
        //        console.log("userid:!!!" + userid);
        //        this.requestpath = typepath + "/project";
        //        this.postData(params, this.clienttype)
        //      }
        //    },

        postData: function () {
            var params = new Map();

            for (var i=0; i<this.requestparas.length; i++){
                params.set(this.requestparas[i].key, this.requestparas[i].value);
            }

            if (userid != ''){
              params.set("userid", userid + '');
            }

            if (this.clienttype == 'android' || this.clienttype == 'ios'){

                if (this.clienttype == 'android'){
                    params.set("terminalid", "A");
                }else if (this.clienttype ==  'ios'){
                    params.set("terminalid", "I")
                }

            if (params != null){
                params.set("devicecode", "12345679");
                params.set("timestamp", "111333");
                params.set("version", "v2.0");
            }

            var str = getSortSignStr(params);
            console.log("str:" + str);
            str = str + '&key=' +　md5key;
            console.log("md5key:" + md5key);

            var md5 = require('md5');

            console.log(md5(str));
            params.set("sign", md5(str));
            var  body = strMapToJson(params)

            var header =  {
                headers: {
                    'Content-Type': 'application/json',
                }
            };


            this.$http.post(this.baseurl + this.requestpath,
                   body,header)
                .then(function (response) {
                    console.log(JSON.stringify(response.body))
                    this.responsebody = JSON.stringify(response.body);

                    var objet = JSON.parse(JSON.stringify(response.body));
                    if (this.requestpath == '/mobile/login'){
                        userid = objet.userid;
                        jsessionid = objet.jsessionid;
                    }
                    console.log("userid:" + userid);
                    console.log("jsessionid:" + jsessionid);
                })
                .catch(function (response) {
                console.log(response)
                //this.responsebody = response.toString();
                })
            }else if(this.clienttype == 'h5'){
                let body = {username: this.user, password: this.password};
                this.$http.post(this.baseurl + this.requestpath,
                    json2Form(body), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                    .then(function (response) {
                        console.log(JSON.stringify(response.body))
                        this.responsebody = JSON.stringify(response.body);
                    })
                    .catch(function (response) {
                        console.log(response)
                        //this.responsebody = response.toString();
                    });
            }

        },

        /**
         * jquery ajax方式
         */
        postData2: function () {
            var params = new Map();

            for(var i=0; i<this.requestparas.length; i++){
                if (this.requestparas[i].key !== '' && this.requestparas[i].value !== '')
                {
                    params.set(this.requestparas[i].key, this.requestparas[i].value);
                } else if(i > 0){
                    alert("参数不能为空");
                    return;
                }

            }

            if (this.userid !== ''){
                params.set("userid", "dd");
                console.log("para userid:", this.userid);
            }

            if (this.clienttype == 'android' || this.clienttype == 'ios'){

                if (this.clienttype == 'android'){
                    params.set("terminalid", "A");
                }else if (this.clienttype ==  'ios'){
                    params.set("terminalid", "I")
                }

                if (params != null){
                    params.set("devicecode", "12345679");
                    params.set("timestamp", "111333");
                    params.set("version", "v2.0");
                }

                var str = getSortSignStr(params);
                console.log("str:" + str);
                str = str + '&key=' +　md5key;
                console.log("md5key:" + md5key);

                var md5 = require('md5');

                console.log(md5(str));
                params.set("sign", md5(str));
                var  body = strMapToJson(params)


                if (this.jsessionid != ''){
                    $.cookie('JSESSIONID', this.jsessionid, { path: '/' });
                }

                $.ajax({
                    url:this.baseurl + this.requestpath,
                    type: "post",
                    dataType: "json",
                    crossDomain: true,
                    xhrFields: {withCredentials: true},
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    cache: false,
                    data: body,
                    success: function(data1){
                        if(data){
                            console.log("data:" +JSON.stringify(data));
                            this.userid = data.userid;
                            this.jsessionid = data1.jsessionid;
                            this.responsebody = JSON.stringify(data);
                        } else {
                            console.log("data:" +JSON.stringify(data));
                            this.responsebody = JSON.stringify(data);
                        }
                    }.bind(this),
                    error: function (jqXHR, textStatus, errorThrown) {
//                        alert(jqXHR.responseText);
//                        alert(jqXHR.status);
//                        alert(jqXHR.readyState);
//                        alert(jqXHR.statusText);
//                        alert(textStatus);
//                        alert(errorThrown);
                        this.responsebody = jqXHR.responseText + jqXHR.status + errorThrown;
                    }.bind(this)
                });
            }

        },

        next:function () {
            this.$router.push('/Note');
        },

        /**
         * 增加新的请求参数
         */
        addNewPara:function (para) {
          this.requestparas.push(para);
        },

        /**
         * 删除请求参数
         * @param index
         */
        deletePara:function (index) {
          //if (this.requestparas.length > 1){
            console.log("index:" + index);
            this.requestparas.splice(index, 1);
          //}
        },
        /**
         * 设置请求参数
         */
        setPara:function () {
            if(!this.showpara){//隐藏
                this.showpara = true;

            }else{ //显示
                if (this.requestparas.length < 1 ){
                    this.addNewPara({});
                }
                this.showpara = false;
            }
        },

        /**
         * 选择客户端类型监听
         * @param ele
         */
        selectClientType: function(ele) {
            this.clienttype = ele.target.value;
            this.setDefaultPara();
        },

        setDefaultPara: function() {

            this.requestparas.splice(0, this.requestparas.length);

            if (this.clienttype == 'android' || this.clienttype == 'ios') {
                var para ={};

                if (this.clienttype == 'android') {
                    para.key='terminalid';
                    para.value='A';
                } else if (this.clienttype == 'ios') {
                    para.key='terminalid';
                    para.value='I';
                }
                this.addNewPara(para);
                var para2 ={};
                para2.key='devicecode';
                para2.value='111111';
                this.addNewPara(para2);
                var para3 ={};
                para3.key='timestamp';
                para3.value='123456';
                this.addNewPara(para3);
                var para4 ={};
                para4.key='version';
                para4.value='v2.0';
                this.addNewPara(para4);
            }
        }
    }
}
</script>

<style>
    .v-input-user{
        width: 100px;
        height: 50px;
    }

    .response-text{
        width: 300px;
        height: 500px;
    }
    .request-text{
        width: 300px;
        height: 100px;
    }
    .request-para{
        width: 100px;
        height:20px;
    }
    .li-para{
        list-style-type:none;
    }
</style>
