function circlat(args)
* usage: run circlat dlat (strsiz (font)) 
* mproj=nps もしくは sps において 緯度の数字を描く
* dlat は数字を描く経度の間隔で必須．
* lon  は数字を描く経度で必須．
* strsiz は文字の大きさで必須．
* font はフォント番号でオプション
dlat=subwrd(args,1)
if (dlat=0); say '*circlat* dlat=0'; 'quit'; return; endif
lon0=subwrd(args,2)
strsiz=subwrd(args,3)
if (strsiz=""); say '*circlat* strsiz is not defined'; 'quit'; return; endif
if (strsiz=0); say '*circlat* strsiz=0'; 'quit'; return; endif
font=subwrd(args,4)
'q gxinfo'
cline=sublin(result,6)
mproj=subwrd(cline,3)
if (mproj!=3 & mproj!=4)
  say ' *circlon* (mproj!=3:nps & mproj !=4:sps) is not supported'
  say 'mproj='%mproj
  'quit'
endif
if (mproj=3);* mproj=3 is nps
  'query w2xy 0 90'
*  say 'result='result
endif
if (mproj=4);* mproj=4 is sps
  'query w2xy 0 -90'
endif
xpol=subwrd(result,3)
ypol=subwrd(result,6)
'q dims'
lonline=sublin(result,2)
lon1=subwrd(lonline,6)
lon2=subwrd(lonline,8)
latline=sublin(result,3)
lat1=subwrd(latline,6)
lat2=subwrd(latline,8)

lat=math_int(lat1/dlat)*dlat-dlat
'set line 0';* set color for recf
'set string 1 c'
'set strsiz '%strsiz
if (font!=""); '  set font   '%font;   endif
while(lat<lat2)
  if (lat1<=lat) 
    'query w2xy '%lon0%' '%lat
    x=subwrd(result,3)
    y=subwrd(result,6)
    if (lat<0); clat=-lat%'S'; endif
    if (lat>0); clat=lat%'N'; endif
    if (lat=0); clat='Eq'; endif
    len=math_strlen(clat)
    xwl=strsiz*len*1.1/2
    xwr=strsiz*len*1.3/2
    ywb=strsiz*1.4/2
    ywt=strsiz*1.2/2
*    'draw recf '%x-xwl%' '%y-ywb%' '%x+xwr%' '%y+ywt
    'draw string '%x%' '%y%' '%clat
  endif
  lat=lat+dlat
endwhile
'set string 1 bl 3 0'
return
