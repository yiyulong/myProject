$(function(){
  // li点击效果
  function fn_isSelect () {
    $(this).toggleClass('isSelect');
  }
  // 绑定事件
  $('li').on('click', fn_isSelect);
  // 添加选中
  $('.addRight').on('click', function() {
    $('.rightBox ul').append($('.leftBox .isSelect').clone(true).removeClass('isSelect'));
    $('.leftBox .isSelect').removeClass('isSelect').addClass('isSelected').off();
  });
  // 取消选中
  $('.cancelAdd').on('click', function() {
    $('.rightBox .isSelect').each(function() {
      var _this = $(this);
      $('.leftBox .isSelected').each(function() {
        if($(this).attr('order') == _this.attr('order')) {
          $(this).removeClass('isSelected').on('click', fn_isSelect);
        }
      })
    })
    $('.rightBox ul li').remove('.isSelect');
  });
  // 上移
  $('.up').on('click', function() {
    var obj = $('.rightBox .isSelect').first();
    obj.siblings().removeClass('isSelect');
    if (obj.prev().length) {
      obj.prev().before(obj);
    }
  });
  // 下移
  $('.down').on('click', function() {
    var obj = $('.rightBox .isSelect').first();
    obj.siblings().removeClass('isSelect');
    if (obj.next().length) {
      obj.next().after(obj);
    }
  });
})