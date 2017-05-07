var map = new BMap.Map("myMap");          // 创建地图实例  
var point = new BMap.Point(120.141526, 30.257495);  // 创建点坐标  
map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别 
//button的函数
document.getElementById("return-button").onclick=function(){
     history.go(0)  };
// window.setTimeout(function() {
//   map.zoomTo(new BMap.Point(116.404, 39.915));
// }, 2000);

map.addControl(new BMap.NavigationControl());   
map.addControl(new BMap.ScaleControl());    
map.addControl(new BMap.OverviewMapControl());    
map.addControl(new BMap.MapTypeControl());    
map.setCurrentCity("杭州"); 

var marker = new BMap.Marker(point);// 创建标注    
map.addOverlay(marker);
//可拖拽的标注
marker.enableDragging();    
marker.addEventListener("dragend", function(e){    
 alert("当前位置：" + e.point.lng + ", " + e.point.lat);    
})

// 显示附近的所以宾馆
var local=new BMap.LocalSearch(map,{
	pageCapacity:8,
	renderOptions:{
		map:map,
		panel:"result2"
	}
});
local.search("宾馆");


    var start = "杭州师范大学仓前新校区" ,end = "宾馆";
    var transit = new BMap.TransitRoute(map, {
        renderOptions: {map: map, panel: "result1"}, 
        onResultsHtmlSet : function(){$("#result1").show()}    
    });
    transit.search(start,end);

 
//多个点添加含图文的信息窗口

var data_info = [[120.020414,30.295695,"<h3 style='margin:0 0 5px 0;padding:0.2em 0'>恕园2号楼</h3>"+"<p style='float:left;margin:4px'>简介：xxxxxxxxx</p>"+"<img style='float:right;margin:4px' id='imgDemo' src='img/sy2.jpg' width='139' height='104'/>"],
                     [120.019008,30.295259,"<h3 style='margin:0 0 5px 0;padding:0.2em 0'>恕园7号楼彩虹玻璃房</h3>"+"<p style='float:left;margin:4px'>简介：xxxxxxxxx</p>"+"<img style='float:right;margin:4px' id='imgDemo' src='img/colorful.jpg' width='139' height='104'/>"],
                     [120.019089,30.296783,"<h3 style='margin:0 0 5px 0;padding:0.2em 0'>中心湖</h3>"+"<p style='float:left;margin:4px'>简介：xxxxxxxxx</p>"+"<img style='float:right;margin:4px' id='imgDemo' src='img/centerlake.jpg' width='139' height='104'/>"]
                    ];
    // var opts = {
    //             width : 250,     // 信息窗口宽度
    //             height: 80,     // 信息窗口高度
    //             title : "信息窗口" , // 信息窗口标题
    //             enableMessage:true//设置允许信息窗发送短息
    //            };
    var opts = {width : 345, height: 235};
    for(var i=0;i<data_info.length;i++){
        var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]));  // 创建标注
        var content = data_info[i][2];
        map.addOverlay(marker);               // 将标注添加到地图中
        addClickHandler(content,marker);
    }
    function addClickHandler(content,marker){
        marker.addEventListener("click",function(e){
            openInfo(content,e)}
        );
    }
    function openInfo(content,e){
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
        map.openInfoWindow(infoWindow,point); //开启信息窗口
        document.getElementById('imgDemo').onload = function (){
           infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
       }
    }




