/*
 * @Author: yyl 
 * @Date: 2017-10-20 16:03:06 
 * @Last Modified by: yyl
 * @Last Modified time: 2017-10-26 13:35:01
 */
var mc = (function () {
  var num = 0;

  return {
    /**
     * 获取表格
     */
    getTable: function (jsonString, obj) {
      var tableObj = obj.find("table");
      var theadObj = obj.find("table > thead");
      var tbodyObj = obj.find("table > tbody");

      var data = jsonString;
      var gridHeader = data.gridHeader.split(",");
      var gridData = data.gridData;
      
      mc.getThead(gridHeader, theadObj);
      mc.getTbody(gridData, tbodyObj);
      mc.addTr(tbodyObj);
    },
    /**
     * 获取表头
     */
    getThead: function (el, obj) {
      var str = "";
      $.each(el, function (index, val) {
        str += "<td>" + val + "</td>"
      });
      obj.prepend("<tr>" + str + "</tr>");
    },
    /**
     * 获取表格主题内容
     */
    getTbody: function (el, obj) {
      var str = "";
      $.each(el, function (index, val) {
        if (val.rowId == "") {
          num ++;
          str += "<tr rowId='" + num + "'>"
        } else {
          str += "<tr rowId='" + val.rowId + "'>"
        }
        $.each(val.rowData.split(","), function (index, val) {
          str += "<td contenteditable='true'>" + val + "</td>"
        });
        str += "</tr>"
      });
      obj.append(str);
    },
    /**
     * td可编辑
     */
    enableType: function () {
      $("tbody td").attr("contenteditable","true");
    },
    /**
     * td不可编辑
     */
    disType: function () {
      $("td[contenteditable]").removeAttr("contenteditable");
    },
    /**
     * 添加新行
     */
    addTr: function (obj) {
      var cloneTr;
      obj.on("click", function (e) {
        var target = e.target;
        var parentTr = $(target).parent("tr");
        if (parentTr.index() == obj.find("tr").last().index()) {
          num ++;
          cloneTr = parentTr.clone();
          cloneTr.attr("rowId",num);
          cloneTr.find("td").html("");
        };
        obj.append(cloneTr);
      })
    },
    /**
     * 删除最后一行
     */
    delTr: function (obj) {
      $(obj).find("tr").last().remove();
    },
    /**
     * 提交 生成字符串
     */
    sublimeTable: function (obj) {
      var strData = "";
      var thead = "";
      var tbody = "";
      var row = "";
      $(obj).find("thead tr td").each(function () {
        thead += $(this).html() + ",";
      });
      thead = thead.slice(0, -1);

      $(obj).find("tbody tr").each(function () {

        row += '{"rowid": "' + $(this).attr("rowId") + '",' +'"rowData": "';
        
        $.each($(this).find("td"), function (index, val) {
          row += $(val).html() + ",";
        })
        row = row.slice(0, -1);      
        row += '"},'
      });
      row = row.slice(0, -1);      
      tbody = "[" + row + "]";
      strData += "e5a59c985a287da5015a40c866d205c9" + "~" + thead + "@#&" + tbody;
      console.log(strData);
      mc.resolveStr(strData)
    },
    resolveStr: function (str) {
      var data = {};
      var dataStr = "";
      var arr = str.split("@#&");
      dataStr = '{"gridHeader": "' + arr[0].split("~")[1] + '",' + '"gridData" :' + arr[1] + "}";
      data = $.parseJSON(dataStr);
      return data;
    },
    /**
     * @description 解决contenteditable复制富文本问题
     */
    onlyText: function () {
      $('[contenteditable]').each(function() {
        // 干掉IE http之类地址自动加链接
        try {
          document.execCommand("AutoUrlDetect", false, false);
        } catch (e) {}
        
        $(this).on('paste', function(e) {
          e.preventDefault();
          var text = null;
      
          if(window.clipboardData && clipboardData.setData) {
            // IE
            text = window.clipboardData.getData('text');
          } else {
            text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('在这里输入文本');
          }
          if (document.body.createTextRange) {   
            if (document.selection) {
              textRange = document.selection.createRange();
            } else if (window.getSelection) {
              sel = window.getSelection();
              var range = sel.getRangeAt(0);
              
              // 创建临时元素，使得TextRange可以移动到正确的位置
              var tempEl = document.createElement("span");
              tempEl.innerHTML = "&#FEFF;";
              range.deleteContents();
              range.insertNode(tempEl);
              textRange = document.body.createTextRange();
              textRange.moveToElementText(tempEl);
              tempEl.parentNode.removeChild(tempEl);
            }
            textRange.text = text;
            textRange.collapse(false);
            textRange.select();
          } else {
            // Chrome之类浏览器
            document.execCommand("insertText", false, text);
          }
        });
      });
    }
  }
})();