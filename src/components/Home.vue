<template>
  <div>

    <div>
      <span>客户端类型</span>
        <select v-model="clienttype">
          <option>android</option>
          <option>ios</option>
          <option>h5</option>
          <option>pc</option>
        </select>

    </div>
      <input class="v-input-user"  v-model="user" placeholder="请输入用户名">
      <input class="v-input-user" v-model="password" placeholder="请输入密码">

      <div>
        <label>request:</label>
        <input class="request-text-text" v-model="requestpath"></input>
        <button @click="postData22">请求</button>
      </div>
      <div>

        <ul>
          <!--<template v-for="(para, index) in requestparas">-->
            <li v-for="(para, index) in requestparas">
              <input type="text" class="request-para" placeholder="key" v-model='para.key'>
              <input type="text" class="request-para" placeholder="value" v-model='para.value'>
              <button @click="deletePara(index)">删除</button>
              <button @click="addNewPara">新增</button>
            </li>
          <!--</template>-->
        </ul>


      </div>
      <div>
        <label>response:</label>
        <textarea class="response-text" v-model="responsebody"></textarea>
      </div>

      <button @click="next">下一页</button>
  </div>

</template>

<!--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>-->
<script>
import { getSortSignStr } from '../common/utils/md5util'
import { strMapToJson } from  '../common/utils/jsonutil'
import { json2Form } from  '../common/utils/jsonutil'

require( "jquery.cookie" );
const md5key = 'GuJinSuoIL6pvSsve9P0l8JswjcP4w';

var userid = '';
var jsessionid = '';

export default{
  name: "home",
  data(){
      return{
          user:'',
          password:'',
          baseurl:'/api',
          //baseurl:'http://172.16.1.34:8883',
          responsebody: '',
          requestpath: '',
          clienttype:'',
          requestparas:[
            {
                key: '',
                value: ''
            }
          ]
      }
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

      for(var i=0; i<this.requestparas.length; i++){
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

        //'Cookie': 'JSESSIONID=' + jsessionid,
//        if (userid != ''){
//            var header =  {
//              headers: {
//                'Content-Type': 'application/json',
//              }
//            };
//        }else {
//          var header =  {
//            headers: {
//              'Content-Type': 'application/json',
//            }
//          };
//        }

        var header =  {
          headers: {
            'Content-Type': 'application/json',
          }
        };

/*        this.$http.options.credentials = false;
        this.$http.options.crossDomain = true;*/

        this.$http.post(this.baseurl + this.requestpath,
                   body,header
          )
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
          });
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

    postData22: function () {
      var params = new Map();

      for(var i=0; i<this.requestparas.length; i++){
        params.set(this.requestparas[i].key, this.requestparas[i].value);
      }

      if (userid != ''){
        params.set("userid", userid);
        console.log("para userid:", userid);
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

        //'Cookie': 'JSESSIONID=' + jsessionid,
//        if (userid != ''){
//            var header =  {
//              headers: {
//                'Content-Type': 'application/json',
//              }
//            };
//        }else {
//          var header =  {
//            headers: {
//              'Content-Type': 'application/json',
//            }
//          };
//        }

//        var header =  {
//          headers: {
//            'Content-Type': 'application/json',
//          }
//        };

        /*        this.$http.options.credentials = false;
         this.$http.options.crossDomain = true;*/
        //$.AMUI.utils.cookie.set("JSESSIONID",123123,time);
        if (jsessionid != ''){
          $.cookie('JSESSIONID', jsessionid, { path: '/' });
        }

        $.ajax({
          url:this.baseurl + this.requestpath,
          type:"post",
          dataType:"json",
          crossDomain:true,
          xhrFields: {withCredentials: true},
          headers: {
            'Content-Type': 'application/json',
          },
          cache:false,
          data:body,
          success:function(data1){
            if(data1){
              //console.log("LUXUN!!!");
              console.log("data11:" +JSON.stringify(data1));
              userid = data1.userid;
              jsessionid = data1.jsessionid;
              this.responsebody = JSON.stringify(data1);
            }else{
              console.log("data11:" +JSON.stringify(data1));
              this.responsebody = JSON.stringify(data1);
            }
          }.bind(this),
          error:function(){
            console.log("error!!!")
          }
        });

//        this.$http.post(this.baseurl + this.requestpath,
//          body,header
//        )
//          .then(function (response) {
//            console.log(JSON.stringify(response.body))
//            this.responsebody = JSON.stringify(response.body);
//
//            var objet = JSON.parse(JSON.stringify(response.body));
//            if (this.requestpath == '/p2p/login'){
//              userid = objet.userid;
//              jsessionid = objet.jsessionid;
//            }
//
//            console.log("userid:" + userid);
//            console.log("jsessionid:" + jsessionid);
//          })
//          .catch(function (response) {
//            console.log(response)
//            //this.responsebody = response.toString();
//          });
//      }else if(this.clienttype == 'h5'){
//        let body = {username: this.user, password: this.password};
//        this.$http.post(this.baseurl + this.requestpath,
//          json2Form(body), {
//            headers: {
//              'Content-Type': 'application/x-www-form-urlencoded'
//            }
//          })
//          .then(function (response) {
//            console.log(JSON.stringify(response.body))
//            this.responsebody = JSON.stringify(response.body);
//          })
//          .catch(function (response) {
//            console.log(response)
//            //this.responsebody = response.toString();
//          });
      }

    },
    next:function () {
      this.$router.push('/Note');
    },

    addNewPara:function () {
      var para={};
      para.key='';
      para.value='';
      this.requestparas.push(para);
    },

    deletePara:function (index) {
      //if (this.requestparas.length > 1){
        console.log("index:" + index);
        this.requestparas.splice(index, 1);
      //}
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

</style>
