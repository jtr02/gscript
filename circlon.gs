function circlon(args)
* usage: run circlon dlon (strsiz (font)) 
* mproj=nps もしくは sps において longitudeの数字を描く
* dlon は数字を描く経度の間隔で必須．
* strsiz は文字の大きさでオプション
* font はフォント番号でオプション
dlon=subwrd(args,1)
strsiz=subwrd(args,2)
font=subwrd(args,3)

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
latline=sublin(result,3)
if (mproj=3);* mproj=nps
  lat0=subwrd(latline,6)
else;*         mproj=sps
  lat0=subwrd(latline,8)
endif
lon1=subwrd(lonline,6)
lon2=subwrd(lonline,8)

say 'lon1='lon1' lon2='lon2
'query w2xy '%lon1%' '%lat0
xd=subwrd(result,3)
yd=subwrd(result,6)
say 'xpol='xpol
say 'ypol='ypol
say 'xd='xd
say 'yd='yd
* 'run sqrt '%(xpol-xd)*(xpol-xd)+(ypol-yd)*(ypol-yd); rad=result;* for Grads 1.7 or earlier  
rad=math_pow((xpol-xd)*(xpol-xd)+(ypol-yd)*(ypol-yd),0.5); 
* say 'rad='rad
* say 'lon1='lon1' lon2='lon2

radd=rad+0.2
if (strsiz!="")
  radd=rad+1.5*strsiz
  'set strsiz '%strsiz
endif
if (font!=""); '  set font   '%font;   endif
lonm=(lon1+lon2)/2
*lon=0; while (lon<=360)
lon=lon1; while (lon<=lon2)
  if (lon1<=lon & lon<lon2) 
*    say 'lon='lon
    anglestr=lon-lonm
    angleline=(anglestr-90)/180*3.14
*   'set string 1 c 3 '%anglestr
   'set string 1 c'

    cosangle=math_cos(angleline);
    sinangle=math_sin(angleline);
*    'run cos '%angleline; cosangle=result;* for Grads 1.7 or earlier  
*    'run sin '%angleline; sinangle=result;* for Grads 1.7 or earlier  
    xrim=xpol+rad*cosangle
    yrim=ypol+rad*sinangle
*   'draw line '%xpol%' '%ypol%' '%xrim%' '%yrim
    xchar=xpol+radd*cosangle
    ychar=ypol+radd*sinangle
    ew=''
    if (-360<lon & lon<-180) ; ew='W'; clon=(360+lon)%ew; endif
    if (-180<lon & lon<0)    ; ew='W'; clon=-lon%ew     ; endif
    if (   0<lon & lon<180)  ; ew='E'; clon=lon%ew      ; endif
    if ( 180<lon & lon<360)  ; ew='W'; clon=(360-lon)%ew; endif
    if ( 360<lon & lon<540)  ; ew='E'; clon=(lon-360)%ew; endif
    if ( 540<lon & lon<720)  ; ew='W'; clon=(720-lon)%ew; endif
    if ( -360=lon | 0=lon | 360=lon | 720=lon ) ; ew='' ; clon=0%ew; endif
    if ( -180=lon | 180=lon | 540=lon ) ; ew=''; clon=180%ew; endif
    'draw string '%xchar%' '%ychar%' '%clon
  endif
  lon=lon+dlon
endwhile
'set string 1 bl 3 0'
return

lat=lat1; while (lat<=lat2)

endwhile
