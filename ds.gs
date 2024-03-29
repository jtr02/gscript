function ds(args)

if(args='')
say '----------------------------------------'
say '- Function Name : [DS]'
say '-- Usage :'
say '--- ds A B [C]'
say '---- A : Element (Raw)'
say '---- B : Color option (r(red) or b(blue))'
say '---- C : grfill option (f)'
say '----- draw shaded map'
say '----------------------------------------'
return
endif

elem=subwrd(args,1)
copt=subwrd(args,2)
fill=subwrd(args,3)

if(copt='');say 'select color option (r/b)';return;endif
if(copt='r');cols='white->yellow->orange->red';endif
if(copt='b');cols='white->skyblue->aqua->blue';endif

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

if(absmin>1);inc=0.1;else;inc=10;endif
i=0;cabsi=absmin
while(i<99)
if(cabsi>=1 & cabsi<10);break;endif
cabsi=cabsi*inc
i=i+1
endwhile
absmin=math_format('%.1f',cabsi)*math_pow(10,i)

if(absmax>1);inc=0.1;else;inc=10;endif
i=0;cabsi=absmax
while(i<99)
if(cabsi>=1 & cabsi<10);break;endif
cabsi=cabsi*inc
i=i+1
endwhile
absmax=math_format('%.1f',cabsi)*math_pow(10,i)

if(cmin<0);cmin=-absmin;else;cmin=absmin;endif
if(cmax<0);cmax=-absmax;else;cmax=absmax;endif
cint=(cmax-cmin)/20

'set display color white'
'c'
'set grads off'
'set timelab off'
'set grid off'
'color 'cmin' 'cmax' 'cint' -kind 'cols
if(fill='f');'set gxout grfill';else;'set gxout shade2';endif
'd 'elem
'xcbar -fs 2 -line on'
'draw title 'elem' lev='lev' time='time
return
