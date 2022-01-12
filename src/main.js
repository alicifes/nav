const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
let xObject = JSON.parse(x)

 const hashMap = xObject ||[
     {logo:'A',url:'https://www.acfun.cn/'},
     {logo:'B',url:'https://www.bilibili.com/ '}
    ] 

const simplifyUrl = (url)=>{
    return url.replace('https://','').replace('http://','').replace('www.','').replace(/\/.*/,'')
}
//使用正则消除/后面的全部东西
const render=()=>{
    $siteList.find('li:not(.last)').remove() 
    hashMap.forEach((node,index)=>{
        const $li  = $(`<li>
                            <div class="site">
                            <div class="logo">${node.logo[0]}</div>
                            <div class="link">${simplifyUrl(node.url)}</div>
                        </div>
                        <div class ="close">
                            <svg class="icon">
                                <use xlink:href="#icon-delet"></use>
                            </svg>
                        </div> 
                    </li>`).insertBefore($lastLi)
                     $('li:not(.last)').on('click',()=>{
                        window.open(node.url)
                    })
                    $('li').on('click','.close',(e)=>{
                        e.stopPropagation()
                        hashMap.splice(index,1)
                        render()
                    })
                 })
}
render()

window.onbeforeunload=()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}
 $(".last").on('click',()=>{
    let url = window.prompt('请输入想添加的网站')
    if(url.indexOf('http')!=0){
        url='https://'+ url
    }
    hashMap.push(
        {logo:simplifyUrl(url)[0].toUpperCase(),url:url},
    )
    render()
})

$(window).on('keypress',(e)=>{
    console.log(e.key);
    //个人觉得这个功能不太实用
    // for(let i = 0;i<hashMap.length;i++){
    //     if(hashMap[i].logo==e.key.toUpperCase()){
    //         window.open(hashMap[i].url)
    //     }
    // }
})
