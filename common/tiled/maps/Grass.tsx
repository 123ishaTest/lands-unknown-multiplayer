<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.9" tiledversion="1.9.2" name="Grass" tilewidth="16" tileheight="16" tilecount="24" columns="6">
 <image source="../../../art/grass.png" width="96" height="64"/>
 <wangsets>
  <wangset name="Island" type="corner" tile="-1">
   <wangcolor name="Grass" color="#aa0000" tile="-1" probability="1"/>
   <wangcolor name="Water" color="#0000ff" tile="-1" probability="1"/>
   <wangtile tileid="0" wangid="0,1,0,1,0,1,0,1"/>
   <wangtile tileid="1" wangid="0,1,0,1,0,1,0,1"/>
   <wangtile tileid="2" wangid="0,1,0,1,0,1,0,1"/>
   <wangtile tileid="3" wangid="0,1,0,1,0,1,0,1"/>
   <wangtile tileid="6" wangid="0,1,0,2,0,1,0,1"/>
   <wangtile tileid="7" wangid="0,1,0,2,0,2,0,1"/>
   <wangtile tileid="8" wangid="0,1,0,1,0,2,0,1"/>
   <wangtile tileid="9" wangid="0,2,0,2,0,2,0,2"/>
   <wangtile tileid="10" wangid="0,2,0,2,0,2,0,2"/>
   <wangtile tileid="12" wangid="0,2,0,2,0,1,0,1"/>
   <wangtile tileid="13" wangid="0,2,0,2,0,2,0,2"/>
   <wangtile tileid="14" wangid="0,1,0,1,0,2,0,2"/>
   <wangtile tileid="15" wangid="0,2,0,1,0,2,0,2"/>
   <wangtile tileid="16" wangid="0,2,0,2,0,1,0,2"/>
   <wangtile tileid="18" wangid="0,2,0,1,0,1,0,1"/>
   <wangtile tileid="19" wangid="0,2,0,1,0,1,0,2"/>
   <wangtile tileid="20" wangid="0,1,0,1,0,1,0,2"/>
   <wangtile tileid="21" wangid="0,1,0,2,0,2,0,2"/>
   <wangtile tileid="22" wangid="0,2,0,2,0,2,0,1"/>
  </wangset>
  <wangset name="Water" type="edge" tile="-1">
   <wangcolor name="" color="#ff0000" tile="-1" probability="1"/>
   <wangtile tileid="9" wangid="1,0,1,0,1,0,1,0"/>
   <wangtile tileid="10" wangid="1,0,1,0,1,0,1,0"/>
   <wangtile tileid="13" wangid="1,0,1,0,1,0,1,0"/>
  </wangset>
  <wangset name="Ground" type="edge" tile="-1">
   <wangcolor name="" color="#ff0000" tile="-1" probability="1"/>
   <wangtile tileid="0" wangid="1,0,1,0,1,0,1,0"/>
   <wangtile tileid="1" wangid="1,0,1,0,1,0,1,0"/>
   <wangtile tileid="2" wangid="1,0,1,0,1,0,1,0"/>
   <wangtile tileid="3" wangid="1,0,1,0,1,0,1,0"/>
  </wangset>
 </wangsets>
</tileset>
