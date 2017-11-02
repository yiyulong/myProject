$(function () {
  var getTableData = $(".getTableData");
  var addTabel = $(".addTable");
  var enableType = $(".enableType");
  var disType = $(".disType");
  var table = $(".container > table");
  var thead = $(".container > table > thead");
  var tbody = $(".container > table > tbody");
  var data = {
    "gridHeader" : "指标\/年份,2017,2016,2015",
    "gridData" : [
      {
        "rowId" : "ff80808159909d62015991aa51ab0133",
        "rowData" : "总收入,,,"
      },
      {
        "rowId" : "ff80808159909d62015991aa51ab0134",
        "rowData" : "主营业务收入,,,"
      },
      {
        "rowId" : "ff80808159909d62015991aa51ab0135",
        "rowData" : "主营业务收入增长率(%),,,"
      },
      {
        "rowId" : "ff80808159909d62015991aa51ab0136",
        "rowData" : "净利润,,,"
      },
      {
        "rowId" : "ff80808159909d62015991aa51ab0137",
        "rowData" : "其中主营业务利润,,,"
      },
      {
        "rowId" : "ff80808159909d62015991aa51ab0138",
        "rowData" : "主营业务利润增长率(%),,,"
      },
      {
        "rowId" : "ff80808159909d62015991aa51ab0139",
        "rowData" : "研发经费支出总额,,,"
      },
      {
        "rowId" : "ff80808159909d62015991aa51ab013a",
        "rowData" : "总资产,,,"
      },
      {
        "rowId" : "ff80808159909d62015991aa51ab013b",
        "rowData" : "净资产,,,"
      },
      {
        "rowId" : "ff80808159909d62015991aa51ab013c",
        "rowData" : "资产负债率(%),,,"
      },
      {
        "rowId" : "e5a59c985b12a6f1015b18cf6ec90683",
        "rowData" : "纳税总额,,,"
      }  
    ],
    "dataType" : "create"
  };
  var gridHeader,gridData;
  
  function eachData (data) {
    gridHeader = data.gridHeader.split(",");
    gridData = data.gridData;
    eachThead(gridHeader, thead);
    eachTbody(gridData, tbody);
  };
  
  function eachThead (el, obj) {
    var str = "";
    $.each(el, function (index, val) {
      str += "<td>" + val + "</td>"
    });
    obj.prepend("<tr>" + str + "</tr>");
  };

  function eachTbody (el, obj) {
    var str = "";
    $.each(el, function (index, val) {
      str += "<tr>"
      $.each(val.rowData.split(","), function (index, val) {
        str += "<td contenteditable='true'>" + val + "</td>"
      });
      str += "</tr>"
    });
    obj.append(str);
  };

  function createStr () {
    var header = [];
    var trList = [];
    var tdList = [];
    $("table thead tr").children("td").each(function(){
      header.push($(this).text())
    });
    $("table tbody tr").each(function(){
      tdList = []
      $(this).children("td").each(function(){
        tdList.push($(this).text())
      })
      trList.push(tdList.join(","))
    })
    $(".str").html(trList.join(""));
  }

  getTableData.click(function () {
    eachData(data);
  });
  
  addTabel.click(function () {
    var str = "";
    $(gridHeader).each(function () {
      str += "<td></td>";
    });
    tbody.append("<tr>" + str + "</tr>");
  });

  enableType.click(function () {
    $("tbody td").attr("contenteditable","true");
  });
  
  disType.click(function () {
    $("td[contenteditable]").removeAttr("contenteditable");
  });
  $(".createStr").click(function() {
    createStr();
    console.log(tbody.find("tr").last());
  });

  var oTable = $("#count"), iNum = 1, eEle = '';
  tbody.on('click', function(e){
  var target = e.target,
  oTr = $(target).closest('tr');
  if (oTr.index() == tbody.find('tr').last().index()) {
    iNum++;
    eEle = oTr.clone();
    eEle.find('td').eq(0).text(iNum);
  }
  tbody.append(eEle);
  });
});