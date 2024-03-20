let arr = []
function getContext() {
  const pages = getCurrentPages();
  console.log(pages,'pagespages')
  return pages[pages.length - 1];
}
const Dialog = options => {
  return new Promise((resolve, reject) => {
    const context = getContext();
    console.log(context,'contextcontext')
    const dialog = context.selectComponent('#locationAuth')?context.selectComponent('#locationAuth'):null;
    console.log(context.selectComponent('#locationAuth'),'context.selectComponent()')
    if (dialog) {
      console.log(dialog)
      arr.push(dialog)
    }
    else {
      console.warn('未找到 van-dialog 节点，请确认 selector 及 context 是否正确');
    }
  });
};

//出发close
Dialog.close=()=>{
  Dialog()
  arr.forEach((item) => {
    item.close()
  })
}

//不会出发close
Dialog.cancel=()=>{
  Dialog()
  arr.forEach((item) => {
    item.cancel()
  })
}
Dialog.show = () => {
  Dialog()
  arr.forEach((item) => {
    item.show()
  })
}

export default Dialog