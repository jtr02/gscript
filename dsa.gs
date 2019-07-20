function dsa(args)

if(args='')
say '----------------------------------------'
say '- Function Name : [DSA]'
say '-- Usage :'
say '--- dsa A'
say '---- A : Element (Anomaly)'
say '----- draw shaded map'
say '----------------------------------------'
return
endif

elem=subwrd(args,1)

say 'draw shaded map : 'elem

'q dims'
str=sublin(result,4);lev=subwrd(str,6)
str=sublin(result,5);time=subwrd(str,6)

'set gxout stat'
'd 'elem
str=sublin(result,8)
min=subwrd(str,4)
max=subwrd(str,5)
absmin=math_abs(min)
absmax=math_abs(max)
say 'min='min
say 'max='max
if(absmin>absmax);cabs=absmin;else;cabs=absmax;endif
if(cabs>1);inc=0.1;else;inc=10;endif
i=0;cabsi=cabs
while(i<99)
if(cabsi>=1 & cabsi<10);break;endif
cabsi=cabsi*inc
i=i+1
endwhile
cabs=math_format('%.1f',cabsi)*math_pow(10,i)
cmin=-cabs;cmax=cabs;cint=cabs/10

'set display color white'
'c'
'set grads off'
'set timelab off'
'set grid off'
'color 'cmin' 'cmax' 'cint' -kind blue->aqua->white->orange->red'
'set gxout shade2'
'd 'elem
'xcbar -fs 2 -line on'
'draw title 'elem' lev='lev' time='time
return
